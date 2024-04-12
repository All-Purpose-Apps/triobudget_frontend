import { Routes, Route, } from 'react-router-dom';
import { Container, Row, Col, } from 'react-bootstrap';
// Page & Component imports
import Transactions from '../components/TransactionsComponents/Transactions';
import TopNavBar from '../components/TransactionsComponents/TopNavBar';
import SideBar from '../components/SideBar';
import Settings from '../components/Settings';

function App({ handleSignOut, mongoUser, firebaseUser }) {
  return (
    <Container fluid style={{ background: 'linear-gradient(21deg, rgba(31,40,54,1) 0%, rgba(80,125,195,1) 50%, rgba(57,70,89,1) 100%)' }}>
      <Row>
        <Col className="p-0">
          <TopNavBar handleSignOut={handleSignOut} />
        </Col>
      </Row>
      <Row>
        <Col md={2} className="mt-2">
          <SideBar />
        </Col>
        <Col className="p-0">
          <Routes>
            <Route path="/" element={<Transactions />} />
            <Route path="/settings" element={<Settings firebaseUser={firebaseUser} mongoUser={mongoUser} />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
