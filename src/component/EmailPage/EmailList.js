import React, { useState, useEffect } from 'react';
import './EmailList.css'; // Import the CSS file for styling
import MessageDetail from './EmailMessage';

const EmailList = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
  
    // Make the GET request to the API endpoint to fetch messages
    fetch('https://expense-tracker-4e143-default-rtdb.firebaseio.com/send-email.json')
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data); // For debugging purposes
        // Add 'unread' property to each message if it doesn't exist
        const messagesWithUnread = Object.values(data).map(message => ({
          ...message,
          unread: !getStoredMessages().some(m => m.id === message.id),
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
      // Only update the message if it's marked as unread

      const updatedMessages = messages.map((msg) =>
        msg.id === message.id ? { ...msg, unread: false } : msg
      );
      // Save the updated messages to Firebase
      fetch('https://expense-tracker-4e143-default-rtdb.firebaseio.com/send-email.json', {
        method: 'PUT',
        body: JSON.stringify(updatedMessages),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('A-9PI response after updating messages:', data); // For debugging purposes
          setMessages(updatedMessages);
        })
        .catch((error) => {
          console.error('Error updating messages:', error);
        });
        localStorage.setItem(`message-${message.id}`, JSON.stringify({ ...message, unread: false }));

    }

    setSelectedMessage(message);
  };


  const handleDeleteMessage = (event, message) => {
    event.stopPropagation();
  
    // Make the DELETE request to the backend API to delete the message
    fetch(`https://expense-tracker-4e143-default-rtdb.firebaseio.com/send-email/${message.id}.json`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        // If the DELETE request is successful, remove the message from the state
        const updatedMessages = messages.filter(msg => msg.id !== message.id);
        setMessages(updatedMessages);
        setSelectedMessage(null);
  
        localStorage.removeItem(`message-${message.id}`); // Remove from local storage
  
        // Update the messages in Firebase without the deleted message
        fetch('https://expense-tracker-4e143-default-rtdb.firebaseio.com/send-email.json', {
          method: 'PUT',
          body: JSON.stringify(updatedMessages),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Updated messages in Firebase:', data);
        })
        .catch(error => {
          console.error('Error updating messages in Firebase:', error);
        });
      } else {
        console.error('Failed to delete message.');
      }
    }) 
    .catch(error => {
      console.error('Error deleting message:', error);
    });
  };
  
  // Add a check to ensure messages is an array
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
          {messages.slice().reverse().map((message, index)=> (
            <li
              key={index} // Use the 'id' property as the unique key
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
