import React, { useState, useEffect, useContext } from 'react';
import { Link ,useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../Context/auth-context';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import styles from './EditUser.module.css'
import axios from 'axios';
import 'react-dropdown/style.css';



const EditUser = () => {

    let navigate = useNavigate();

    const {id} = useParams();

    const [file, setFile] = useState()
    const [user, setUser] = useState({
      first_name: '',
      last_name: '',
      user_name: '',
      main_sport: '',
      introduction: '',
      age: '',
      email: '',
      phone_number: '',
      password: '',
      checkPassword: '',
  
    });
  
  
    const [validationInput, setInputValidation] = useState({
      content: 'CONTENT',
      isValid: true
    })
  
  
  
    const [databaseUsers, setDatabaseUsers] = useState([]);
    useEffect(() => {
      loadedUsers();
    }, [])
  
    const loadedUsers = async () => {
  
      const result = await axios({
        method: 'get',
        url: `http://localhost:8081/users/${id}`,
      });
  
      setUser(result.data);
    }
  
  
    const inputHandler = (event) => {
      setUser({ ...user, [event.target.name]: event.target.value });
  
    }
  
    const imageInputHandler = (event) => {
      // setUser({ ...user, [event.target.name]: event.target.value });
      setFile(event.target.files[0])
    }
  
    const onSubmit = async (event) => {
      event.preventDefault();
      let canSubmit = true;
      let errorContent = '';
      databaseUsers.forEach(databaseUser => {
        if (databaseUser.user_name === user.user_name) {
          canSubmit = false;
          errorContent = errorContent + 'Nume de utilizator ocupat \n '
        }
        if (user.checkPassword !== user.password) {
          errorContent = errorContent + 'Parolele nu se potrivesc '
          canSubmit = false;
        }
      });
      console.log(validationInput.content)
      setInputValidation({ content: errorContent, isValid: canSubmit })
      if (canSubmit === true) {
        await axios.put(`http://localhost:8081/editUser/${id}`, user);
        let formData = new FormData();
        formData.append('file', file);
        formData.append('user', JSON.stringify(user));
        // await axios({
        //   method: 'post',
        //   url: 'http://localhost:8081/addUser',
        //   data: formData,
        //   headers: {
        //     'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        //   },
        // });
        navigate("/");
      }
    }
  
    const onConfirm = () => {
      setInputValidation({ ...validationInput, isValid: true });
    }

    const ctx = useContext(AuthContext);

    return  <form onSubmit={onSubmit}> <div className={styles.padding}>
    <Card  className={styles.card}>
    <header className={styles.header}>
      <h2>Contul meu</h2>
    </header>
   
    <div className={styles.content}>
      <Input type='text' placeholder='Nume' label='Nume' name='first_name' value={user.first_name || ''} onChange={inputHandler} />
      <Input type='text' placeholder='Prenume' label='Prenume' name='last_name' value={user.last_name || ''} onChange={inputHandler} />
      <Input type='text' placeholder='Username' label='Username' name='user_name' value={user.user_name || ''} onChange={inputHandler} />
      <Input type='text' placeholder='Sport preferat' label='Sport preferat' name='main_sport' value={user.main_sport || ''} onChange={inputHandler} />
      <Input type='text' placeholder='Scurt descriere' label='Scurt descriere' name='introduction' value={user.introduction || ''} onChange={inputHandler} />
      <Input type='number' placeholder='Varsta' label='Varsta' name='age' value={user.age || ''} onChange={inputHandler} />
      <Input disabled type='email' placeholder='E-mail' label='E-mail' name='email' value={user.email || ''} onChange={inputHandler} />
      <Input type='text' placeholder='Numar telefon' label='Numar telefon' name='phone_number' value={user.phone_number || ''} onChange={inputHandler} />
      <Input type='password' placeholder='Parola' label='Parola' name='password' value={user.password || ''} onChange={inputHandler} />
      <Input type='password' placeholder='Confirmarea parolei' label='Confirmare parola' name='checkPassword' value={user.checkPassword || ''} onChange={inputHandler} />
      <Input type='file' label='Upload Image' name='imageUpload' onChange={imageInputHandler} />
    </div>
    <div className={styles.footer}> <Link to='/'> <Button onClick={ctx.onLogout}>LOGUT</Button> </Link>
     <Button type='submit' >Send</Button></div>    
  </Card>
  </div> </form>
  
}

export default EditUser;
