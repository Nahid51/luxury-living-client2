import React, { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import useAuth from '../../../Hooks/useAuth';

const AddService = () => {
    const [serviceData, setServiceData] = useState({});
    const [success, setSuccess] = useState(false);
    const { error, isLoading } = useAuth();

    const handleAddService = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newProductData = { ...serviceData };
        newProductData[field] = value;
        setServiceData(newProductData);
    }
    const handleButton = e => {
        e.preventDefault();
        fetch('http://localhost:5000/addServices', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(serviceData)
        })
            .then(res => res.json())
            .then(data => {
                setSuccess(true);
            })
    }
    return (
        <div className='mx-auto'>
            <div className='w-75 mx-auto'>
                <h4 className='mb-3'>Add Service</h4>
                {error && <Alert variant='danger'>{error}</Alert>}
                {isLoading ? <Spinner animation="border" variant="warning" /> :
                    <Form className='border p-5 rounded'>
                        {success && <Alert variant='success'>Service added successfully!</Alert>}
                        <div className='row'>
                            <Form.Group className="col-12 col-md-6 mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Service Title</Form.Label>
                                <Form.Control
                                    onBlur={handleAddService}
                                    name='name'
                                    type="text"
                                    placeholder="Enter Title"
                                />
                            </Form.Group>
                            <Form.Group className="col-12 col-md-6 mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    onBlur={handleAddService}
                                    name='price'
                                    type="number"
                                    placeholder="Enter Price"
                                />
                            </Form.Group>
                        </div>
                        <div className='row'>
                            <Form.Group className="col-12 col-md-6 mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    onBlur={handleAddService}
                                    name='description'
                                    as="textarea"
                                    placeholder='Enter Description'
                                    rows={3}
                                />
                            </Form.Group>
                            <Form.Group className="col-12 col-md-6 mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    onBlur={handleAddService}
                                    name='photo'
                                    type='link'
                                    placeholder='Image URL'
                                />
                            </Form.Group>
                        </div>
                        <Button onClick={handleButton} className='btn edit-btn'>Submit</Button>
                        <Button type='reset' className='btn edit-btn ms-1'>Reset</Button>
                    </Form>}
            </div>
        </div>
    );
};

export default AddService;