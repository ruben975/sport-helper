import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './Context/auth-context';
import User from './components/User/User';
import style from './App.module.css';
import login from './background.jpg';
import home from './home.jpg';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NewUserForm from './components/NewUserForm/NewUserForm';
import EditUser from './components/EditUser/EditUser';
import Trainer from './components/Trainer/Tranier';
import NewMatchForm from './components/NewMatchForm/NewMatchForm';

function App() {
  const ctx = useContext(AuthContext);

  return (
    
      <Router>
        
      <main style={{ backgroundImage: `url(${!ctx.isLoggedIn ? login : home })`}} className={`${style.main} `}>
     
      <MainHeader />
        <Routes> 
          <Route exapt path='/teamMembers' element = {<User />} /> 
          <Route exact path='/' element =  {!ctx.isLoggedIn ? <Login /> : <Home />} />   
          <Route exact path='/trainer' element = {<Trainer />} />
          <Route exact path="/addUser" element = {<NewUserForm />} />
          <Route exact path="/addGame" element = {<NewMatchForm />} />
          <Route exact path="/editUser/:id" element = {<EditUser />} />
          {/* <Route path='*' element={<Navigate to='/pageNotFound'  />}></Route> */}
        </Routes>
        </main>

        </Router>
      
     
  );
}


export default App;
