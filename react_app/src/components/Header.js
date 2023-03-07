import React from 'react';
import  Login  from './Login';

export const Header = ({doLogin, loggedIn, username, doLogOut}) => {
    return(
        <div className="header">
            <h1>React With NodeJS</h1>
            <Login doLogin={doLogin} loggedIn={loggedIn} username={username} doLogOut={doLogOut}/>
        </div>
    )
}