from sqlalchemy import Column, Integer, String, JSON

from app.database import Base


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)

    url = Column(String, nullable=False)

    status = Column(String, default="processing")

    results = Column(JSON, nullable=True)