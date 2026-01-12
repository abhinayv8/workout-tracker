from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Workout Tracker")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/sets/batch")
def create_sets_batch(
    payload: schemas.BatchSetCreate,
    db: Session = Depends(get_db)
):
    session = db.query(models.WorkoutSession).filter(
        models.WorkoutSession.date == payload.date
    ).first()

    if not session:
        session = models.WorkoutSession(
            date=payload.date,
            day_name=payload.day_name
        )
        db.add(session)
        db.commit()
        db.refresh(session)

    exercise = db.query(models.Exercise).filter(
        models.Exercise.name == payload.exercise_name
    ).first()

    if not exercise:
        exercise = models.Exercise(name=payload.exercise_name)
        db.add(exercise)
        db.commit()
        db.refresh(exercise)

    for s in payload.sets:
        db.add(
            models.SetLog(
                session_id=session.id,
                exercise_id=exercise.id,
                set_number=s.set_number,
                reps=s.reps,
                weight=s.weight
            )
        )

    db.commit()
    return {"sets_added": len(payload.sets)}


@app.get("/progress/{exercise_name}", response_model=list[schemas.SetProgress])
def get_progress(exercise_name: str, db: Session = Depends(get_db)):
    exercise = db.query(models.Exercise).filter(
        models.Exercise.name == exercise_name
    ).first()

    if not exercise:
        return []

    return (
        db.query(
            models.WorkoutSession.date,
            models.SetLog.set_number,
            models.SetLog.reps,
            models.SetLog.weight
        )
        .join(models.SetLog)
        .filter(models.SetLog.exercise_id == exercise.id)
        .order_by(models.WorkoutSession.date, models.SetLog.set_number)
        .all()
    )
