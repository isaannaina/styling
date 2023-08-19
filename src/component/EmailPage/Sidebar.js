// Sidebar.js

import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';

const Sidebar = ({ onComposeClick, onInboxClick, unreadCount }) => {
  return (
    <Col md={2}>
      <ListGroup>
        <ListGroup.Item className=' active btn btn-success' onClick={onComposeClick}>
          Compose
        </ListGroup.Item><br></br>
        <ListGroup.Item className='bg-light' onClick={onInboxClick}>
          Inbox ({unreadCount} Unread) {/* Display unread count */}
        </ListGroup.Item>
        <ListGroup.Item >Starred</ListGroup.Item>
        <ListGroup.Item >Drafts</ListGroup.Item>
        <ListGroup.Item className='bg-light' onClick={onInboxClick}>Sent</ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default Sidebar;
