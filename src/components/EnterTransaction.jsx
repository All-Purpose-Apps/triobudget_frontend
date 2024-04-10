import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function EnterTransaction({ handleAddTransaction, user }) {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        transactionType: 'income', // Added transactionType to formData
        category: '',
        account: '',
        date: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let { description, amount, category, account, transactionType } = formData;
        if (!description || !amount || !category || !account) {
            alert("Please fill out all fields");
            return;
        }
        if (!user.categories.includes(category) && category !== '') {
            alert(`Category "${category}" does not exist. Please add it first.`);
            return;
        }
        // Adjust amount based on transaction type
        amount = transactionType === 'debt' ? Math.abs(amount) * -1 : Math.abs(amount);
        const transactionData = { description, amount, category, account, date: formData.date };
        handleAddTransaction(transactionData);
        setFormData({
            description: '',
            amount: '',
            transactionType: 'income', // Reset transactionType in formData
            category: '',
            account: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} className="d-flex flex-wrap p-2">
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Group controlId="description">
                            <Form.Label className="visually-hidden">Description</Form.Label>
                            <Form.Control
                                className="mb-2"
                                name="description"
                                type="text"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group controlId="amount">
                            <Form.Label className="visually-hidden">Amount</Form.Label>
                            <Form.Control
                                className="mb-2"
                                name="amount"
                                type="number"
                                placeholder="Enter amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group controlId="transactionType">
                            <Form.Label className="visually-hidden">Transaction Type</Form.Label>
                            <Form.Select
                                aria-label="Transaction Type"
                                className="mb-2"
                                name="transactionType"
                                value={formData.transactionType}
                                onChange={handleChange}
                            >
                                <option value="income">Income</option>
                                <option value="debt">Debt</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group controlId="category">
                            <Form.Label className="visually-hidden">Category</Form.Label>
                            <Form.Select
                                aria-label='Category'
                                className="mb-2"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value=''>Select Category</option>
                                {user.categories.map((key, index) => <option key={index} value={key}>{key}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group controlId="account">
                            <Form.Label className="visually-hidden">Account</Form.Label>
                            <Form.Select
                                aria-label='Account'
                                className="mb-2"
                                name="account"
                                value={formData.account}
                                onChange={handleChange}
                            >
                                <option value=''>Select Account</option>
                                {user.accounts.map((key, index) => <option key={index} value={key}>{key}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group controlId="date">
                            <Form.Label className="visually-hidden">Date</Form.Label>
                            <Form.Control
                                className="mb-2"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
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
}

export default EnterTransaction;
