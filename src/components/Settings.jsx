import React from 'react';
import MKButton from './MKComponents/MKButton';
import MKAvatar from './MKComponents/MKAvatar';

export default function Settings({ firebaseUser, mongoUser }) {
    return (
        <div>
            <MKAvatar src={'https://firebasestorage.googleapis.com/v0/b/triobudget.appspot.com/o/IMG_2989-EDIT.jpg?alt=media&token=18d7b38e-43af-4eae-b693-a6936cc5e8ad'} alt="xxl" size="xxl" />
            <div style={{ backgroundColor: 'white', width: '80vw', height: '50vh', borderRadius: '20px', marginLeft: '40px' }}>
                <h1 className="display-5 ms-4 p-4">{mongoUser.email}</h1>
                <div className="ps-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <MKButton variant="gradient" color="info" size="large" className="my-2">Change Password</MKButton>
                    <MKButton variant="gradient" color="info" size="large" className="my-2">Change Picture</MKButton>
                    <MKButton variant="gradient" color="info" size="large" className="my-2">Change Name</MKButton>
                    <MKButton variant="gradient" color="info" size="large" className="my-2">Change Email</MKButton>
                </div>
            </div>
        </div>
    );
}
