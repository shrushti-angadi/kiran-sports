"from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'kiransports2026')

# In-memory token store for the lightweight admin session
ACTIVE_TOKENS = set()

app = FastAPI()
api_router = APIRouter(prefix=\"/api\")


# ============== MODELS ==============
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str  # Cricket, Football, Tennis, Basketball, Volleyball
    price: float
    image_url: str = \"\"
    description: str = \"\"
    in_stock: bool = True
    created_at: str = Field(default_factory=now_iso)


class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    image_url: str = \"\"
    description: str = \"\"
    in_stock: bool = True


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    description: Optional[str] = None
    in_stock: Optional[bool] = None


class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: str = Field(default_factory=now_iso)
    read: bool = False


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class LoginRequest(BaseModel):
    password: str


class LoginResponse(BaseModel):
    token: str


# ============== AUTH ==============
def require_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith(\"Bearer \"):
        raise HTTPException(status_code=401, detail=\"Missing token\")
    token = authorization.replace(\"Bearer \", \"\")
    if token not in ACTIVE_TOKENS:
        raise HTTPException(status_code=401, detail=\"Invalid token\")
    return token


# ============== ROUTES ==============
@api_router.get(\"/\")
async def root():
    return {\"message\": \"Kiran Sports API\"}


@api_router.post(\"/admin/login\", response_model=LoginResponse)
async def admin_login(req: LoginRequest):
    if req.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail=\"Invalid password\")
    token = secrets.token_urlsafe(32)
    ACTIVE_TOKENS.add(token)
    return LoginResponse(token=token)


@api_router.post(\"/admin/logout\")
async def admin_logout(token: str = Depends(require_admin)):
    ACTIVE_TOKENS.discard(token)
    return {\"ok\": True}


@api_router.get(\"/admin/verify\")
async def admin_verify(token: str = Depends(require_admin)):
    return {\"ok\": True}


# Products - public
@api_router.get(\"/products\", response_model=List[Product])
async def list_products(category: Optional[str] = None):
    query = {}
    if category and category.lower() != \"all\":
        query[\"category\"] = category
    docs = await db.products.find(query, {\"_id\": 0}).sort(\"created_at\", -1).to_list(1000)
    return [Product(**d) for d in docs]


@api_router.get(\"/products/featured\", response_model=List[Product])
async def featured_products():
    docs = await db.products.find({\"in_stock\": True}, {\"_id\": 0}).sort(\"created_at\", -1).limit(6).to_list(6)
    return [Product(**d) for d in docs]


@api_router.get(\"/products/{product_id}\", response_model=Product)
async def get_product(product_id: str):
    doc = await db.products.find_one({\"id\": product_id}, {\"_id\": 0})
    if not doc:
        raise HTTPException(status_code=404, detail=\"Not found\")
    return Product(**doc)


# Products - admin
@api_router.post(\"/products\", response_model=Product)
async def create_product(payload: ProductCreate, _: str = Depends(require_admin)):
    product = Product(**payload.model_dump())
    await db.products.insert_one(product.model_dump())
    return product


@api_router.put(\"/products/{product_id}\", response_model=Product)
async def update_product(product_id: str, payload: ProductUpdate, _: str = Depends(require_admin)):
    existing = await db.products.find_one({\"id\": product_id}, {\"_id\": 0})
    if not existing:
        raise HTTPException(status_code=404, detail=\"Not found\")
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    if updates:
        await db.products.update_one({\"id\": product_id}, {\"$set\": updates})
    doc = await db.products.find_one({\"id\": product_id}, {\"_id\": 0})
    return Product(**doc)


@api_router.delete(\"/products/{product_id}\")
async def delete_product(product_id: str, _: str = Depends(require_admin)):
    result = await db.products.delete_one({\"id\": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Not found\")
    return {\"ok\": True}


# Contact submissions
@api_router.post(\"/contact\", response_model=ContactSubmission)
async def submit_contact(payload: ContactCreate):
    sub = ContactSubmission(**payload.model_dump())
    await db.contacts.insert_one(sub.model_dump())
    return sub


@api_router.get(\"/contact\", response_model=List[ContactSubmission])
async def list_contacts(_: str = Depends(require_admin)):
    docs = await db.contacts.find({}, {\"_id\": 0}).sort(\"created_at\", -1).to_list(1000)
    return [ContactSubmission(**d) for d in docs]


@api_router.delete(\"/contact/{contact_id}\")
async def delete_contact(contact_id: str, _: str = Depends(require_admin)):
    result = await db.contacts.delete_one({\"id\": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Not found\")
    return {\"ok\": True}


# Seeding
SEED_PRODUCTS = [
    # Cricket
    {\"name\": \"SG RSD Spark English Willow Bat\", \"category\": \"Cricket\", \"price\": 4499, \"description\": \"Professional grade English willow bat with premium grip.\"},
    {\"name\": \"SS Ton Player Cricket Kit Bag\", \"category\": \"Cricket\", \"price\": 2799, \"description\": \"Heavy-duty wheeled kit bag with multiple compartments.\"},
    {\"name\": \"Kookaburra Red Leather Ball\", \"category\": \"Cricket\", \"price\": 899, \"description\": \"4-piece hand-stitched match-grade leather ball.\"},
    {\"name\": \"Shrey Master Class Helmet\", \"category\": \"Cricket\", \"price\": 3299, \"description\": \"Lightweight helmet with titanium grille protection.\"},
    # Football
    {\"name\": \"Nivia Storm Football (Size 5)\", \"category\": \"Football\", \"price\": 749, \"description\": \"Hand-stitched synthetic football for ground play.\"},
    {\"name\": \"Cosco Astra Football Shin Guard\", \"category\": \"Football\", \"price\": 449, \"description\": \"EVA foam shin guards with adjustable strap.\"},
    {\"name\": \"Vector X Goalkeeper Gloves\", \"category\": \"Football\", \"price\": 1199, \"description\": \"Latex palm gloves with finger save protection.\"},
    # Tennis
    {\"name\": \"Yonex Astrox 88D Pro Racket\", \"category\": \"Tennis\", \"price\": 5499, \"description\": \"Power-focused racket with aerodynamic head.\"},
    {\"name\": \"Babolat Pure Drive Tennis Ball (Can of 3)\", \"category\": \"Tennis\", \"price\": 399, \"description\": \"All court championship tennis balls.\"},
    {\"name\": \"Wilson Pro Overgrip Pack\", \"category\": \"Tennis\", \"price\": 599, \"description\": \"Pack of 3 tacky overgrips for sweat absorption.\"},
    # Basketball
    {\"name\": \"Spalding NBA Street Basketball\", \"category\": \"Basketball\", \"price\": 1599, \"description\": \"Outdoor durable rubber basketball, size 7.\"},
    {\"name\": \"Cosco Hoop Master Basketball Ring\", \"category\": \"Basketball\", \"price\": 1899, \"description\": \"Steel rim with net, wall-mountable.\"},
    {\"name\": \"Nivia Heat Resist Basketball\", \"category\": \"Basketball\", \"price\": 999, \"description\": \"Indoor-outdoor synthetic leather basketball.\"},
    # Volleyball
    {\"name\": \"Mikasa MVA 200 Volleyball\", \"category\": \"Volleyball\", \"price\": 2299, \"description\": \"Official FIVB approved match volleyball.\"},
    {\"name\": \"Cosco Volley 18p Volleyball\", \"category\": \"Volleyball\", \"price\": 649, \"description\": \"18-panel synthetic volleyball, training grade.\"},
    {\"name\": \"Nivia Volleyball Net Heavy Duty\", \"category\": \"Volleyball\", \"price\": 1299, \"description\": \"Tournament-grade net with steel cable.\"},
]


@app.on_event(\"startup\")
async def seed_data():
    count = await db.products.count_documents({})
    if count == 0:
        docs = [Product(**p).model_dump() for p in SEED_PRODUCTS]
        await db.products.insert_many(docs)
        logger.info(f\"Seeded {len(docs)} products\")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=[\"*\"],
    allow_headers=[\"*\"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event(\"shutdown\")
async def shutdown_db_client():
    client.close()
"
