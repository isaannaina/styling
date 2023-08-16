import React, { useState, useEffect } from 'react';
import './EmailList.css'; 
import MessageDetail from './EmailMessage';

const EmailList = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    
    fetch('https://expense-tracker-4e143-default-rtdb.firebaseio.com/send-email.json')
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data); 
        const messagesWithUnread = Object.values(data).map(message => ({
          ...message,
          unread: true, 
        }));
        console.log('should be true', messagesWithUnread);

        setMessages(messagesWithUnread);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const handleOpenMessage = (message) => {
    if (message.unread) {
      localStorage.setItem(`message-${message.id}`, JSON.stringify({ ...message, unread: false }));
    }
    setSelectedMessage(message);
  };

  const handleDeleteMessage = (event,message) => {
    event.stopPropagation(); 

    fetch(`https://expense-tracker-4e143-default-rtdb.firebaseio.com/send-email.json`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedMessages = messages.filter(msg => msg.id !== message.id);
          setMessages(updatedMessages);
          setSelectedMessage(null);
        } else {
          console.error('Failed to delete message.');
        }
      })
      .catch(error => {
        console.error('Error deleting message:', error);
      });
  };

  if (!Array.isArray(messages)) {
    return <div>Error: Unable to fetch messages</div>;
  }

  return (
    <div className="email-list-container">
      <h2>Inbox</h2>
      {selectedMessage ? (
        <MessageDetail message={selectedMessage} />
      ) : (
        <ul>
          {messages.map((message, index) => (
            <li
              key={index} 
              className={`email-list-item ${message.unread ? 'unread' : ''}`}
              onClick={() => handleOpenMessage(message)}
            >
              {message.unread && <div className="unread-dot"></div>}
              <div className="email-sender">{message.to}</div>
              <div className="email-subject">{message.subject}</div>
              <button onClick={(event) => handleDeleteMessage(event,message)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailList;
