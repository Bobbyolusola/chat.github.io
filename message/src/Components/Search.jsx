import React from 'react';

const Search = () => {

    return (
        <div >
            <div className="search">
                <div className="searchForm">
                    <input type="text" placeholder='Search a user'/>
                </div>
                <div className="userChat">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbW8MuFS22fhB0fnxo23fxsislDzPjU11LQ&usqp=CAU" alt=""/>
                    <div className="userChatInfo">
                        <span>Jane</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;