from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.analysis import Analysis

router = APIRouter()


@router.get("/results/{job_id}")
def get_result(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = db.query(Analysis).filter(
        Analysis.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return {
        "job_id": job.id,
        "url": job.url,
        "status": job.status,
        "results": job.results
    }