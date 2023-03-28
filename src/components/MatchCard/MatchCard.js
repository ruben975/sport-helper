import styles from "./MatchCard.module.css";
import { MdAdminPanelSettings,MdLocationPin,MdDateRange } from "react-icons/md";
import {BsFillChatTextFill} from "react-icons/bs";
import {MdDelete, MdDoneOutline, MdClose} from "react-icons/md";
import {GrClear} from "react-icons/gr";
const MatchCard = (props) => {

    return (
     <div className={styles.card}>
        <div className={styles.image}>  <img className={styles.card__thumb} src={require("../../"+props.title.toLowerCase().trim()+".jpg")} alt="" /> </div>
          <div className={styles.adminSection}> <MdAdminPanelSettings />  <div >{props.admin}</div> </div>
          <div className={styles.adminSection}> <MdLocationPin />  <div >{props.location}</div> </div>
          <div className={styles.adminSection}> <MdDateRange />  <div >{props.date}</div> </div>
          <div className={styles.adminSection}> <BsFillChatTextFill />  <div >{props.description}</div> </div>
          {Array.isArray(props.invited) && console.log(Array.isArray(props.invited))}
        {props.admin === localStorage.getItem('user_name') && <MdDelete onClick={props.deleteGame} style={{cursor: 'pointer'}} size={30} color='red'/> }
        {props.invited && props.invited.split(',').includes(localStorage.getItem('user_name')) && <MdDoneOutline style={{cursor: 'pointer'}} onClick={props.acceptInvitation} size={30} color='white'/> }
        {props.invited && props.invited.split(',').includes(localStorage.getItem('user_name')) && <MdClose style={{cursor: 'pointer'}} onClick={props.rejectInvitation} size={30} color='red'/> }
        </div>
    )
};

export default MatchCard; 