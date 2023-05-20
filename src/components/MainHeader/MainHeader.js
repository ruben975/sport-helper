import React, { useState, useEffect, useContext } from "react";
import styles from "./MainHeader.module.css";
import { CSSTransition } from "react-transition-group";
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/auth-context';
import Button from "../UI/Button/Button";
import { MdArrowDropDownCircle } from 'react-icons/md'

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const ctx = useContext(AuthContext);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className={styles.Header}>
      <Link to='/'> <img src={logo}  width="200" alt='logo' /></Link>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames={styles.NavAnimation}
        unmountOnExit
      >
        <nav className={styles.Nav}>
        {ctx.isLoggedIn && (
          <a href=" ">
           <Link onClick={toggleNav} to='/trainer'>Trainers</Link> 
          </a>
        )}
        {ctx.isLoggedIn && (
          <a onClick={toggleNav} href=" ">
            <Link  to='/teamMembers'>Team Mates</Link> 
          </a>
        )}
            {ctx.isLoggedIn && (
          <a onClick={toggleNav} href=" ">
          <Link to={`/editUser/${localStorage.getItem('id')}`}>Edit user
          </Link> 
          </a>
        )}
           {ctx.isLoggedIn && (
           <Link to='/'> <Button onClick={ctx.onLogout} className={styles.button}>Logout</Button></Link>
        )}
        </nav>
      </CSSTransition>
      {ctx.isLoggedIn && (
      <button onClick={toggleNav} className={styles.DropDown}>
        <MdArrowDropDownCircle size={40} style={{padding : 0}}/>
      </button> )}
    </header>
  );
}