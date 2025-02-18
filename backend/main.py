from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel

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

@app.get("/getArr")