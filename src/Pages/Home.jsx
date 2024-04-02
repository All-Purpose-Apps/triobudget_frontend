import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
    return (
        <Container fluid className="text-center d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div>
                <h1>Welcome to TrioBudget</h1>
                <Row>
                    <Col>
                        <Link to="/login">
                            <Button variant="primary">Login</Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/signup">
                            <Button variant="success">Signup</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default Home;
