import sqlalchemy as sql
import passlib.hash as hash

import database as db

class User(db.Base):
    __tablename__ = 'Users'
    id = sql.Column(sql.Integer, primary_key = True, index = True)
    email = sql.Column(sql.String, unique = True, index = True)
    hashed_password = sql.Column(sql.String)
    name = sql.Column(sql.String)
    position = sql.Column(sql.String)
    timeAtCompany = sql.Column(sql.Integer)
    pythonScore = sql.Column(sql.Integer)
    sparkScore = sql.Column(sql.Integer)
    sqlScore = sql.Column(sql.Integer)
    javaScore = sql.Column(sql.Integer)
    vbaScore = sql.Column(sql.Integer)
    cScore = sql.Column(sql.Integer)

    def verify_password(self, password: str):
        return hash.bcrypt.verify(password, self.hashed_password)
    

