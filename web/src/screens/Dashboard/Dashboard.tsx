import React from 'react';
// Bootstrap
import {Col, Container, Row} from 'react-bootstrap';

// Components
import Sidebar from '../../components/Sidebar';

/**
 *
 * @return {React.FC} Dashboard Screen
 */
const Dashboard: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper">
          this is a test
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
