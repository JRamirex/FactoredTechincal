import React, { useContext, useState } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";

const Login = () =>
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitLogin = async () =>
    {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: JSON.stringify
            (
                `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
            ),
        };

        const response = await fetch('http://localhost:8000/back/token', requestOptions);
        const data = await response.json();
        if (!response.ok)
        {
            setErrorMessage(data.detail);
        } 
        else 
        {
            setToken(data.access_token);
        }
        console.log(data)
    };


    const handleSubmit = (e) => 
    {
        e.preventDefault();
        submitLogin();
    };


    return (
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centerd"></h1>
                <div className="control">
                    <input
                    type='email'
                    placeholder="Enter email"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    className = 'input'
                    required
                    />
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                        type='password'
                        placeholder="Enter Password"
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                        className= 'input'
                        required
                        />
                    </div>
                </div>
                <ErrorMessage message={errorMessage}/>
                <br/>
                <button className="button is-primary" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
    
