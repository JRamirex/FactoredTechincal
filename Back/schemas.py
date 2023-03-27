import pydantic as pydantic

# La clase basica que se utiliza para gets y posts
class UserBase(pydantic.BaseModel):
    email: str
    name: str
    position: str
    timeAtCompany: int
    pythonScore: int
    sparkScore: int
    sqlScore: int
    javaScore: int
    vbaScore: int
    cScore: int

# La clase que se utiliza para hacer la creación de un usuario, hereda de la clase básica
class UserCreate(UserBase):
    id: int
    hashed_password: str
    
    class Config:
        orm_mode = True
        
# La clase que se trae cuando se quiere traer un usuario
class User(UserBase):
    class Config:
        orm_mode = True

