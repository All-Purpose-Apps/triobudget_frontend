import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Spinner, Button, Image, Collapse } from 'react-bootstrap';
import Login from './components/AuthComponents/Login';
import SignUp from './components/AuthComponents/SignUp';


export default function EntryPoint() {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);



    return (

        <Container fluid style={{ height: '100vh', color: "white" }}>
            <Row style={{ height: '100%' }}>
                <Col md={3} style={{ backgroundColor: '#5d77a2' }}>
                    <Row md={3} className='my-5 mx-2 text-center'>
                        <Image src='images/TrioBudget Logo.png' fluid className="rounded mx-auto d-block" />
                    </Row>
                    <Row className='my-5 mx-2'>
                        <Button onClick={() => setShowLoginForm(!showLoginForm)} aria-controls="showLoginForm"
                            aria-expanded={showLoginForm} >Login</Button>
                        <Collapse in={showLoginForm}>
                            <div id="loginForm" >
                                <Login />
                            </div>
                        </Collapse>
                    </Row>
                    <Row className='my-5 mx-2'>
                        <Button onClick={() => setShowSignUpForm(!showSignUpForm)} aria-controls="signUpForm"
                            aria-expanded={showSignUpForm} >Sign Up</Button>
                        <Collapse in={showSignUpForm}>
                            <div id="signUpForm" >
                                <SignUp />
                            </div>
                        </Collapse>

                    </Row>
                    <Row className="my-5 mx-2">
                        <p>Forgot Password?</p>
                    </Row>
                    <Row className="my-5 mx-2">
                        <p>Need help?</p>
                    </Row>
                    <Row>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                        <p>Cookie Policy</p>
                        <p>Ads info</p>
                        <p>More</p>
                    </Row>
                </Col>
                <Col style={{ backgroundColor: '#1F2836' }}>
                    <Image src='images/TrioBudget Logo.png' fluid className="p-4 rounded mx-auto d-block" />
                </Col>
            </Row>

        </Container >
    )

}
