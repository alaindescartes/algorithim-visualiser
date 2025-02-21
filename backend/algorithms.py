from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio

router = APIRouter()

async def bubble_sort(arr, websocket: WebSocket):
    size = len(arr)
    while size > 0:
        swapped = False
        for i in range(size - 1):
            if arr[i] > arr[i+1]:
                arr[i], arr[i+1] = arr[i+1], arr[i]
                swapped = True
                await asyncio.sleep(0.5)
                await websocket.send_json({"sorted_array": arr})

        size -= 1
        if not swapped:
            break
    return arr


async def insertion_sort(arr, websocket: WebSocket):
    for current in range(1, len(arr)):
        temp = arr[current]
        position = current

        while position > 0 and arr[position - 1] > temp:
            arr[position] = arr[position - 1]
            position -= 1

        arr[position] = temp
        await asyncio.sleep(0.5)
        await websocket.send_json({"sorted_array": arr})

    return arr

sorting_algorithms = {
    "bubble-sort": bubble_sort,
    "insertion-sort": insertion_sort,
}

@router.websocket("/ws/{algo}")
async def websocket_sort(websocket: WebSocket, algo: str):
    await websocket.accept()
    await websocket.send_text(f"WebSocket connected: {algo} sorting will start.")

    if algo not in sorting_algorithms:
        await websocket.send_text(f"Error: {algo} is not a valid sorting algorithm.")
        await websocket.close()
        return

    try:
        arr = websocket.app.state.unsortedArr.copy()
        await sorting_algorithms[algo](arr, websocket)
        await websocket.send_json({"sorted_array": arr})
        await websocket.send_json({"status": "done", "sorted_array": arr})
    except WebSocketDisconnect:
        print("Client disconnected")
