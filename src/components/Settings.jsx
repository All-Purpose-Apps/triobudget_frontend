import React from 'react'

export default function Settings({ firebaseUser, mongoUser }) {
    return (
        <div>
            <h1>{mongoUser.email}</h1>
        </div>
    )
}
