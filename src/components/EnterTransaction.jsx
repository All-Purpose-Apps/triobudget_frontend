import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const EnterTransaction = ({ handleAddTransaction, user }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [account, setAccount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = { description, amount, category, date, account };
        if (!description || !amount || !category || !account) {
            alert("Please fill out all fields");
        } else if (!user.categories.includes(category) && category !== '') {
            alert(`Category "${category}" does not exist. Please add it first.`);
        } else {
            handleAddTransaction(newTransaction);
            setDescription('');
            setAmount('');
            setCategory('');
            setAccount('');
            setDate(new Date().toISOString().split('T')[0]);
        }
    };

    return (
        <div>
            <Form onSubmit={(e) => handleSubmit(e)} className="d-flex flex-wrap p-2">
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Group controlId="description">
                            <Form.Label className="visually-hidden">Description</Form.Label>
                            <Form.Control
                                className="mb-2"
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group controlId="amount">
                            <Form.Label className="visually-hidden">Amount</Form.Label>
                            <Form.Control
                                className="mb-2"
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group controlId="category">
                            <Form.Label className="visually-hidden">Category</Form.Label>
                            <Form.Select
                                aria-label='Category'
                                className="mb-2"
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value=''>Select Category</option>
                                {user.categories.map((key) => <option value={key}>{key}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group controlId="account">
                            <Form.Label className="visually-hidden">Account</Form.Label>
                            <Form.Control
                                className="mb-2"
                                type="text"
                                placeholder="Enter Account"
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group controlId="date">
                            <Form.Label className="visually-hidden">Date</Form.Label>
                            <Form.Control
                                className="mb-2"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>


                    <Col xs="auto">
                        <Button variant="primary" type="submit" className="mb-2">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default EnterTransaction;
