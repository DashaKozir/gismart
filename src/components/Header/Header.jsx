import React from 'react';

const Header = ({onClick}) => {
    return (
        <div className='header'>
            <h1 className='header_title'>users list</h1>
            <button className='header_button' onClick={onClick}>Create new user</button>
        </div>
    );
};

export default Header;