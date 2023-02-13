import React, {useContext, useState} from 'react';
import {db} from "../firebase";
import {collection, query, where, getDoc, getDocs, setDoc, doc, updateDoc, serverTimestamp} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";


const Search = () => {

    const [username, setUsername] = useState( " " );

    const [user, setUser] = useState( null );

    const [error,setError] = useState(false);

    const {currentUser} = useContext(AuthContext)

    const handleSearch = async() => {
        //Search firebase query
        const q = query(collection(db, "users"), where("displayName", "==", username)
        );

        try{
        //Search multiple user from firebase query
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUser( doc.data() );
        });

        } catch (error) {
            setError(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async() => {
        // check if the group(chats in firestore) exists, if not create.
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;

        try{
            const res = await getDoc(doc(db, "chats", combinedId) );

            if(!res.exists()){
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), {messages: [] });

           //Create UserChats structure and search update document on firestore.
           //      userchats:{
           //          janesId:{
           //              combinedId:{
           //                  userInfo{
           //                      displayN,img,id
           //                  },
           //                  lastMessage: " ",
           //                      date:
           //              }
           //          }
           //      }

                ////create user chats between 2 users by searching update doc nested object in firebase
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId+ ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
            }
        } catch (error) {}
        setUser(null);
        setUsername (" ");
    };

    return (
        <div >
            <div className="search">
                <div className="searchForm">
                    <input
                        type="text"
                        placeholder='Search a user'
                        onKeyDown={handleKey}
                        onChange={ (e)=> setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                {error && <span>User not found!</span>}
                {/*handleSelect will add userChats collection into database */}
                {/*and also create chats collection where all chats are stored.*/}
                {user && <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt=""/>
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Search;