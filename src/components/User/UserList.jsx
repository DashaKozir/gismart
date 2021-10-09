import React from 'react';
import UserCard from "./UserCard";

const UserList = ({allUsers}) => {

    return (
        <>
            <section className='container'>
                {allUsers.map(user => (
                    <UserCard
                        key={user.id}
                        title={user.title}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        email={user.email}
                        src={user.picture}
                    />
                ))}
            </section>

        </>
    );
};

export default UserList;