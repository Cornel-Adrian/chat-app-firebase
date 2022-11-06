import React from "react"
import AddAvatar from "../img/AddAvatar.png";

const Register = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Lama Chat</span>
                <span className="title">Register</span>
                <form >
                    <input type="text" name="displayName" id="displayName" placeholder="display name" />
                    <input type="email" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                    <input type="file" name="file" style={{display:"none"}} id="file" />
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