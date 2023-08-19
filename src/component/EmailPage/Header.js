// EmailHeader.js

import React from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai'; // Import the search icon from react-icons
import { BsPower } from 'react-icons/bs'; // Import the power (logout) icon from react-icons
import './Header.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const EmailHeader = ({ onSearch }) => {
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform the logout action here
    navigate('/')
  };

  return (
    <div className="email">
      <Container>
        <div className="container d-flex justify-content-between align-items-center"> {/* Add the container class and justify-content-between */}
          <Navbar.Brand>Email Box</Navbar.Brand>
          <Form inline className="d-flex align-items-center">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={handleSearch}
            />
            <AiOutlineSearch size={40} style={{ cursor: 'pointer' }} onClick={() => {}} /> {/* Add the search icon here */}
          </Form>
          <Button variant="danger" onClick={handleLogout}>
            <BsPower /> {/* Power (logout) icon */}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default EmailHeader;
