import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = React.createContext({
  actualUser: {},
  likePlayer: () => { },
  getActualUser: () => { }
});

export const UserContextProvider = (props) => {

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    main_sport: '',
    introduction: '',
    age: '',
    email: '',
    phone_number: '',
    password: '',
    location: '',
    liked_players: ''
  });

  useEffect(() => {
    actualUser();
  }, [])

  const actualUser = async () => {
    const result = await axios.get(`http://localhost:8081/user/${localStorage.getItem("id")}`);
    setUser(result.data);
  }

  const likePlayer = async (player) => {
    let newLikedPlayer = '';
    if(user.liked_players.includes(player)) newLikedPlayer = user.liked_players.replace(player+",","");
    else { newLikedPlayer = user.liked_players+ player +',';}
    const newUserData = {...user, liked_players: newLikedPlayer};
    setUser(newUserData);
    await axios.put(`http://localhost:8081/editUser/${localStorage.getItem("id")}`, newUserData);
  }

  return (
    <UserContext.Provider
      value={{
        actualUser: user,
        likePlayer: likePlayer,
        getActualUser: actualUser,
      }} 
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
