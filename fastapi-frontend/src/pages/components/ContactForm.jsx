import React, { useState } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";

const ContactForm = () => {
  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormEmpty = Object.values(formData).some((value) => value === "");

    if (isFormEmpty) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await fetch("https://formspree.io/f/mleyqobb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setFormSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Contact Us</Card.Title>
        {formSubmitted ? (
          <div>
            <p>Thank you for submitting a contact request!</p>
            <p>We will be in contact in 12-24 hours.</p>
          </div>
        ) : (
          <Container className="d-flex justify-content-center align-items-center">
            <Form style={{ width: "80%" }} onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        )}
      </Card.Body>
    </Card>
  );
};

export default ContactForm;
