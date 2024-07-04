from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,Session
from sqlalchemy.engine import URL

# url_object = URL.create(
#     "postgresql+pg8000",
#     username="db_user",
#     password="p@ssw0rd",
#     host="codx-minerva.postgres.database.azure.com",
#     database="dap_session",
# )
database_URL = "sqlite:///C:/Users/VenkateshAdinani/OneDrive - TheMathCompany Private Limited/Desktop/Social-Media-Listening-Tool/capstone_db.db"
engine = create_engine(database_URL,
                    connect_args={"check_same_thread": False},
                    pool_size=100, # Increase the pool size to handle more connections
                    max_overflow=200, # Allow more overflow connections
                    pool_timeout=300 # Set the pool timeout duration
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
