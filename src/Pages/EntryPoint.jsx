import { useState } from 'react';
import { Container, Row, Col, Button, Collapse, Image } from 'react-bootstrap';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import clouds from '@assets/clouds.mp4';

export default function EntryPoint() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    const handleForms = (button) => {
        if (button === 'Login') {
            setShowLoginForm(!showLoginForm);
            setShowSignUpForm(false);
        } else {
            setShowSignUpForm(!showSignUpForm);
            setShowLoginForm(false);
        }
    }

    return (
        <Container fluid style={{ height: '100vh', color: "white" }}>
            <Row className="h-100">
                <Col md={3} style={{
                    background: 'linear-gradient(34deg, rgba(150,201,142,1) 0%, rgba(87,185,200,1) 35%, rgba(88,187,200,1) 67%, rgba(120,224,188,1) 100%)',
                    borderRight: '6px solid rgba(31, 40, 54, .2)',
                    overflow: 'auto'  // Allows scroll on overflow
                }}>
                    <Row className='my-5 mx-2 text-center'>
                        <Image src='images/TrioBudget Logo Alone.png' fluid className="rounded mx-auto d-block logo-alone" />
                    </Row>
                    <Row className='my-5 mx-2'>
                        <Button onClick={() => handleForms('Login')} aria-controls="loginForm"
                            aria-expanded={showLoginForm} className="auth-buttons">Login</Button>
                        <Collapse in={showLoginForm}>
                            <div id="loginForm">
                                <Login />
                            </div>
                        </Collapse>
                    </Row>
                    <Row className='my-5 mx-2'>
                        <Button onClick={() => handleForms('SignUp')} aria-controls="signUpForm"
                            aria-expanded={showSignUpForm} className="auth-buttons">Sign Up</Button>
                        <Collapse in={showSignUpForm}>
                            <div id="signUpForm" className="my-4">
                                <SignUp />
                            </div>
                        </Collapse>
                    </Row>
                    <Row className="my-5 mx-2" style={{ textAlign: 'right' }}>
                        <p>Need help?</p>
                    </Row>
                    <Row style={{ alignContent: 'flex-end', textAlign: 'right' }}>
                        <p>Privacy Policy<br />Terms of Service<br />Cookie Policy</p>
                    </Row>
                </Col>
                <Col className="d-flex justify-content-center align-items-center flex-column">
                    <Image src='images/TrioBudget Logo.png' className="mx-auto d-block logo-image" />
                    <video className='videoTag' autoPlay loop muted>
                        <source src={clouds} type='video/mp4' />
                    </video>
                </Col>
            </Row>
        </Container>
    );
}
