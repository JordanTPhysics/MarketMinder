import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const LoginPage: React.FC = () => {
    const { user, error, isLoading } = useUser();

    return (
        <div className='flex flex-col text-text items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
            <h1 className='text-3xl '></h1>
            {!user ? (
                <button onClick={() => { }}>Log In</button>
            ) : (
                <div>
                    <h2>Welcome, {user?.name}!</h2>
                    <button onClick={() => { }}>
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;