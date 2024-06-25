from fastapi import FastAPI,WebSocket # type: ignore
from Routes.verbatims_list_routes import router as verbatims_list_router
from Routes.live_verbatims_list_routes import router as live_verbatims_list_router
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from Routes.snapshot_view_routes import router as snapshot_router
import asyncio
from database.session import SessionLocal
import websockets
from models.live_verbatims_list import Live_Verbatims_List
from sqlalchemy import func

app = FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=['*'])

app.include_router(verbatims_list_router,prefix="")
app.include_router(live_verbatims_list_router,prefix="")
app.include_router(snapshot_router,prefix="")


websocket_connections = []

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

# Function to send real-time updates (defined in your router or separate module)
@app.on_event("startup")
async def startup_event():
    while True:
        await asyncio.sleep(10)
        print("Performing startup tasks...")


async def send_realtime_updates():
    last_total_rows = 0  # Track the last known total rows in the table
    while True:
        try:
            db = SessionLocal()

            # Query current total rows in Live_Verbatims_List
            current_total_rows = db.query(func.count(Live_Verbatims_List.mention_id)).scalar()

            # Compare current total rows with last known total rows
            if current_total_rows != last_total_rows:
                # Fetch all data if total rows have changed
                new_data = db.query(Live_Verbatims_List).all()

                if new_data:
                    for connection in websocket_connections:
                        await connection.send_json({"type": "notification", "data": [item.serialize() for item in new_data]})

                    # Update last_total_rows to current_total_rows
                    last_total_rows = current_total_rows

            db.close()
            await asyncio.sleep(5)  # Send updates every 5 seconds (adjust as needed)

        except Exception as e:
            print(f"Error sending updates: {e}")

# Function to send real-time updates (defined in your router or separate module)
@app.on_event("startup")
async def startup_event():
    while True:
        await asyncio.sleep(10)
        print("Performing startup tasks...")


# # Optional: Serve static files for Swagger UI
# # Adjust the directory path as per your setup
# from fastapi.staticfiles import StaticFiles
# app.mount("/static/index", StaticFiles(directory="static"), name="static")