

import React from 'react';
import { Navbar, Container, Form, FormControl } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai'; 
import './Header.css'; 

const EmailHeader = ({ onSearch }) => {
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="email">
      <Container>
        <div className="container"> 
          <Navbar.Brand>Email Box</Navbar.Brand>
          <Form inline className="d-flex align-items-center">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={handleSearch}
            />
            <AiOutlineSearch size={40} style={{ cursor: 'pointer' }} onClick={() => {}} /> 
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default EmailHeader;
