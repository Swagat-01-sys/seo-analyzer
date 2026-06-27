from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.orm import Session

from app.database import get_db, SessionLocal
from app.models.analysis import Analysis
from app.schemas import AnalyzeRequest
from app.services.metadata import MetadataAnalyzer
router = APIRouter()

def run_analysis(job_id: int):

    print("=" * 50)
    print("Starting Job:", job_id)

    db = SessionLocal()

    try:
        job = db.query(Analysis).filter(
            Analysis.id == job_id
        ).first()

        print("Job Loaded")

        from app.services.analysis_engine import AnalysisEngine
        report = AnalysisEngine.generate(job.url)

        job.results = report

        print("Saving Database")

        job.status = "completed"
        db.commit()

        print("DONE")

    except Exception as e:

        print("ERROR OCCURRED")
        print(type(e))
        print(e)

        if job:
            job.status = "failed"
            job.results = {
                "error": str(e)
            }
            db.commit()

    finally:
        db.close()

@router.post("/analyze")
def analyze(
    request: AnalyzeRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):

    job = Analysis(
        url=str(request.url),
        status="processing"
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    background_tasks.add_task(run_analysis, job.id)

    return {
        "job_id": job.id,
        "status": job.status
    }