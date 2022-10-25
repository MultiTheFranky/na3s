import React from 'react';
// Bootstrap
import {Nav} from 'react-bootstrap';

/**
 *
 * @returns {React.FC} Sidenav Component
 */
const Sidebar: React.FC = () => {
  return (
    <Nav
      activeKey="/"
      onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>Link</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
