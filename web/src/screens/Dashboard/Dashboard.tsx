import React from 'react';
// Bootstrap
import {Col, Container, Row} from 'react-bootstrap';

/**
 *
 * @return {React.FC} Dashboard Screen
 */
const Dashboard: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={10} id="page-content-wrapper">
          this is a test
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
