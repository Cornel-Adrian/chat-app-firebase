import React, { useState } from "react"
import AddAvatar from "../img/AddAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true);
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });


                        await setDoc(doc(db, "usersChat", res.user.id), {});
                        navigate('/');

                    });
                }
            );
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
                    <input type="text" name="displayName" id="displayName" placeholder="display name" />
                    <input type="email" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                    <input type="file" name="file" style={{ display: "none" }} id="file" />
                    <label htmlFor="file">
                        <img src={AddAvatar} alt="AddAvatar" />
                        <span>Add an avatar</span>
                    </label>
                    <button> Sign Up</button>
                    {err && <span>Something went wrong </span>}
                </form>
                <p>You do have an account ? <Link to="/login"> Sign Up</Link> </p>
            </div>
        </div>

    )
}

export default Register