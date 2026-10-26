from fastapi import FastAPI
from app.routers import text_to_sign, auth, sign_videos
from sqlalchemy import text
from app.database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title = "İşaret Dili Çevirisi API",
    description = "Gerçek Zamanlı çift yönlü işaret dili çeviri projesi",
    version = "0,1,0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(text_to_sign.router)
app.include_router(auth.router)
app.include_router(sign_videos.router)

@app.get("/")
def home():
    return {"message": "İşaret Dili Çevirisi API çalışıyor!"}

@app.get("/health")
def health_check():
    return {"status": "OK"}

@app.get("/db-check")
def check_database():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1")).scalar_one()
            return{"success": True, "message": "PostgreSQL veritabanına başarıyla bağlanıldı." , "test_result": result}
    except Exception as e:
        print("VERITABANI HATASI:", repr(e))
        return {
            "success": False,
            "message": "PostgreSQL veritabanına bağlanılamadı."
        }

