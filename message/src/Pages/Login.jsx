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

            // const res = await createUserWithEmailAndPassword(auth, email, password);
            //
            // const storageRef = ref(storage, displayName);
            //
            // const uploadTask = uploadBytesResumable(storageRef, file);
            //
            // // Register three observers:
            // uploadTask.on('state_changed',
            //
            //     (snapshot) => {
            //         // Observe state change events such as progress, pause, and resume
            //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //         console.log('Upload is ' + progress + '% done');
            //         switch (snapshot.state) {
            //             case 'paused':
            //                 console.log('Upload is paused');
            //                 break;
            //             case 'running':
            //                 console.log('Upload is running');
            //                 break;
            //         }
            //     },
            //
            //     (error)=> {
            //         setError(true)
            //     },
            //     () => {
            //
            //         getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            //             await updateProfile(res.user, {
            //                 displayName,
            //                 photoURL: downloadURL,
            //             });
            //
            //             await setDoc(doc(db, "users", res.user.uid), {
            //                 uid: res.user.uid,
            //                 displayName,
            //                 email,
            //                 photoURL: downloadURL,
            //             });
            //
            //             await setDoc(doc(db, "userChats", res.user.uid), {});
            //             navigate("/");
            //         });
            //     }
            // );

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
                    {error && <span> Something went wrong</span>}

                </form>
                <p>You don't have an account? <Link to="/register"> SignUp </Link></p>

            </div>

        </div>
    )
}

export default Login;