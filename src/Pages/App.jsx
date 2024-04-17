import { Routes, Route, } from 'react-router-dom';
import { Container, Row, Col, } from 'react-bootstrap';
import EntryPoint from './EntryPoint';

function App({ handleSignOut, mongoUser, firebaseUser }) {
  return (
    <Container fluid style={{ background: 'linear-gradient(21deg, rgba(31,40,54,1) 0%, rgba(80,125,195,1) 50%, rgba(57,70,89,1) 100%)' }}>
      <Row>
        <Col className="p-0">
          <Routes>
            <Route path="/" element={<EntryPoint />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
