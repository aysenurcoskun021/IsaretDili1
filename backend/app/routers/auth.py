from fastapi import APIRouter
from app.schemas import UserRegister
from app.schemas import UserLogin

from fastapi import HTTPException, status
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from app.database import engine
from app.security import hash_password
from app.security import verify_password

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"])


@router.post("/register", status_code=201)
def register(user: UserRegister):


    full_name = f"{user.first_name} {user.last_name}"
    email = str(user.email).strip().lower()

    try:

        with engine.begin() as connection:

           
            existing_user = connection.execute(
                text("""
                    SELECT id FROM users
                    WHERE lower(email) = :email
                """),
                {"email": email}
            ).first()

            if existing_user:
                raise HTTPException(
                    status_code=409,
                    detail="Bu e-posta zaten kayıtlı."
                )

           
            hashed_password = hash_password(user.password)

           
            result = connection.execute(
                text("""
                    INSERT INTO users (
                        full_name,
                        email,
                        password_hash
                    )
                    VALUES (
                        :full_name,
                        :email,
                        :password_hash
                    )
                    RETURNING id, full_name, email
                """),
                {
                    "full_name": full_name,
                    "email": email,
                    "password_hash": hashed_password
                }
            )

            new_user = result.mappings().one()

        
        return {
            "message": "Kayıt başarılı!",
            "user": {
                "id": str(new_user["id"]),
                "full_name": new_user["full_name"],
                "email": new_user["email"]
            }
        }

    except HTTPException:
        raise

    except IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="E-posta zaten kullanılıyor olabilir."
        )

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Veritabanı işlemi başarısız."
        )



@router.post("/login")
def login(user: UserLogin):

   
    email = str(user.email).strip().lower()


    try:
        with engine.connect() as connection:
            result = connection.execute(
                text("""
                    SELECT id, full_name, email,
                           password_hash, account_status
                    FROM users
                    WHERE lower(email) = :email
                      AND auth_provider = 'email'
                """),
                {"email": email}
            )

            db_user = result.mappings().first()

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Veritabanı bağlantı hatası."
        )

    
    if not db_user or not db_user["password_hash"]:
        raise HTTPException(
            status_code=401,
            detail="E-posta veya şifre hatalı."
        )

    if not verify_password(
        user.password,
        db_user["password_hash"]
    ):
        raise HTTPException(
            status_code=401,
            detail="E-posta veya şifre hatalı."
        )

    
    if db_user["account_status"] != "active":
        raise HTTPException(
            status_code=403,
            detail="Bu hesap aktif değil."
        )

    
    return {
        "message": "Giriş başarılı!",
        "user": {
            "id": str(db_user["id"]),
            "full_name": db_user["full_name"],
            "email": db_user["email"]
        }
    }
