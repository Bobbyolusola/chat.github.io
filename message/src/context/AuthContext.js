import {createContext, useEffect, useState} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export  const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect( ()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            console.log(user);
        });

        // Clean Up fnx to avoid memory leaking when using a real time operation like onAuthStateChanged
        return () => {
            unsub();
        };

    }, []);

    return (
        //Any component wrap with AuthContext.Provider will reach the value currentUser,
        // wrap your App.js or Index.js using AuthContext.Provider
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
        );
};