
import { useContext, useState, useEffect } from "react";
import styles from '../User/User.module.css';
import UsersContext from '../../Context/users-context';
import UserContext from '../../Context/actualUser-context';
import {HiOutlineHeart} from "react-icons/hi";
import Card from '../UI/Card/Card';

const User = (props) => {


  const [isPrefered, setIsPrefered] = useState(false);
  const ctx = useContext(UsersContext);
  const userContext = useContext(UserContext);
  userContext.getActualUser();
  let users = ctx.users;
  users = users.filter(user => user.user_name !== localStorage.getItem('user_name'));
  const [usersList, setUsersList] = useState([]);
   useEffect(() => {
  if (isPrefered) {
      setUsersList(ctx.users.filter(user => userContext.actualUser.liked_players.includes(user.user_name)));
    } else {
      setUsersList(users);
    }
  }, [isPrefered, ctx.users, userContext.actualUser]);
const likeUser = (likedUser) => {
  userContext.likePlayer(likedUser);
}

const userFilter = () => {
 setIsPrefered(!isPrefered);
  }


  return (
    <div className={styles.content}>
      <Card className={styles.filter}>
        <p style={{marginRight : '1rem', color: isPrefered ? 'white' : 'orange' }} onClick={userFilter}>Toți</p>
        <p style={{marginLeft : '1rem', color: isPrefered ? 'orange' : 'white' }} onClick={userFilter}>Preferați</p>
        </Card>
    <ul className={styles.cards}>
      {
      usersList.map((user) => (
       <li key={user.id}>
        <div className={styles.card} >
          <div className={styles.circle}>
          {userContext.actualUser.liked_players.includes(user.user_name) ?
      <HiOutlineHeart onClick={() => likeUser(user.user_name)} fill="red" className={styles.heart} size={30}/>
      : <HiOutlineHeart onClick={() => likeUser(user.user_name)} className={styles.heart} size={30}/>
      }
      </div>
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
            <p className={styles.card__description} >{user.introduction+" "}
            Numarul meu:
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
