import React, {useContext, useEffect, useState} from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";


const Chats = () => {

    const [chats, setChats] = useState ( [] )

    const {currentUser} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)

    useEffect( ()=> {
        const getChats = () => {
            //using real time get from firebase
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            // unsub cleans up the onSnapshot fnx from memory leaking
            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    console.log(chats);

    console.log(Object.entries(chats)); // to change chats objects to array

    const handleSelect = (u) => {
        dispatch ({type: "CHANGE_USER", payload: u} )
    };

    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((b,a) => a[1].date - b[1].date).map((chat) => (
                <div className="userChat"
                     key={chat[0]}
                     onClick={ ()=> handleSelect(chat[1].userInfo)}>
                    <img
                        src={chat[1].userInfo.photoURL}
                        alt=""
                    />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <div style={{ color: "lightgray"}}>{chat[1].lastMessage?.text}</div>
                    </div>
                </div>
                ))}

        </div>
    );
};

export default Chats;