import React, { useState } from 'react';
import AddUser from './component/Users/AddUser';
import UserList from './component/Users/UserList';

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (name, age) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList, { name, age, id: Math.random().toString() }];
    });
  };

  const deleteUserHandler = (id) => {
    setUsersList((prevUsersList) => {
      return prevUsersList.filter((user) => user.id !== id);
    });
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UserList users={usersList} onDelete={deleteUserHandler} />
    </div>
  );
}

export default App;

