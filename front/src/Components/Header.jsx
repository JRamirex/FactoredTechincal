import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";

const Header = (props) =>
{
    const [token, setToken] = useContext(UserContext);
    const handleLogout = () =>
    {
        setToken(null);
    };

    return (
        <div className="has-text-centered m-6">
            <h1 className="title is-1">{props.title}</h1>
            {token && (<button className="button" onClick={handleLogout}>Logout</button>)}
        </div>
    )
};

export default Header;