import jwt
import database, models, schemas
import sqlalchemy.orm as orm
import passlib.hash as hash

JWT_SECRET = 'myjwtsecret'


def create_database():
    return database.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

async def get_user_by_email(email: str, db: orm.Session):
    return db.query(models.User).filter(models.User.email == email).first()


async def create_user(user: schemas.UserCreate, db: orm.Session):
    user_obj = models.User(email = user.email, hashed_password = hash.bcrypt.hash(user.hashed_password), name = user.name, position = user.position, timeAtCompany = user.timeAtCompany, pythonScore = user.pythonScore, sparkScore = user.sparkScore, sqlScore = user.sqlScore, javaScore = user.javaScore, vbaScore = user.vbaScore, cScore = user.cScore)
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


async def authenticate_user(email: str, password: str, db: orm.Session):
    user = await get_user_by_email(email, db)
    
    if not user:
        return False
    
    if not user.verify_password(password):
        return False
    
    return user

async def create_token(user: models.User):
    user_obj = schemas.User.from_orm(user)
    
    token = jwt.encode( user_obj.dict(), JWT_SECRET)
    
    return dict(access_token = token, token_type = 'bearer')