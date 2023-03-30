import style from "./MatchCard.module.css";
import {MdLocationPin,MdDateRange } from "react-icons/md";
import {BsFillChatTextFill} from "react-icons/bs";
import {MdDelete, MdDone, MdClose} from "react-icons/md";
import Button from "../UI/Button/Button";
const MatchCard = (props) => {

    return (
      <div className={style.container}>
  <div className={style.card}>
    <div className={style.card__top}>
    </div>
    <div className={style.card__content}>
    <div className={style.profile__photo}>
    <img className={style.card__thumb} src={require("../../"+props.title.toLowerCase().trim()+".jpg")} alt="" /> 
    </div>
      <h2>{props.title}</h2>
      <p><span><MdLocationPin /></span>{props.location}</p>
       <p><span><MdDateRange /></span>{props.date}</p>
      <p><span><BsFillChatTextFill /></span>{props.description}</p>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems:'center'}}>
      {props.invited.includes(localStorage.getItem("user_name")) && 
      <MdDone onClick={props.acceptInvitation} size={40} style={{cursor:'pointer'}}/>}
      <Button>Detalii</Button>
      {localStorage.getItem("user_name") === props.admin && <MdDelete size={40} style={{cursor:'pointer'}} />}
      {props.invited.includes(localStorage.getItem("user_name")) && 
      <MdClose onClick={props.rejectInvitation} size={40} color='red' style={{cursor:'pointer'}} />}
      </div>
    </div>
  </div>
</div>
  
  
    )
};

export default MatchCard; 