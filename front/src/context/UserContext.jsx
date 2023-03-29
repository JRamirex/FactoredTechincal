import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => 
{
    const [token, setToken] = useState(localStorage.getItem('myUserToken'))
    useEffect(() =>{
        const fetchUser = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
            };

            const response = await fetch('http://localhost:8000/back/user/me', requestOptions);

            if (!response.ok){
                setToken(null);
            }
            localStorage.setItem('myUserToken', token);
        };
        fetchUser();
    }, [token]);

    return(
        <UserContext.Provider value = {[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}

