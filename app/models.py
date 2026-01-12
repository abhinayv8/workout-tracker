from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base

class WorkoutSession(Base):
    __tablename__ = "workout_sessions"

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    day_name = Column(String)

    sets = relationship("SetLog", back_populates="session")


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

    sets = relationship("SetLog", back_populates="exercise")


class SetLog(Base):
    __tablename__ = "set_logs"

    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("workout_sessions.id"))
    exercise_id = Column(Integer, ForeignKey("exercises.id"))

    set_number = Column(Integer)
    reps = Column(Integer)
    weight = Column(Float)

    session = relationship("WorkoutSession", back_populates="sets")
    exercise = relationship("Exercise", back_populates="sets")
