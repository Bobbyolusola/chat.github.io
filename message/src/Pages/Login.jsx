import React from "react";
import Add from "../Images/avatar-bg.png";
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";


const Login = () => {

    const [error,setError] = useState(false);
    const navigate = useNavigate();

    const onHandleSubmit = async (e) => {
        e.preventDefault(); // prevents the button from refreshing the page.
        // console.log(e.target[0].value)

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate ( "/");

        } catch (error) {
            setError(true)
        }
    };

    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">IMessage</span>
                <span className="title">Login</span>

                <form onSubmit={onHandleSubmit}>
                    <input type="email" placeholder = "Email" />
                    <input type="password" placeholder = "Password" />

                    <button style={{cursor: "pointer"}}>Sign In</button>
                    {error && <span> Incorrect email or password</span>}

                </form>
                <p>You don't have an account? <Link to="/register"> SignUp </Link></p>

            </div>

        </div>
    )
}

export default Login;