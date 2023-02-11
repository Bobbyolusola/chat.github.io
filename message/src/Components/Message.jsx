import React from 'react';

const Message = () => {

    return (
        <div className="message owner">
            <div className="messageInfo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxX0_WgyBYGSUJZVl3-X2s6Oar73_J5sS0CQ&usqp=CAU"  alt=""/>
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>hello</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxX0_WgyBYGSUJZVl3-X2s6Oar73_J5sS0CQ&usqp=CAU" alt="" />
            </div>
        </div>
    )
}

export default Message;