from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from algorithms import bubble_sort, insertion_sort  # Import algorithms
from fastapi_socketio import SocketManager
import asyncio

app = FastAPI()
socket_manager = SocketManager(app)  # ✅ Correct way to initialize Socket.IO

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArrayInput(BaseModel):
    arr: List[int]

app.state.unsortedArr = []  # ✅ Initialize storage

# ✅ Correctly Define a Custom Event
@socket_manager.on("my_custom_event")
async def another_event(sid, data):
    print(f"Received from {sid}: {data}")
    await socket_manager.emit("response_event", {"message": "Hello from server!"}, room=sid)

@app.post("/getRandArray")
async def root(data: ArrayInput):
    app.state.unsortedArr = data.arr
    return {"message": "Data received successfully"}

@app.get("/bubble-sort")
async def bubble_sort_route():
    if not app.state.unsortedArr:
        return {"error": "No array stored. Use POST /getRandArray first."}

    arr = app.state.unsortedArr.copy()
    bubble_sort(arr)  # Call bubble sort function
    return {"sorted_arr": arr}

@app.get("/insertion-sort")
async def insertion_sort_route():
    if not app.state.unsortedArr:
        return {"error": "No array stored. Use POST /getRandArray first."}

    arr = app.state.unsortedArr.copy()
    insertion_sort(arr)  # Call insertion sort function
    return {"sorted_arr": arr}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
