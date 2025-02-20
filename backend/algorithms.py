from fastapi import APIRouter, WebSocket, WebSocketDisconnect,Request

# Create an APIRouter for WebSocket & Sorting Endpoints
router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text("Hello from algorithms.py! WebSocket is connected.")

    try:
        while True:
            data = await websocket.receive_text()
            print("Received from client:", data)
            await websocket.send_text(f"Message echoed back: {data}")
    except WebSocketDisconnect:
        print("Client disconnected")

@router.get("/bubble-sort")
async def bubble_sort_route(request: Request):
    if not request.app.state.unsortedArr:
        return {"error": "No array stored. Use POST /getRandArray first."}

    arr = request.app.state.unsortedArr.copy()
    size = len(arr)
    while size > 0:
        swapped = False
        for i in range(size - 1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True

        size -= 1
        if not swapped:
            break
    return {"sorted_arr": arr}

@router.get("/insertion-sort")
async def insertion_sort_route(request: Request):
    if not request.app.state.unsortedArr:
        return {"error": "No array stored. Use POST /getRandArray first."}

    arr = request.app.state.unsortedArr.copy()
    for current in range(1, len(arr)):
        temp = arr[current]
        position = current
        while position > 0 and arr[position - 1] > temp:
            arr[position] = arr[position - 1]
            position -= 1

        arr[position] = temp
    return {"sorted_arr": arr}


