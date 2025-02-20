from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from algorithms import  router as algo_router, bubble_sort, insertion_sort

app = FastAPI()
# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include the router from algorithms.py
app.include_router(algo_router)


class ArrayInput(BaseModel):
    arr: List[int]

app.state.unsortedArr = []
# FastAPI routes
@app.post("/getRandArray")
async def root(data: ArrayInput):
    app.state.unsortedArr = data.arr
    return {"message": "Data received successfully"}

@algo_router.get("/bubble-sort")
async def bubble_sort_route():
    if not app.state.unsortedArr:
        return {"error": "No array stored. Use POST /getRandArray first."}

    arr = app.state.unsortedArr.copy()
    bubble_sort(arr)
    return {"sorted_arr": arr}

algo_router.get("/insertion-sort")
async def insertion_sort_route():
    if not app.state.unsortedArr:
        return {"error": "No array stored. Use POST /getRandArray first."}

    arr = app.state.unsortedArr.copy()
    insertion_sort(arr)
    return {"sorted_arr": arr}

# ✔ Run uvicorn on `socket_manager`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
