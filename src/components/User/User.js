
import { useContext } from "react";
import styles from '../User/User.module.css';
import UserContext from '../../Context/users-context';


const User = (props) => {

  const ctx = useContext(UserContext);
  let users = ctx.users;
  users = users.filter(user => user.user_name !== localStorage.getItem('user_name'));

  return (
    <div className={styles.content}>
    <ul className={styles.cards}>
      {users.map((user) => (
       <li key={user.id}>
        <div className={styles.card} >
          <img src={require("../../usersPhotoGallery/"+user.user_name+".jpg")} className={styles.card__image} alt="" />
          <div className={styles.card__overlay} >
            <div className={styles.card__header} >
              <svg className={styles.card__arc}  xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
              <img className={styles.card__thumb} src={require("../../"+user.main_sport.toLowerCase().trim()+".jpg")} alt="" /> 
              <div>
                <h3 className={styles.card__title}>{user.first_name+" "+user.last_name}</h3>            
                <span className={styles.card__status} >{user.main_sport}</span>
              </div>
            </div>
            <p className={styles.card__description} >{user.introduction}
            Numarul meu de telefon este:
            {user.phone_number} </p>
          </div>
        </div>      
      </li>
      ))
      }
  
  
  </ul>
    </div>
  );
};

export default User;
