
from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.database import engine

router = APIRouter()


class TextRequest(BaseModel):
    text: str


@router.post("/translate/text-to-sign")
def text_to_sign(request: TextRequest):

    original_text = request.text.strip()

    if not original_text:
        return {
            "success": False,
            "message": "Lütfen metin giriniz."
        }

    words = original_text.lower().split()
    results = []

    try:
        with engine.connect() as connection:

            for word in words:

                query = text("""
                    SELECT
                        id,
                        term,
                        video_url,
                        category
                    FROM sign_videos
                    WHERE LOWER(TRIM(term)) = :word
                    LIMIT 1
                """)

                video = connection.execute(
                    query,
                    {"word": word}
                ).mappings().first()

                if video:
                    results.append({
                        "word": word,
                        "found": bool(video["video_url"]),
                        "video_url": video["video_url"],
                        "category": video["category"]
                    })

                else:
                    results.append({
                        "word": word,
                        "found": False,
                        "video_url": None,
                        "category": None
                    })

    except SQLAlchemyError:
        return {
            "success": False,
            "message": "Veritabanından video bilgileri alınamadı."
        }

    return {
        "success": True,
        "original_text": original_text,
        "words": words,
        "results": results,
        "message": "Metin için video araması tamamlandı."
    }
