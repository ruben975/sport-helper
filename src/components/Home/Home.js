import * as React from 'react';

import { MdAddBox } from 'react-icons/md';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import NewMatchForm from '../NewMatchForm/NewMatchForm';
import EditMatch from '../EditMatch/EditMatch';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import MatchCard from '../MatchCard/MatchCard';
import StackGrid from "react-stack-grid";
import style from "./Home.module.css";
import ErrorModal from '../ErrorModal/ErrorModal';


const Home = () => {

  const { id } = useParams();

  const [databaseMatches, setDatabaseMatches] = useState([]);
  useEffect(() => {
    loadedMatches();
  }, [])

  const [ editMatch, setEditMatch] = useState (false);

  const [available, setAvaible] = useState(true);

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

  const [participants, setParticipants] = new useState({ validation: false, content: '' });
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

  const acceptInvitation = async (id) => {
    const gameData = await getGameById(id);
    const newInvitedList = await gameData.invited_players.replace(new RegExp(localStorage.getItem('user_name') + ',\\s*', 'g'), "");
    let game = {
      ...gameData,
      players: await gameData.players + ',' + localStorage.getItem('user_name'),
      invited_players: newInvitedList
    }
    if (gameData.players.split(",").length <= gameData.max_players - 1) {
      if (gameData.players.split(",").length === gameData.max_players - 1)
        game = { ...game, invited_players: '' }
      await axios.put(`http://localhost:8081/updateGame/${id}`, game);
      loadedMatches();
    }
    else {
      noPlacesError();
      const deletedInvitation = {
        ...gameData,
        invited_players: newInvitedList
      }
      await axios.put(`http://localhost:8081/updateGame/${id}`, deletedInvitation);
      loadedMatches();
    }
  }

  const rejectInvitation = async (id) => {
    const gameData = await getGameById(id);

    const newInvitedList = await gameData.invited_players.replace(new RegExp(localStorage.getItem('user_name') + ',\\s*', 'g'), "");
    const game = {
      ...gameData,
      invited_players: newInvitedList
    }
    await axios.put(`http://localhost:8081/updateGame/${id}`, game);
    loadedMatches();
  }


  const displayParticipants = async (id) => {
    const gameData = await getGameById(id);
    const participantsList = gameData.players.split(",").map((participant) => {
      return <div><img src={require("../../usersPhotoGallery/" + participant + ".jpg")} className={style.image} alt="" /><p>{participant}</p></div>;
    });
    setParticipants({
      validation: true,
      content: participantsList
    });
  }

  const noDisplayPatricipants = () => {
    setParticipants({
      validation: false,
      content: ''
    })
  }
  const noPlacesError = () => {
    setAvaible(!available);
  }

  return (
    <div className='app' style={{ paddingTop: '4rem' }}>
      <div className={style.container}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to={`/addGame`}><MdAddBox size='3rem' color='green' onClick={addMatch}
            style={{ cursor: 'pointer' }} onConfirm={addedMatch}></MdAddBox></Link>
        </div>


        {!available && <ErrorModal error="Locurile s-au ocupat"
          content="Nu mai sunt locuri libere, data viitoare să fii mai rapid(ă)"
          onConfirm={noPlacesError} />}
        {participants.validation && <ErrorModal error={"Participanții"}
          content={participants.content} onConfirm={noDisplayPatricipants} className={style.error}></ErrorModal>}

        <StackGrid columnWidth={340} gutterWidth={10} >
          {databaseMatches.map((match) => (
            

              <div key={match.id}>
                <MatchCard title={match.sport_name} admin={match.admin} matchId={match.id}
                  players={match.players} maxPlayers={match.max_players} description={match.description}
                  location={match.location} date={match.date} deleteGame={() => deleteGame(match.id)}
                  invited={match.invited_players} acceptInvitation={() => acceptInvitation(match.id)}
                  rejectInvitation={() => rejectInvitation(match.id)} participants={() => displayParticipants(match.id)} />
              </div>
             
         
          )
          )}
        </StackGrid>
      </div>

      {newMatch && <NewMatchForm onConfirm={setNoNewMatch}></NewMatchForm>}
      {editMatch &&  <EditMatch /> }
     
    </div>
  );
};

export default Home;
