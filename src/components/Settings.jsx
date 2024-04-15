import React from 'react'
import { Button, Image } from 'react-bootstrap'

export default function Settings({ firebaseUser, mongoUser }) {
    console.log(mongoUser)
    return (
        <div>
            <Image src='https://firebasestorage.googleapis.com/v0/b/triobudget.appspot.com/o/IMG_2989-EDIT.jpg?alt=media&token=18d7b38e-43af-4eae-b693-a6936cc5e8ad' roundedCircle style={{ width: '200px' }} className='m-4' />
            <div style={{ backgroundColor: 'white', width: '800px', height: 'fit-content', borderRadius: '20px', marginLeft: '40px' }}>

                <h1 className="display-5 ms-4 p-4">{mongoUser.email}</h1>
                <div className="ps-3">
                    <Button variant="primary" className="m-4">Change Password</Button>
                    <Button variant="primary" className="m-4">Change Picture</Button>
                    <Button variant="primary" className="m-4">Change Name</Button>
                    <Button variant="primary" className="m-4">Change Email</Button>
                </div>
            </div>
        </div>
    )
}
