import React from 'react';
import attachment from "../Images/attachment-line (2).png"
import image from "../Images/image-line (2).png"


const Input = () => {

    return (
        <div className="input">
            <input type="text" placeholder="Type something..." />
            <div className="send">
                <img src={attachment} alt=""/>
                <input type="file" style={{display: "none"}} id="file"/>
                <label htmlFor="file">
                    <img src={image} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input;