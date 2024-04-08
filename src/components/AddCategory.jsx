import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { updateUser } from '../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddCategory = () => {

    const dispatch = useDispatch();
    // Get the user information from Redux store
    const user = useSelector((state) => state.userSlice.user);
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const u = user
        const c = Array.isArray(u.category) ? [...u.category, category] : [category];
        console.log(u)
        dispatch(updateUser({ id: u.uid, data: { category: c } }));
        setCategory('');
    };
    return (
        <div>
            <Form onSubmit={(e) => handleSubmit(e)} className="d-flex flex-wrap p-2">
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Group controlId="category">
                            <Form.Label className="visually-hidden">Category</Form.Label>
                            <Form.Control
                                className="mb-2"
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" className="mb-2">
                            Add
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
export default AddCategory; 