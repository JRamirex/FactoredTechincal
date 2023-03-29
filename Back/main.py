from typing import Union
from fastapi import FastAPI, Depends, HTTPException
import fastapi.security as security
from pydantic import BaseModel
import sqlalchemy.orm as orm 

import services, schemas

# Fix to cors issues
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

@app.get('/back')
def read_root():
    return {'Hello World'}


@app.post('/back/users')
async def create_user(
    user: schemas.UserCreate, db: orm.Session = Depends(services.get_db)
):
    db_user = await services.get_user_by_email(user.email, db)
    
    if db_user:
        raise HTTPException(status_code=400, detail='Email already in use')
    
    user = await services.create_user(user, db)
    
    return await services.create_token(user)
    

@app.post('/back/token')
async def generate_token(
    form_data: security.OAuth2PasswordRequestForm = Depends(),
    db: orm.Session = Depends(services.get_db)
):
    user = await services.authenticate_user(form_data.username, form_data.password, db)
    
    if not user:
        raise HTTPException(status_code = 401, detail = 'Wrong password or user')
    
    return await services.create_token(user)


@app.get('/back/user/me', response_model= schemas.User)
async def get_user(user: schemas.User = Depends(services.get_current_user)):
    return user
    
