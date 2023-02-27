import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersContext = React.createContext({
  users: [],
  actualUser: {}
});


export const UsersContextProvider = (props) => {

  let   [users, setUsers] = useState([]);

  useEffect(() => {
    loadedUsers();
  }, [])

  const loadedUsers = async () => {

    const result = await axios({
      method: 'get',
      url: `http://localhost:8081/users`,
    });

    setUsers(result.data);
  }



  return (
    <UsersContext.Provider
      value={{
        users: users,
      }} 
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
