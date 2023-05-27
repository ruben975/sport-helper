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
  const [deleteOptions, setDeleteOptions] = useState([]);
  const [invitedPlayers,setInvitedPlayers] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [deleteSelectedOption, setDeleteSelectedOption] = useState(null);
  const users = usersCtx.users;
  const path = useLocation().pathname;
  const [gameData,setGameData] = useState({invited_players : '', players : ''});
  useEffect(() => {
    const getGameById = async () => {
        const result = await axios.get(`http://localhost:8081/game/${path.split('/').pop()}`);
        setGameData(result.data) ;
      
    };
    getGameById();
  }, [invitedPlayers]);
  useEffect(() => {
    const formatOptions = (users) => {
      
    return users.filter(user => user.user_name !== localStorage.getItem('user_name') &&
    !gameData.invited_players.includes(user.user_name) && 
    !gameData.players.includes(user.user_name) ).map((user) => {
        return {
          value: user.user_name,
          label: user.user_name,
        };
      });
      
    };
    const formatDeleteOptions = (users) => {
      return users.filter(user => gameData.invited_players.includes(user.user_name))
      .map((user) => {
        return {
          value: user.user_name,
          label: user.user_name,
        };
      })
      ;
    }
    setDeleteOptions(formatDeleteOptions(users));
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
    const invitedPlayers = selectedOption ? selectedOption.map(item => item.value).join(',') : gameData.invited_players;
    setMatch(prevMatch => ({
      ...prevMatch,
      invited_players: prevMatch.invited_players+ invitedPlayers + ',',
    }));
  };
  const deleteInvitationHandler = (deleteSelectedOption) => {
    setDeleteSelectedOption(deleteSelectedOption);
    const deletePlayers = deleteSelectedOption ? deleteSelectedOption.map(item => item.value).join(',') : gameData.invited_players;
    const playersToDelete = deletePlayers.split(',');
  
    const newInvitedList = gameData.invited_players
      .split(',')
      .filter(player => !playersToDelete.includes(player))
      .join(',');
  
    setMatch(prevMatch => ({
      ...prevMatch,
      invited_players: newInvitedList
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
                <Select style={{padding: '50px'}} options={options} isMulti onChange={handleSelectChange}
                  value={selectedOption || ''}  placeholder="Alege pentru cine trimiți invitație"   maxMenuHeight={100} />
                <label htmlFor="my-select" style={{color:'white', fontWeight: 'bold', marginTop: '10px' }}>Șterge invitații</label>
                <Select options={deleteOptions}  isMulti onChange={deleteInvitationHandler}
                value={deleteSelectedOption || ''}  placeholder="Cine este persoana pe care nu vrei să o inviți?"   maxMenuHeight={100} />
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