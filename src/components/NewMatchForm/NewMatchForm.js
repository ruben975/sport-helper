import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./NewMatchForm.module.css";
import Input from '../UI/Input/Input';
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const NewMatchForm = (props) => {

   let navigate = useNavigate();

  const [match, setMatch] = useState({
    admin: '',
    description: '',
    location: '',
    sport_name: '',
    date: '',
    players: '',
    max_palyers: '',
  });

  const inputHandler = (event) => {
    setMatch({ ...match, [event.target.name]: event.target.value });
  }

  const [databaseMatches, setDatabaseMatches] = useState([]);
  useEffect(() => {
    loadedMatches();
  }, [])

  const loadedMatches = async () => {

    const result = await axios({
      method: 'get',
      url: `http://localhost:8081/games`,
    });

    setDatabaseMatches(result.data);
  }


  const onSubmit = async (event) => {
    event.preventDefault();
   
    //  await axios({
    //   method: 'post',
    //   url: 'http://localhost:8081/addGame',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: match
    // });

    await axios.post("http://localhost:8081/addGame",match)
    navigate("/");
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
                <Input type='text' placeholder='Sport' label='Sport' name='sport_name' value={match.sport_name} onChange={inputHandler} />
                <Input type='text' placeholder='Locația' label='Locația' name='location' value={match.location} onChange={inputHandler} />
                <Input type='text' placeholder='Data și ora' label='Data și ora' name='date' value={match.date} onChange={inputHandler} />
                <Input type='text' placeholder='Descriere' label='Descriere' name='description' value={match.description} onChange={inputHandler} />
                <Input type='number' placeholder='Număr maxim de jucători' label='Număr maxim de jucători' name='max_players' value={match.max_players} onChange={inputHandler} />
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