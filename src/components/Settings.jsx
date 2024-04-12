import React, { useState } from 'react';

const Settings = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayPicture, setDisplayPicture] = useState(null);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDisplayPictureChange = (e) => {
        const file = e.target.files[0];
        setDisplayPicture(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to server)
        // You can access the updated values using the state variables (username, email, password, displayPicture)
    };

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <label>
                    Display Picture:
                    <input type="file" accept="image/*" onChange={handleDisplayPictureChange} />
                </label>
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default Settings;