import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SideBar = ({ handleSignOut }) => {
    return (
        <div className="d-flex flex-column vh-100 bg-primary text-white" style={{ borderRadius: '10px' }}>
            <Nav className="flex-column p-4">
                <Nav.Item className="mb-2">
                    <h3 className="text-center mb-4">TrioBudget</h3>
                </Nav.Item>
                <Nav.Link as={Link} to="/transactions/settings" className="text-white p-2 mb-2 bg-secondary rounded">Settings</Nav.Link>
            </Nav>
        </div>
    );
};

export default SideBar;
