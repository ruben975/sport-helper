import React, { useState, useContext, useEffect } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./EditMatch.module.css";
import Input from '../UI/Input/Input';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Select from 'react-select';
import UsersContext from '../../Context/users-context';
import axios from "axios";

const EditMatch = (props) => {
  const [match, setMatch] = useState({
    admin: '',
    description: '',
    location: '',
    sport_name: '',
    date: '',
    players: localStorage.getItem('user_name'),
    max_players: '',
    invited_players: null
  });
  const usersCtx = useContext(UsersContext);
  const [options, setOptions] = useState([]);
  const [invitedPlayers,setInvitedPlayers] = useState('semmi');
  const [selectedOption, setSelectedOption] = useState(null);
  const users = usersCtx.users;
  const path = useLocation().pathname;
  const [gameData,setGameData] = useState({invited_players : ''});
  useEffect(() => {
    const getGameById = async () => {
        const result = await axios.get(`http://localhost:8081/game/${path.split('/').pop()}`);
        setGameData(result.data) ;
      
    };
    getGameById();
  }, [invitedPlayers]);
  useEffect(() => {
    const formatOptions = (users) => {
      if(gameData !== undefined) console.log(gameData.invited_players)
     
    return users.filter(user => user.user_name !== localStorage.getItem('user_name') &&
    !gameData.invited_players.includes(user.user_name)).map((user) => {
        return {
          value: user.user_name,
          label: user.user_name,
        };
      });
      
    };
    setOptions(formatOptions(users));
  }, [invitedPlayers]);

  let navigate = useNavigate();
 

 
  useEffect (() => {
    setMatch({ ...gameData})
    setInvitedPlayers(gameData.invited_players);
  }, [gameData]);

  const inputHandler = (event) => {
    setMatch({ ...match, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

      await axios.put(`http://localhost:8081${path}`, match);
      navigate("/");
   
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const invitedPlayers = selectedOption ? selectedOption.map(item => item.value).join(',') : '';
    setMatch(prevMatch => ({
      ...prevMatch,
      invited_players: prevMatch.invited_players+ invitedPlayers + ',',
    }));
  };
 
  return (
    <div>
      
       <Link to='/'>
        <div className={styles.backdrop}/></Link>
        <form onSubmit={onSubmit} >
        <Card className={styles.modal} >
            <header className={styles.header}>
              <h2>Adăugare eveniment</h2>
            </header>
            <div className={styles.content}>
                <Input type='text' placeholder='Locația' label='Locația' name='location' value={match.location || ''} onChange={inputHandler} />
                <Input type='text' placeholder='02/15/2023 20:00' label='Data și ora' name='date' value={match.date || ''} onChange={inputHandler} />
                <label htmlFor="my-select" style={{color:'white', fontWeight: 'bold' }}>Participanți</label>
                <Select options={options} isMulti onChange={handleSelectChange}
                  value={selectedOption || ''}  placeholder="Alege pentru cine trimiți invitație"   maxMenuHeight={100} />
                <Input type='text' placeholder='Descriere' label='Descriere' name='description' value={match.description || ''} onChange={inputHandler} />
                <Input type='number' placeholder='Număr maxim participanți' label='Număr maxim de participanți' name='max_players' 
                value={match.max_players || ''} onChange={inputHandler} />
             </div>
            <footer className={styles.actions}>
              <Button type='submit' /*onClick={onConfirm}*/>Send</Button>
            </footer>
          </Card>
      </form>
    </div>
  );
};

export default EditMatch;