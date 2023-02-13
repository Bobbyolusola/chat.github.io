import React, {useContext} from 'react';
import Cam from "../Images/vidicon-fill (1).png";
import Add from "../Images/user-add-line (1).png";
import More from "../Images/more-fill (1).png";
import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);

    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat;