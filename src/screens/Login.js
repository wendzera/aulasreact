import React from "react";
import styles from "./Login.module.css";
import { useState, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';

const Login = () => {

        const [displayEmail, setEmail]  = useState('');
        const [displayPassword, setPassword]  = useState('');
        const [error, setError] = useState('');
        const { login, error: authEror, loading} = useAuthentication();
     
        const handleSubmit = async (e)=> {
            e.preventDefault();
            setError("")
     
        const user = {
           email: displayEmail,
           password: displayPassword,
        }

        const res = await login(user);     

    }
        useEffect(() => {
        if (authEror) {
            setError(authEror);
        }
 
       
     }, [authEror]);
       
         
    return (
        <div>
            <h2>Faça seu login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>E-mail:</span>
                    <input type="email" name="displayEmail" required placeholder="E-mail" 
                        value={displayEmail}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                
                <label>
                    <span>Senha:</span>
                    <input type="password" name="password" required placeholder="Senha" />
                    value={displayPassword}
                    onChange={(e) => setPassword(e.target.value)}
                </label>
                {!loading && <button className="btn">Entrar</button>}
                {loading &&  <button className="btn" disabled>Aguarde...</button>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
