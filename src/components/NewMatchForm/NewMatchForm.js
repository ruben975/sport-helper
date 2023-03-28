import React, {  useState, useContext,useEffect } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./NewMatchForm.module.css";
import Input from '../UI/Input/Input';
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import UsersContext from '../../Context/users-context';

import axios from "axios";

const NewMatchForm = (props) => {

  const sports = [  {value: 'Handbal', label: 'Handbal'},
  {value: 'Fotbal', label: 'Fotbal'},
  {value: 'Tenis', label: 'Tenis'},
  {value: 'Alergare', label: 'Alergare'},
  {value: 'Volei', label: 'Volei'},
  {value: 'Pingpong', label: 'Pingpong'}]
  const usersCtx = useContext(UsersContext);
  
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionSport, setSelectedOptionSport] = useState(null);
  const users = usersCtx.users;
 
  useEffect(() => {
    
    const formatOptions = (users) => {
      return users.filter(user => user.user_name !== localStorage.getItem('user_name')).map((user) => {
        return {
          value: user.user_name,
          label: user.user_name,
        };
      });
    };
    setOptions(formatOptions(users));
  }, [users])
   let navigate = useNavigate();
   const adminName = localStorage.getItem('user_name');

  const [match, setMatch] = useState({
    admin: adminName,
    description: '',
    location: '',
    sport_name: '',
    date: '',
    players: localStorage.getItem('user_name'),
    max_players: '',
    invited_players: null
  });

  const inputHandler = (event) => {
    setMatch({ ...match, [event.target.name]: event.target.value });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
   
    await axios.post("http://localhost:8081/addGame",match)
    navigate("/");
  }
 
 
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const invitedPlayers = selectedOption ? selectedOption.map(item => item.value).join(', ') : '';
    setMatch(prevMatch => ({
      ...prevMatch,
      invited_players: invitedPlayers,
    }));
  }
  const handleSelectChangeForSport = (selectedOptionSport) => {
    setSelectedOptionSport(selectedOptionSport);
    setMatch(prevMatch => ({
      ...prevMatch,
      sport_name: selectedOptionSport.value,
    }));
  }
 
  return (
    <div>
      
       <Link to='/'>
        <div className={styles.backdrop}/></Link>
        <form onSubmit={onSubmit} >
        <Card className={styles.modal} >
            <header className={styles.header}>
              <h2>Adăugare match</h2>
            </header>
            <div className={styles.content}>
            <label htmlFor="my-select" style={{color:'white', fontWeight: 'bold' }}>Sport</label>
                <Select options={sports} onChange={handleSelectChangeForSport} value={selectedOptionSport}
                    placeholder="Alege"   maxMenuHeight={100} />
                <Input type='text' placeholder='Locația' label='Locația' name='location' value={match.location} onChange={inputHandler} />
                <Input type='text' placeholder='02/15/2023 20:00' label='Data și ora' name='date' value={match.date} onChange={inputHandler} />
                <label htmlFor="my-select" style={{color:'white', fontWeight: 'bold' }}>Participanți</label>
                <Select options={options} isMulti onChange={handleSelectChange}
                  value={selectedOption}  placeholder="Alege pentru cine trimiți invitație"   maxMenuHeight={100} />
                <Input type='text' placeholder='Descriere' label='Descriere' name='description' value={match.description} onChange={inputHandler} />
                <Input type='number' placeholder='Număr maxim participanți' label='Număr maxim de participanți' name='max_players' value={match.max_players} onChange={inputHandler} />
             </div>
            <footer className={styles.actions}>
              <Button type='submit' onClick={props.onConfirm}>Send</Button>
            </footer>
          </Card>
      </form>
    </div>
  );
};

export default NewMatchForm;