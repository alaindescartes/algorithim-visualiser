from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from algorithms import *

app = FastAPI()

allowedOrgins=[
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowedOrgins,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArrayInput(BaseModel):
    arr: List[int]

app.state.unsortedArr = [] 


@app.post("/getRandArray")
async def root(data:ArrayInput):
    app.state.unsortedArr = data.arr
    return {"message": "data received successfully"}

@app.get("/bubble-sort")
async def sort():
    if not app.state.unsortedArr:
        return {"error": "No array stored. Use POST /store-array first."}

    arr = app.state.unsortedArr.copy() 
    bubble_sort(arr) 
    return {"sorted_arr": arr}

@app.get("/insertion-sort")
async def sort():
    if not app.state.unsortedArr:
        return {"error": "No array stored. Use POST /store-array first."}
    arr = app.state.unsortedArr.copy() 
    insertion_sort(arr) 
    return {"sorted_arr": arr}