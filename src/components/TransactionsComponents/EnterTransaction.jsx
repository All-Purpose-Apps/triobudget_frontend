import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { updateUser } from '@store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';

function EnterTransactionModal({ show, handleClose, handleAddTransaction, user }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        transactionType: 'Income',
        category: '',
        account: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.categories || !user.accounts) {
            setIsLoading(true);
            return;
        }

        setFormData(currentFormData => ({
            ...currentFormData,
            category: currentFormData.transactionType === 'Income' ? 'Income' : (user.categories.length > 0 ? user.categories[0] : ''),
            account: user.accounts.length > 0 ? user.accounts[0] : '',
        }));
        setIsLoading(false);
    }, [user, formData.transactionType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(currentFormData => ({
            ...currentFormData,
            [name]: value,
        }));
    };
    const handleCategoryChange = (newValue, actionMeta) => {
        if (actionMeta.action === 'select-option' || actionMeta.action === 'create-option') {
            setFormData(currentFormData => ({
                ...currentFormData,
                category: newValue.value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoading) {
            console.error("Waiting for user data to load.");
            return;
        }

        let { description, amount, category, account, transactionType } = formData;
        if (!description || !amount || !category || !account) {
            alert("Please fill out all fields");
            return;
        }
        if (category !== 'Income' && !user.categories.includes(category)) {
            alert(`Category "${category}" does not exist. Please add it first.`);
            return;
        }

        amount = transactionType === 'Debt' ? -Math.abs(amount) : Math.abs(amount);
        const transactionData = { description, amount, category, account, date: formData.date };
        handleAddTransaction(transactionData);
        handleClose();
        setFormData({
            description: '',
            amount: '',
            transactionType: 'Income',
            category: 'Income',
            account: user.accounts.length > 0 ? user.accounts[0] : '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    const [creatingCategory, setCreatingCategory] = useState(false);
    const handleCreate = (inputValue) => {
        const u = user
        const c = Array.isArray(u.categories) ? [...u.categories, inputValue] : [inputValue];
        setCreatingCategory(true);
        try {
            dispatch(updateUser({ id: u.uid, data: { categories: c } }))
            setFormData({ ...formData, category: inputValue });
            console.log('Category Created')
        } catch (error) {
            console.log(error)
        } finally {
            setCreatingCategory(false);
        }
    }
    const createOption = (label) => ({
        label,
        value: label,
    });
    const categoryOptions = formData.transactionType === 'Income' ? ['Income'] : (user.categories || []);
    const categoryOptionsWithCreate = categoryOptions.map(createOption);
    const accountOptions = user.accounts || [];

    if (isLoading) {
        return (
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Loading...</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    <Spinner animation="border" />
                </Modal.Body>
            </Modal>
        );
    }
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row style={{ justifyContent: 'center' }}>
                        <FormField label="Description" type="text" name="description" value={formData.description} onChange={handleChange} />
                        <FormField label="Amount" type="number" name="amount" value={formData.amount} onChange={handleChange} />
                        <SelectField label="Transaction Type" name="transactionType" options={['Income', 'Debt']} value={formData.transactionType} onChange={handleChange} />
                        <Form.Label>Category</Form.Label>
                        <CreatableSelect
                            isClearable
                            isDisabled={creatingCategory}
                            isLoading={creatingCategory}
                            onCreateOption={handleCreate}
                            onChange={handleCategoryChange}
                            options={categoryOptionsWithCreate}
                            className="mb-3"
                            value={categoryOptionsWithCreate.find(option => option.value === formData.category)}
                        />
                        <SelectField label="Account" name="account" options={accountOptions} value={formData.account} onChange={handleChange} />
                        <FormField label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


function FormField({ label, type, name, value, onChange }) {
    return (
        <Col xs={12}>
            <Form.Group className="mb-3" controlId={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type} placeholder={`Enter ${label.toLowerCase()}`} name={name} value={value} onChange={onChange} />
            </Form.Group>
        </Col>
    );
}

function SelectField({ label, name, options = [], value, onChange, disabled = false }) {
    return (
        <Col xs={12}>
            <Form.Group className="mb-3" controlId={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Select name={name} value={value} onChange={onChange} disabled={disabled}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Col>
    );
}


export default EnterTransactionModal;
