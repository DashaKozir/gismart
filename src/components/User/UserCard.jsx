import React from 'react';

const UserCard = ({title, email, firstName, lastName, src}) => {
    return (
        <>
            <section className='userCard_section'>
                <img className='user_img' src={src} alt="avatar"/>
                <p className='user_name'>{title} {firstName} {lastName}</p>
                <p>Email: {email}</p>
            </section>
        </>
    );
};

export default UserCard;