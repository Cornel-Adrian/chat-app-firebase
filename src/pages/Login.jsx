import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {

            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setErr(true);
        }

    }
    return (

        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Lama Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                    <button onSubmit={handleSubmit}> Sign In</button>
                    {err && <span>Something went wrong </span>}
                </form>
                <p>You don't have an account ? <Link to="/register"> Register</Link></p>
            </div>
        </div>

    )
}

export default Login;