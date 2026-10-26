
from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from app.database import engine

router = APIRouter(prefix="/videos", tags=["Videos"])


@router.get("/{word}")
def get_video(word: str):
    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT id, word, video_url
                FROM sign_videos
                WHERE LOWER(word) = LOWER(:word)
                LIMIT 1
            """),
            {"word": word}
        ).mappings().first()

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Bu kelimeye ait video bulunamadı."
        )

    return {
        "id": result["id"],
        "word": result["word"],
        "video_url": result["video_url"]
    }
