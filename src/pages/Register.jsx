import React from "react"
import AddAvatar from "../img/AddAvatar.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Register = () => {

    const handleSubmit = (e) => {

        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];


        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...

                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }


    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Lama Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="displayName" id="displayName" placeholder="display name" />
                    <input type="email" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                    <input type="file" name="file" style={{ display: "none" }} id="file" />
                    <label htmlFor="file">
                        <img src={AddAvatar} alt="AddAvatar" />
                        <span>Add an avatar</span>
                    </label>
                    <button> Sign Up</button>
                </form>
                <p>You do have an account ? Login</p>
            </div>
        </div>

    )
}

export default Register