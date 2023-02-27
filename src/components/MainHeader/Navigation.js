import React, { useContext, useState } from 'react';

import AuthContext from '../../Context/auth-context';
import classes from './Navigation.module.css';
import { Link} from 'react-router-dom';
import { MdManageAccounts } from "react-icons/md";
<script src="https://kit.fontawesome.com/9083700324.js" crossorigin="anonymous"></script>
const Navigation = () => {
  const ctx = useContext(AuthContext);
 
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
           <Link to='/trainer'>Trainers</Link> 
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <Link to='/teamMembers'>Team Mates</Link> 
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
          {/* <Link to='/'> <button onClick={ctx.onLogout}></button> </Link> */}
       
          <Link to={`/editUser/${localStorage.getItem('id')}`}><MdManageAccounts size={40} className={classes.icons__text}/>
         
          </Link> 
          
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
