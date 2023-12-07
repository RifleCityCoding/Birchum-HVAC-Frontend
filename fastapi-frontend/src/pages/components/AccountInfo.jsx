import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useGlobalState } from '@/context/GlobalState';

const UserProfileForm = () => {
  const { state } = useGlobalState(); 
  const { user } = state;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        if (user) {
          const customerInfoResponse = await fetch(`http://127.0.0.1:8000/api/v1/${user.id}`);
          const customerInfo = await customerInfoResponse.json();

          setFormData({
            firstName: customerInfo.firstName || '',
            lastName: customerInfo.lastName || '',
            address: customerInfo.address || '',
            phoneNumber: customerInfo.phoneNumber || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCustomerInfo();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateCustomerInfoResponse = await fetch(`http://127.0.0.1:8000/api/v1/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
        }),
      });

      if (updateCustomerInfoResponse.ok) {
        console.log('Customer information updated successfully!');
        
      } else {
        console.error('Failed to update customer information.');
      }
    } catch (error) {
      console.error('Error updating customer information:', error);
    }
  };

  return (
    <div style={{ height: '4in', width: '3in', overflow: 'auto', backgroundColor: 'blue' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default UserProfileForm;