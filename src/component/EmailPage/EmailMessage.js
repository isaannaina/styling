import './EmailList'

import React from 'react';

const MessageDetail = ({ message }) => {
  return (
    <div className="message-detail-container">
      <h3>{message.to}</h3>
      <p>{message.subject}</p>
    </div>
  );
};

export default MessageDetail;
