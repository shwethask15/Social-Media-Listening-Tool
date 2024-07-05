from typing import List
from fastapi import WebSocket, FastAPI, WebSocketDisconnect
import asyncio

# WebSocket manager class to handle connections and notifications
class WebSocketManager:
    def __init__(self):
        self.connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.connections.remove(websocket)

    async def send_notification(self, message: dict):
        for connection in self.connections:
            await connection.send_json(message)

# Initialize WebSocket manager
manager = WebSocketManager()