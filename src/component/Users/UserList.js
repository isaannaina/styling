import React from "react";
import Card from "../UI/Card";
import styles from './UserList.module.css';

const UserList = (props) => {
  const deleteHandler = (id) => {
    props.onDelete(id);
  };

  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id} onClick={() => deleteHandler(user.id)}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UserList;