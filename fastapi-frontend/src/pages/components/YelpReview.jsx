import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const YelpReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Yelp API endpoint (replace 'YOUR_API_KEY' with your actual Yelp API key)
    const API_KEY = '6h_ptuK8Q24aVG0s092QIJ-P_rHSAhVfy8hhgkkufUMtBwYDe7XF6fn215Y0aElAAc0RD9he9IEcVZdUpDANZJhVuyAKCf64isc_okB089KJ9Xr9RaGmpb49FDBuZXYx';
    const BUSINESS_ID = 'ckHiq0YL0A_3T8guXsEdxw'; // Replace with your business ID

    const fetchYelpReviews = async () => {
      try {
        const response = await fetch(`https://api.yelp.com/v3/businesses/${BUSINESS_ID}/reviews`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchYelpReviews();
  }, []);

  return (
    <Container>
      <h1>Yelp Reviews</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {reviews.map((review, index) => (
          <Col key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{review.user.name}</Card.Title>
                <Card.Text>{review.text}</Card.Text>
                {/* Add more review details here */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default YelpReviews;
