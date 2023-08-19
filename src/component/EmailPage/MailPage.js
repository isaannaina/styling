import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EmailHeader from './Header';
import Sidebar from './Sidebar';
import EmailList from './EmailList';
import ComposeEmail from '../ComposeEmail';

const MailPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleComposeClick = () => {
    setIsComposing(true);
  };

  const handleInboxClick = () => {
    setIsComposing(false);
  };

  useEffect(() => {
    const getStoredMessages = () => {
      const storedMessages = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('message-')) {
          const message = JSON.parse(localStorage.getItem(key));
          storedMessages.push(message);
        }
      }
      return storedMessages;
    };

    // Fetch messages from API or elsewhere and set them to state
    fetch('https://expense-tracker-4e143-default-rtdb.firebaseio.com/send-email.json')
      .then(response => response.json())
      .then(data => {
        const messagesWithUnread = Object.values(data).map(message => ({
          ...message,
          unread: !getStoredMessages().some(m => m.id === message.id),
        }));

        setMessages(messagesWithUnread);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });

  }, []);

  useEffect(() => {
    // Calculate the unread count
    const countUnread = () => {
      return messages.reduce((count, message) => {
        return message.unread ? count + 1 : count;
      }, 0);
    };

    const unread = countUnread();
    setUnreadCount(unread);
  }, [messages]);

  return (
    <div>
      <EmailHeader onSearch={handleSearch} />

      <Container fluid className="mt-4">
        <Row>
          <Sidebar
            onComposeClick={handleComposeClick}
            onInboxClick={handleInboxClick}
            unreadCount={unreadCount}
          />
          <Col md={10}>
            {isComposing ? (
              <ComposeEmail />
            ) : (
              <React.Fragment>
                <h2>Welcome to Your Mailbox!</h2>
                <EmailList messages={messages} setMessages={setMessages} />
                {/* For example: */}
                <p>Search query: {searchQuery}</p>
              </React.Fragment>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MailPage;
