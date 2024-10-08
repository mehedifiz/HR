import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (user) {
            setValue('displayName', user.displayName);
            setValue('email', user.email);
        }
    }, [user, setValue]);

    const onSubmit = (data) => {
        updateUserProfile(data.displayName, user?.photoURL)
            .then(() => {
                console.log('Name updated successfully');
                // Optionally, update context or state
            })
            .catch((error) => {
                console.error('Error updating name:', error);
            });
    };

    return (
        <div className='min-h-screen container mx-auto flex justify-center items-center'>
            <div className='lg:w-4/12 md:w-5/12 w-full flex flex-col justify-center items-center shadow-xl py-12 border'>
                <img className='w-24 h-24 rounded-full' src={user?.photoURL} alt="" />
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center'>
                    <div>
                        <input
                            className='text-center'
                            type="text"
                            {...register('displayName')}
                            name="displayName"
                            id="displayName"
                        />
                    </div>
                    <div>
                        <input
                            className='text-center'
                            type="text"
                            {...register('email')}
                            name="email"
                            id="email"
                            readOnly
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
