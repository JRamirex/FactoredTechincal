import pydantic as pydantic

class UserBase(pydantic.BaseModel):
    email: str

class UserCreate(UserBase):
    id: int
    hashed_password: str
    name: str
    position: str
    timeAtCompany: int
    pythonScore: int
    sparkScore: int
    sqlScore: int
    javaScore: int
    vbaScore: int
    cScore: int
    
    class Config:
        orm_mode = True
