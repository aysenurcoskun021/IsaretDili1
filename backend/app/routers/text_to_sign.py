from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/translate/text-to-sign")
def text_to_sign(request: TextRequest):
    text = request.text.strip()
    if not text:
        return {"success":False, 
                "message": "Lütfen metin giriniz."}

    words = text.lower().split()

    return {
        "success": True,
        "original_text": text,
        "words": words,
        "message": "Metin başarıyla parçalara ayrıldı." }