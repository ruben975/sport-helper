import * as React from 'react';

import {MdAddBox} from 'react-icons/md';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import NewMatchForm from '../NewMatchForm/NewMatchForm';
import Card from '../UI/Card/Card';
import { Link , useNavigate } from 'react-router-dom';
import axios from "axios";
import MatchCard from '../MatchCard/MatchCard';
import styled from './Home.module.css'


const Home = () => {

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

  const [newMatch, setNewMatch] = useState(false);
  let navigate = useNavigate();
const addMatch = () => {
  setNewMatch(true);
  navigate("/");
}

const addedMatch = () => {
  navigate("/")
}

const setNoNewMatch = () => {
  setNewMatch(false);
}
 return (
   <div className='app' style={{paddingTop : '5rem', justifyContent : 'center', display:"flex"}}>
    <Card className={styled.bigCard}>
      <div style={{ display: 'flex', justifyContent : 'center'}}>
   <Link to="/addGame" ><MdAddBox size = '3rem' color='rgba(255,130,19)' onClick={addMatch}
    style={{cursor: 'pointer'}} onConfirm={addedMatch}></MdAddBox></Link> 
        </div>
    <div className={styled.cardContent}>
      <div> 
    </div>
    {databaseMatches.map((match) => (
      <li key={match.id}>
        <MatchCard title={match.sport_name} admin={match.admin} 
        players={match.players} maxPlayers={match.max_players} description={match.description} 
        location={match.location} date={match.date}/>
      </li>
    )
    )}
    </div>
    
    </Card>
    
    {newMatch && <NewMatchForm onConfirm={setNoNewMatch}></NewMatchForm> }
   </div>
 );
};

export default Home;
