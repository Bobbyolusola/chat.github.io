import React, {useState} from "react";
import Add from "../Images/avatar-bg.png";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, db, storage} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {Link, useNavigate} from "react-router-dom";



const Register = () => {

    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState('');


    const onHandleSubmit = async (e) => {
        e.preventDefault(); // prevents the button from refreshing the page.
        // console.log(e.target[0].value)
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            uploadTask.on('state_changed',

                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },

                (error)=> {
                    setError(true)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
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

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    });
                }
            );

        } catch (error) {
         setError(true)
        }

            // .then((userCredential) => {
            //     // Signed in
            //     const user = userCredential.user;
            //     console.log(user)
            //     // ...
            // })
            // .catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     // ..
            // });



    };

    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">IChat</span>
                <span className="title">Register</span>

                <form onSubmit={onHandleSubmit}>
                    <input type="text" placeholder = "Display name" />
                    <input type="email" placeholder = "Email" />
                    <input type="password" placeholder = "Password" />
                    <input style={{display: "none"}} type="file" id="file"
                           onChange={(e) => { console.log(e.target.files);
                               setFile(e.target.files[0])
                           } }

                    />
                    <label htmlFor="file">
                        {console.log(file)}
                        <img style={{width: "40px", borderRadius: "50px"}}  src={
                            file
                                ? URL.createObjectURL(file)
                                : Add
                        } alt=""
                        />
                        <span>Add Image</span>
                    </label>
                    <button style={{cursor: "pointer"}} >Sign up</button>
                    {error && <span style={{color: "red"}}> Enter Correct details</span>}
                </form>
                <p>Already have an account? <Link to="/login"> Login </Link></p>

            </div>

        </div>
    )
}

export default Register;