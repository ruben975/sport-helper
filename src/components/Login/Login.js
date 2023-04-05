import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from '../../Context/auth-context';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';
import NewUserForm from '../NewUserForm/NewUserForm';
import axios from "axios";
import { Link } from 'react-router-dom';
import ErrorModal from '../ErrorModal/ErrorModal';


const Login = () => {
  const [users, setUsers] = useState([]);
  const [emailState, setEmail] = new useState('nagy.ruben97@gmail.com');
  const [passwordState, setPassword] = new useState('1-stPassword');
  const [addNewUserValidation, setAddNewUser] = new useState(false);
  const [inputValidation, setInputValidation] = new useState({ validation: true, error: '', content: '' });

  useEffect(() => {
    loadedUsers();
  }, [])

  const loadedUsers = async () => {

    const result = await axios({
      method: 'get',
      url: `http://localhost:8081/users`,
    });

    setUsers(result.data);
  }

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let emailIsValid = false;
    let passwordIsValid = false;
    users.forEach(user => {

      if (user.email === emailState) {
        emailIsValid = true;
        if (user.password === passwordState) {
          passwordIsValid = true;
          authCtx.onLogin(user.user_name, user.id);
        }
      }
    });
    if (!emailIsValid) {
      setEmail(''); setPassword('');
      setInputValidation({
        validation: false, error: 'E-mail greșit!',
        content: 'Nu am găsit user cu e-mail ' + emailState
      })
    }
    if (emailIsValid) {
      if (!passwordIsValid) {
        setInputValidation({
          validation: false, error: 'Parolă greșită',
          content: 'Încercați din nou parola'
        })
        setPassword('');
      }
      else setInputValidation({ validation: true })
    }

  };


  const addNewUser = () => {
    setAddNewUser(true);
  }

  const sendNewUserRequest = () => {
    setAddNewUser(false); setInputValidation({ validation: true });
  }
  return (
    <div className={classes.first__div}>
      {addNewUserValidation && <NewUserForm title='Înregistrare' onConfirm={sendNewUserRequest} />}
      {!inputValidation.validation && <ErrorModal error={inputValidation.error} content={inputValidation.content} onConfirm={sendNewUserRequest} />}
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <Input
            id="email"
            label="E-Mail"
            type="email"
            value={emailState}
            onChange={emailChangeHandler}

          />

          <Input
            id="password"
            label="Parolă"
            type="password"
            value={passwordState}
            onChange={passwordChangeHandler}

          />
          <div className={classes.actions}>
            <div>
              <Button className={classes.btn} type="submit" >
                Autentificare
              </Button>
              <p style={{ color: 'white', textAlign: 'center', paddingTop:'1em' }} >Pentru înregistrare dați click <Link to='/addUser' style={{ color: 'rgb(255, 130, 0)', cursor: 'pointer' }} onClick={addNewUser}>aici</Link> </p>
            </div>
          </div>
        </form>
      </Card>

    </div>
  );
};

export default Login;
