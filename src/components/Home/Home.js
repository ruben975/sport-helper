import * as React from 'react';

import {MdAddBox} from 'react-icons/md';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import NewMatchForm from '../NewMatchForm/NewMatchForm';
import Card from '../UI/Card/Card';
import Input from 'react-widgets/cjs/Input';
import { Link, Navigate, useNavigate } from 'react-router-dom';



const Home = () => {
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
    <Card  >
      <div style={{ justifyContent : 'center', display:"flex",}}>
   <Link to="/addGame" ><MdAddBox size = '3rem' color='rgba(255,130,19)' onClick={addMatch} style={{cursor: 'pointer'}} onConfirm={addedMatch}></MdAddBox></Link> 
        </div>
      <div> 
    </div>
    </Card>
    
    {newMatch && <NewMatchForm onConfirm={setNoNewMatch}></NewMatchForm> }
   </div>
 );
};

export default Home;
