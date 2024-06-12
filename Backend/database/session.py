from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,Session
from sqlalchemy.engine import URL

url_object = URL.create(
    "postgresql+pg8000",
    username="db_user",
    password="p@ssw0rd",
    host="codx-minerva.postgres.database.azure.com",
    database="dap_session",
)

engine = create_engine(url_object)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
