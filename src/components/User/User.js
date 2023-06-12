import { useContext, useState, useEffect } from "react";
import styles from '../User/User.module.css';
import UsersContext from '../../Context/users-context';
import UserContext from '../../Context/actualUser-context';
import { HiOutlineHeart } from "react-icons/hi";
import { MdFilterListAlt, MdAlternateEmail, MdLocationOn, MdPerson, MdChatBubble, MdPhoneIphone, MdSearch } from 'react-icons/md';
import Card from '../UI/Card/Card';
import Button from "../UI/Button/Button";

const User = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [isPrefered, setIsPrefered] = useState(false);
  const ctx = useContext(UsersContext);
  const userContext = useContext(UserContext);
  const [initialRender, setInitialRender] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchName, setSearchName] = useState("");

  let users = ctx.users;
  users = users.filter(user => user.user_name !== localStorage.getItem('user_name'));
  const [usersList, setUsersList] = useState(users);

  useEffect(() => {
    if (initialRender < 100) {
      setUsersList(users);
      setInitialRender(prevRender => prevRender + 1);
    }
  }, [initialRender]);

  useEffect(() => {
    const fetchActualUser = async () => {
      await userContext.getActualUser();
    };

    fetchActualUser();

  }, [userContext]);

  useEffect(() => {
    if (isPrefered) {
      setUsersList(ctx.users.filter((user) =>
        userContext.actualUser.liked_players.includes(user.user_name) &&
        user.user_name !== localStorage.getItem('user_name') &&
        user.main_sport.toLowerCase().includes(searchTerm.toLowerCase()) &&
        user.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        (user.last_name.toLowerCase().includes(searchName.toLowerCase()) || 
        user.first_name.toLowerCase().includes(searchName.toLowerCase()))
      ));
    } else {
      setUsersList(users.filter((user) =>
        user.user_name !== localStorage.getItem('user_name') &&
        user.main_sport.toLowerCase().includes(searchTerm.toLowerCase()) &&
        user.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        (user.last_name.toLowerCase().includes(searchName.toLowerCase()) || 
        user.first_name.toLowerCase().includes(searchName.toLowerCase()))
      ));
    }
  }, [isPrefered, searchTerm, searchLocation, searchName]); 


  const likeUser = (likedUser) => {
    userContext.likePlayer(likedUser);
  };

  const userFilter = () => {
    setIsPrefered(!isPrefered);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className={styles.content}>
      <div className={styles.filter__container}>
      <div className={styles.filter}>
  <div className={styles.filter__dropdown}>
  <Button className={styles.button} onClick={toggleFilter}> Filtrare</Button>
    
      <div className={styles.filter__dropdownContent}>
      <div>
        <label htmlFor="searchTerm">Căutare după sport:</label>
        <input
          type="text"
          id="searchTerm"
          placeholder=""
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div>
        <label htmlFor="searchLocation">Căutare după locație:</label>
        <input
          type="text"
          id="searchLocation"
          placeholder=""
          value={searchLocation}
          onChange={(event) => setSearchLocation(event.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div>
              <label htmlFor="searchName">Căutare după nume:</label>
              <input
                type="text"
                id="searchName"
                placeholder=""
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
                className={styles.searchInput}
              />
            </div>
      <p className={isPrefered ? styles.active : ""} onClick={userFilter}>
        Afișează preferați mei
      </p>
      <p className={styles.clearFilters} onClick={() => {
    setIsPrefered(false);
    setSearchTerm("");
    setSearchLocation("");
    setSearchName("");
  }}>
    Anulează filtrele
  </p>
    </div>
    
  </div>
</div>
      </div>
      <ul className={styles.cards}>
        {
          usersList.map((user) => (
            <li key={user.id}>
              <div className={styles.card} >
                <div className={styles.circle}>
                  {userContext.actualUser.liked_players.includes(user.user_name) ?
                    <HiOutlineHeart onClick={() => likeUser(user.user_name)} fill="red" className={styles.heart} size={30} />
                    : <HiOutlineHeart onClick={() => likeUser(user.user_name)} className={styles.heart} size={30} />
                  }
                </div>
                <img src={require("../../usersPhotoGallery/" + user.user_name + ".jpg")} className={styles.card__image} alt="" />

                <div className={styles.card__overlay} >
                  <div className={styles.card__header} >
                    <svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg"><path /></svg>
                    <img className={styles.card__thumb} src={require("../../" + user.main_sport.toLowerCase().trim() + ".jpg")} alt="" />
                    <div>
                      <h3 className={styles.card__title}>{user.first_name + " " + user.last_name}</h3>
                      <span className={styles.card__status} >{user.user_name}</span>
                    </div>
                  </div>
                  <div className={`${styles.card__description} ${styles.custom__scrollbar}`} >
                    <div className={styles.content__rows}> <MdLocationOn style={{ color: 'white' }} color="white" fill="white" size={20}></MdLocationOn>{' ' + user.location}</div>
                    <div className={styles.content__rows}> <MdPerson size={30}></MdPerson>{' ' + user.age} {user.age > 20 && 'de'} ani</div>
                    <div className={styles.content__rows}><MdChatBubble size={20} /> {' ' + user.introduction}</div>
                    <div className={styles.content__rows}><MdPhoneIphone size={20} />{' ' + user.phone_number}</div>
                    <div className={styles.content__rows}><MdAlternateEmail size={20} />{' ' + user.email}</div>
                  </div>
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