import * as React from 'react';

import {MdAddBox} from 'react-icons/md';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import NewMatchForm from '../NewMatchForm/NewMatchForm';
import { Link , useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import MatchCard from '../MatchCard/MatchCard';
import StackGrid from "react-stack-grid";
import style from "./Home.module.css";


const Home = () => {

  const {id} = useParams();

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

  const deleteGame = async (id) => {
    await axios.delete(`http://localhost:8081/deleteGame/${id}`);
    loadedMatches();
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

async function getGameById(id) {
  const result = await axios.get(`http://localhost:8081/game/${id}`);
  
  return result.data;
}

const acceptInvitation = async (id) =>{
  const gameData = await getGameById(id);
const newInvitedList = await gameData.invited_players.replace(new RegExp(localStorage.getItem('user_name') + ',\\s*', 'g'), "");
  const game = {
    admin: await gameData.admin,
    description: await gameData.description,
    location: await gameData.location,
    players: await gameData.players+','+ localStorage.getItem('user_name'),
    max_players: await gameData.max_players,
    sport_name: await gameData.sport_name,
    date: await gameData.date,
    invited_players: newInvitedList
  }
  await axios.put(`http://localhost:8081/updateGame/${id}`, game);
  loadedMatches();
}

const rejectInvitation = async (id) =>{
  const gameData = await getGameById(id);

  console.log(gameData);
const newInvitedList = await gameData.invited_players.replace(new RegExp(localStorage.getItem('user_name') + ',\\s*', 'g'), "");
  const game = {
    admin: await gameData.admin,
    description: await gameData.description,
    location: await gameData.location,
    players: await gameData.players,
    max_players: await gameData.max_players,
    sport_name: await gameData.sport_name,
    date: await gameData.date,
    invited_players: newInvitedList
  }
  await axios.put(`http://localhost:8081/updateGame/${id}`, game);
  loadedMatches();
}

 return (
   <div className='app' style={{paddingTop : '4rem'}}>
   <div className={style.container}>
      <div style={{ display: 'flex', justifyContent : 'center'}}>
   <Link to="/addGame" ><MdAddBox size = '3rem' color='green' onClick={addMatch}
    style={{cursor: 'pointer'}} onConfirm={addedMatch}></MdAddBox></Link> 
        </div>
   
   <StackGrid columnWidth={340} gutterWidth={10} >
    {databaseMatches.map((match) => (
      <div  key={match.id}>
        <MatchCard title={match.sport_name} admin={match.admin} 
        players={match.players} maxPlayers={match.max_players} description={match.description} 
        location={match.location} date={match.date} deleteGame={() => deleteGame(match.id)} 
        invited={match.invited_players} acceptInvitation={() => acceptInvitation(match.id)}
        rejectInvitation={() => rejectInvitation(match.id)} />
        
      </div>
    )
    )}
    </StackGrid>
    </div>
    
    {newMatch && <NewMatchForm onConfirm={setNoNewMatch}></NewMatchForm> }
   </div>
 );
};

export default Home;
