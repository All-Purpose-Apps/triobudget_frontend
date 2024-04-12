import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Spinner, Button, Image, Collapse } from 'react-bootstrap';
import Login from '../components/AuthComponents/Login';
import SignUp from '../components/AuthComponents/SignUp';
import clouds from '../assets/clouds.mp4'

export default function EntryPoint() {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    return (

        <Container fluid style={{ height: '100vh', color: "white" }}>
            <Row style={{ height: '100%' }}>
                <Col md={3} style={{
                    background: 'linear-gradient(34deg, rgba(150,201,142,1) 0%, rgba(87,185,200,1) 35%, rgba(88,187,200,1) 67%, rgba(120,224,188,1) 100%)', borderRight: '6px solid rgba(31, 40, 54, .2)'
                }}>
                    <Row md={3} className='my-5 mx-2 text-center'>
                        <Image src='images/TrioBudget Logo Alone.png' fluid className="rounded mx-auto d-block" />
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
                    <Row className="my-5 mx-2" style={{ textAlign: 'right' }}>
                        <p>Need help?</p>
                    </Row>
                    <Row style={{ marginTop: '100%', alignContent: 'flex-end', textAlign: 'right' }}>
                        <p>Privacy Policy<br />Terms of Service<br />Cookie Policy</p>
                    </Row>
                </Col>
                <Col>
                    <Image src='images/TrioBudget Logo.png' className="mx-auto d-block" style={{ marginTop: '10%' }} />
                    <video className='videoTag' autoPlay loop muted style={{}}>
                        <source src={clouds} type='video/mp4' />
                    </video>
                </Col>
            </Row>

        </Container >
    )

}
