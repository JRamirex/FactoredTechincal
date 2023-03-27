import pydantic as pydantic

class User(pydantic.BaseModel):
    id: int
    email: str 
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
