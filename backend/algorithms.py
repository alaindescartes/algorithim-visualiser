from fastapi import APIRouter, WebSocket, WebSocketDisconnect

# Create an APIRouter specifically for WebSockets (or any endpoints).
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


def bubble_sort(array):
    """
        Sorts a list of numbers in ascending order using the Bubble Sort algorithm.

        Parameters:
            array (list): List of numbers to be sorted.

        Returns:
            list: The sorted list.
        """
    size = len(array)
    while  size > 0:
        swapped = False
        for i in range(size - 1):
            if array[i] > array[i+1]:
                array[i], array[i+1] = array[i+1], array[i]
                swapped = True

        size -= 1
        if not swapped:
            break
    return array

def insertion_sort(array):
   """
    Sorts an array in ascending order using the Insertion Sort algorithm.
    
    Parameters:
    array (list): The list of elements to be sorted.
    
    Returns:
    list: The sorted list.
   """ 
   for current in range(1, len(array)):
       temp = array[current]
       position = current
       while position > 0 and array[position-1] > temp:
           array[position] = array[position-1]
           position -= 1

       array[position] = temp
   print(array)
   return array
