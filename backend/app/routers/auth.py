from fastapi import APIRouter
from app.schemas import UserRegister
from app.schemas import UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"])

@router.post("/register", status_code=200)
def register(user: UserRegister):
    return {
        "message": "Kayıt bilgileri doğrulandı.",
        "user": {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        }
    }

@router.post("/login")
def login(user: UserLogin):
    return {
        "message" : "Giriş bilgileri doğrulandı.",
        "email": user.email
    }