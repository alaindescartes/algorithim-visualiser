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


async def quickSort(arr, websocket: WebSocket):
    def find_pivot(arr):
        slow_pointer = -1
        pivot_index = len(arr) - 1  
        pivot_value = arr[pivot_index]

        for fast_pointer in range(len(arr)):
            if arr[fast_pointer] <= pivot_value:
                slow_pointer += 1
                arr[slow_pointer], arr[fast_pointer] = arr[fast_pointer], arr[slow_pointer]

        return slow_pointer 

    async def left_sort(arr, pivot_index):
        if pivot_index > 0:
            left_arr = arr[:pivot_index]
            return await quickSort(left_arr, websocket)
        return []

    async def right_sort(arr, pivot_index):
        if pivot_index + 1 < len(arr):
            right_arr = arr[pivot_index + 1:]
            return await quickSort(right_arr, websocket)
        return []

    if len(arr) <= 1:
        return arr

    pivot_index = find_pivot(arr)

    sortedArr = await left_sort(arr, pivot_index) + [arr[pivot_index]] + await right_sort(arr, pivot_index)
    
    await asyncio.sleep(0.5)
    await websocket.send_json({"sorted_array": sortedArr})

    return sortedArr

        
         

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

arr = [7, 3, 9, 1, 6]
print(quickSort(arr))