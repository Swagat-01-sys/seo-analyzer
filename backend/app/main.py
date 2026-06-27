from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
import app.models

from app.routes.analyze import router as analyze_router
from app.routes.results import router as results_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SEO Analyzer API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    analyze_router,
    prefix="/api",
    tags=["Analyze"]
)

app.include_router(
    results_router,
    prefix="/api",
    tags=["Results"]
)


@app.get("/")
def home():
    return {
        "message": "SEO Analyzer API Running"
    }