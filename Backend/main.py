from fastapi import FastAPI,WebSocket, Depends # type: ignore
from Routes.verbatims_list_routes import router as verbatims_list_router
from Routes.live_verbatims_list_routes import router as live_verbatims_list_router
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from Routes.snapshot_view_routes import router as snapshot_router
from typing import List
import asyncio
from database.session import SessionLocal, get_db
import websockets
from models.live_verbatims_list import Live_Verbatims_List
from sqlalchemy import func

from Routes.user_auth_routes import router as user_auth_router
from Routes.trend_analysis_routes import router as trend_analysis_router
from models import users_data_model
from models.users_data_model import Roles
from database.session import engine,SessionLocal
from user_auth.security import get_password_hash


# users_data_model.Base.metadata.create_all(bind = engine)
# app = FastAPI()
# db = SessionLocal()
# roles = [
#     {"role" : "admin","get" : True,"post" : True,"put" : True,"patch" : True},
#     {"role" : "user","get" : True,"post" : True,"put" : False,"patch" : False}
# ]
# for i in roles:
#     data = Roles(**i)
#     db.add(data)
#     db.commit()
#     db.refresh(data)
# db.close()

# admin_data = [
#     {"user_name":"venkatesh@gmail.com","password":get_password_hash("abcdef@123"),"mobile_no":9988776655,"address":"bengaluru","role":"admin"},
#     {"user_name":"admin@gmail.com","password":get_password_hash("wuvxyz@123"),"mobile_no":9876543277,"address":"bengaluru","role":"admin"}
# ]
# for i in admin_data:
#     data = users_data_model.User_Data(**i)
#     db.add(data)
#     db.commit()
#     db.refresh(data)
# db.close()
# print(type(99887766554433322211))
app = FastAPI()

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


websocket_connections = []  # List to store WebSocket connections

# WebSocket endpoint (defined in your router or separate module)
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    websocket_connections.append(websocket)
    try:
        while True:
            await asyncio.sleep(1)  # Keep connection open
    except Exception:
        websocket_connections.remove(websocket)


# Function to send real-time updates
async def send_realtime_updates(websocket_connections) -> None:
    last_total_rows = 0  # Track the last known total rows in the table
    recent_updates = []  # List to store recent updates

    while True:
        try:
            db = SessionLocal()

            # Query current total rows in Live_Verbatims_List
            current_total_rows = db.query(func.count(Live_Verbatims_List.mention_id)).scalar()
            print(f"Current total rows: {current_total_rows}, Last total rows: {last_total_rows}")

            # Compare current total rows with last known total rows
            if current_total_rows != last_total_rows:
                print("Detected change in total rows")

                # Fetch all data if total rows have changed
                new_data = db.query(Live_Verbatims_List).all()

                if new_data:
                    print(f"Sending notifications for {len(new_data)} new items")
                    recent_updates = [item.serialize() for item in new_data]
                    #print(recent_updates)
                    # for connection in websocket_connections:
                    #     await connection.send_json({"type": "notification", "data": recent_updates})
                    send_tasks = [connection.send_json({"type": "notification", "data": recent_updates}) for connection in websocket_connections]
                    await asyncio.gather(*send_tasks)

                    # Update last_total_rows to current_total_rows
                    last_total_rows = current_total_rows

            db.close()
            await asyncio.sleep(5)  # Send updates every 5 seconds (adjust as needed)

        except Exception as e:
            print(f"Error sending updates: {e}")

       
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(send_realtime_updates(websocket_connections))




"""
user_data ={
  "user_name": "abcdef@gmail.com",
  "password": "abcdefg@123"
}
"""