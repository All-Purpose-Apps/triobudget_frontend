import React from 'react';
import { Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tbLogoAloneLight from '../assets/tbLogoAloneLight.png';

const SideBar = () => {
    return (
        <div className="d-flex flex-column vh-100 bg-primary text-white" style={{ borderRadius: '10px' }}>
            <Nav className="flex-column p-4">
                <Nav.Item className="mb-2 text-center">
                    <Image fluid src={tbLogoAloneLight} style={{ width: '50%' }} />
                    <h3 className="text-center my-4">TrioBudget</h3>
                </Nav.Item>
                <Nav.Link as={Link} to="/transactions" className="nav-link-custom">Transactions</Nav.Link>
                <Nav.Link as={Link} to="/transactions/settings" className="nav-link-custom">Settings</Nav.Link>
            </Nav>
        </div>
    );
};

export default SideBar;