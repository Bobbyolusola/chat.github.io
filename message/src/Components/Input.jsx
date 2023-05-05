import React, {useState} from 'react';
import attachment from "../Images/attachment-line (2).png"
import image from "../Images/image-line (2).png"
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import {doc, updateDoc, arrayUnion, setDoc, Timestamp, serverTimestamp} from "firebase/firestore";
import {db, storage} from "../firebase";
import {v4 as uuid} from "uuid";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {updateProfile} from "firebase/auth";

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    // Search Update_document_Array from firebase
    const handleSend = async() => {
        if (img) {

            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

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

                (error) => {
                    // setError(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);

    };


    return (
        <div className="input">
            <input type="text" placeholder="Type something..."
                   onChange={ e=>
                    setText(e.target.value)}
                   value={text}
            />
            <div className="send">
                <img src={attachment} alt="" />
                <input type="file"
                       style={{display: "none"}} id="file"
                        onChange={e=> setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <img src={image} alt="" />
                </label>
                <button
                    onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input;