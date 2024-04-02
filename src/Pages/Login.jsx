import { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../utils/firebaseConfig';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';

const auth = getAuth(app)

const Login = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            // Handle login success
            console.log("Logged in successfully!");
            navigate("/test");
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage(error.message);
            setShowModal(true);
            // Handle login error
        }
    };
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div>
                <h1>Login Page</h1>
                <Form onSubmit={handleLogin}>
                    <FormGroup className="mb-3">
                        <FormControl
                            type="email"
                            placeholder="Email"
                            value={email}
                            autoComplete='username'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormControl
                            type="password"
                            placeholder="Password"
                            value={password}
                            autoComplete='current-password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <Button type="submit" className="float-end">Login</Button>
                </Form>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{errorMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Login;