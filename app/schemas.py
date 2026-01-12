from pydantic import BaseModel
from datetime import date

class SetItem(BaseModel):
    set_number: int
    reps: int
    weight: float


class BatchSetCreate(BaseModel):
    date: date
    day_name: str | None = None
    exercise_name: str
    sets: list[SetItem]


class SetProgress(BaseModel):
    date: date
    set_number: int
    reps: int
    weight: float

    class Config:
        from_attributes = True
