import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {auth} from './firebase.js'
import './Login.css';

function Login() {

    const history = useHistory();
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');

    const sign_in = e => {

        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then((auth)=>{
            
            history.push('/amazon-clone')
        })
        .catch(error => alert(error.message))
        // Firebase login
    };

    const register = e => {

        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((auth)=>{

            console.log(auth);
            if(auth)
            {
                history.push('/');
            }
        })
        .catch(error => alert(error.message))

        // Firebase register 
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt=""/>
            </Link>
        
            <div className="login-container">
                <h1>Sign-in</h1>

                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => set_email(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => set_password(e.target.value)} />

                    <button onClick={sign_in} className="login-signin-button">Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className="login-register-button">Create your Amazon Clone Account</button>
            </div>
        </div>
    )
}

export default Login;
