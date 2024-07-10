from fastapi import FastAPI,WebSocket, Depends 
from Routes.verbatims_list_routes import router as verbatims_list_router
from Routes.live_verbatims_list_routes import router as live_verbatims_list_router
from fastapi.middleware.cors import CORSMiddleware
from Routes.snapshot_view_routes import router as snapshot_router
import asyncio
from Database.session import SessionLocal, get_db
from Models.live_verbatims_list import Live_Verbatims_List
from Models.alerts import verbatims_list_audit
from sqlalchemy import func
from fastapi.responses import StreamingResponse
import os
from Services.database_table_service import init_db_with_data
from Routes.user_auth_routes import router as user_auth_router
from Routes.trend_analysis_routes import router as trend_analysis_router
from Database.session import engine,SessionLocal
from datetime import datetime
app = FastAPI()

# init_db_with_data()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this list as necessary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(verbatims_list_router,tags=["verbatims_list"],prefix="")
app.include_router(live_verbatims_list_router,tags=["live_verbatims_list_apis"],prefix="")
app.include_router(snapshot_router,tags=["snapshot_apis"],prefix="")
app.include_router(user_auth_router,tags=["user_auth"],prefix="")
app.include_router(trend_analysis_router,tags=["trend_analysis"],prefix="")
"""
user_data ={
  "user_name": "abcdef@gmail.com",
  "password": "abcdefg@123"
}
# """
# #SSE Implementation

from fastapi.responses import StreamingResponse
from queue import Queue
import uuid,json

missed_notifications = {}

# SSE endpoint
@app.get("/sse")
async def sse_endpoint():
    async def stream():
        client_id = str(uuid.uuid4())  # Generate a unique client ID
        missed_notifications[client_id] = Queue()  # Queue for missed notifications
        print(f"Client connected: {client_id}")
        # Yield missed notifications first
        async for notification in get_notification(client_id):
            yield f"data: {json.dumps(notification)}\n\n"

        try:
            while True:
                notification = await get_notification(client_id)
                print(f"Sending notification to client {client_id}")
                yield f"data: {json.dumps(notification)}\n\n"
        except Exception as e:
            print(f"Client disconnected: {client_id}, Error: {e}")
        finally:
            # Clean up on client disconnect
            del missed_notifications[client_id]

    return StreamingResponse(stream(), media_type="text/event-stream")

async def get_notification(client_id):
    while True:
        if client_id in missed_notifications:
            # Check for any missed notifications in the queue
            while not missed_notifications[client_id].empty():
                notification = missed_notifications[client_id].get()
                print(f"Retrieved missed notification for client {client_id}")
                yield notification

        # Wait for new notifications
        await asyncio.sleep(1)  # Adjust as needed

# File to store last_total_rows value
LAST_TOTAL_ROWS_FILE_LIVE_VERBATIMS_LIST = "last_total_rows_live_verbatims.json"
LAST_TOTAL_ROWS_FILE_VERBATIMS_LIST="last_total_rows_verbatims_list.json"#data fetched from audit table of verbatims_list
# Function to send real-time updates
async def send_realtime_updates() -> None:
    recent_updates = []  # List to store recent updates
    if os.path.exists(LAST_TOTAL_ROWS_FILE_LIVE_VERBATIMS_LIST):
        with open(LAST_TOTAL_ROWS_FILE_LIVE_VERBATIMS_LIST, "r") as f:
            last_total_rows_live_verbatims = json.load(f)
    else:
        last_total_rows_live_verbatims = 0
    if os.path.exists(LAST_TOTAL_ROWS_FILE_VERBATIMS_LIST):
        with open(LAST_TOTAL_ROWS_FILE_VERBATIMS_LIST, "r") as f:
            last_total_rows_verbatims_list = json.load(f)
    else:
        last_total_rows_verbatims_list = 0 
    while True:
        try:
            db = SessionLocal()

            # Query current total rows in Live_Verbatims_List
            current_total_rows_live_verbatims =db.query(func.count(Live_Verbatims_List.mention_id)).scalar()
            current_total_rows_verbatims_list = db.query(func.count(verbatims_list_audit.audit_id)).scalar()
            # Compare current total rows with last known total rows of live verbatims table
            if current_total_rows_live_verbatims > last_total_rows_live_verbatims:
                print(f"Detected {current_total_rows_live_verbatims - last_total_rows_live_verbatims} new entries")

                # Fetch new entries
                new_entries = (
                    db.query(Live_Verbatims_List)
                    .order_by(Live_Verbatims_List.mention_id.desc())
                    .limit(current_total_rows_live_verbatims - last_total_rows_live_verbatims)
                    .all()
                )

                # Serialize new entries to send as notifications
                recent_updates = [entry.serialize() for entry in new_entries]

                # Send notifications to SSE clients
                for client_id, notifications_queue in missed_notifications.items():
                    for update in recent_updates:
                        print(f"Queuing update for client {client_id}")
                        notifications_queue.put(update)
            #To notify the updation of verbatims table values
            if current_total_rows_verbatims_list > last_total_rows_verbatims_list:
                print(f"Detected {current_total_rows_verbatims_list - last_total_rows_verbatims_list} new updations in table")

                # Fetch new entries
                new_entries2 = (
                    db.query(verbatims_list_audit)
                    .order_by(verbatims_list_audit.audit_id.desc())
                    .limit(current_total_rows_verbatims_list - last_total_rows_verbatims_list)
                    .all()
                )
                # datetime_str = new_entries2[0].date
                # datetime_obj = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S.%f")
                # iso_format = datetime_obj.isoformat()
                # new_entries2[0].date = iso_format
                # print(type(new_entries2[0].date),type(iso_format),iso_format)
                

                # Serialize new entries to send as notifications
                recent_updates2 = [entry.serialize() for entry in new_entries2]
                print(new_entries2[0].updated_at)
                # Send notifications to SSE clients
                for client_id, notifications_queue in missed_notifications.items():
                    for update in recent_updates2:
                        print(f"Queuing update for client {client_id}")
                        notifications_queue.put(update)


            # Update last_total_rows to current_total_rows
            last_total_rows_verbatims_list = current_total_rows_verbatims_list
            last_total_rows_live_verbatims=current_total_rows_live_verbatims

            # Save last_total_rows to file
            with open(LAST_TOTAL_ROWS_FILE_LIVE_VERBATIMS_LIST, "w") as f:
                json.dump(last_total_rows_live_verbatims, f)
            
              # Save last_total_rows to file
            with open(LAST_TOTAL_ROWS_FILE_VERBATIMS_LIST, "w") as f:
                json.dump(last_total_rows_verbatims_list, f)
            

            db.close()
            await asyncio.sleep(5)  # Send updates every 5 seconds (adjust as needed)

        except Exception as e:
            print(f"Error sending updates: {e}")

# Start the real-time updates task on app startup
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(send_realtime_updates())

