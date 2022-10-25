import {CSSProperties} from 'react';
import {Col, Container, Row} from 'react-bootstrap';

/**
 *
 * @returns {React.FC}
 */
const Auth: React.FC = () => {
  return (
    <Container>
      <Row align="middle" style={styles.mainRow}>
        <Col span={12}>
          <Row>
            <Col lg={12}>Log in to your account</Col>
            <Col span={12}>To access all your projects and previous work</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;

const styles = {
  errorMessage: {
    marginTop: '90vh',
    fontSize: '20px',
  } as CSSProperties,

  card: {
    borderRadius: '20px',
    width: '400px',
    transform: 'scale(1.5,1.5)',
  } as CSSProperties,

  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  mainRow: {
    minWidth: '100vw',
  } as CSSProperties,
};
