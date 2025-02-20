from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from algorithms import router as algo_router

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router from algorithms.py
app.include_router(algo_router, prefix="/algo")

class ArrayInput(BaseModel):
    arr: List[int]

app.state.unsortedArr = []

@app.post("/getRandArray")
async def root(data: ArrayInput):
    app.state.unsortedArr = data.arr
    return {"message": "Data received successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
