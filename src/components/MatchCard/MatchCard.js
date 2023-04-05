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
    {localStorage.getItem("user_name") === props.admin && <MdDelete onClick={props.deleteGame} size={40}
     color='rgb(255, 130, 0, 0.95)'style={{cursor:'pointer', position: 'absolute', top: '5%', left: '80%'}} />}
    <div className={style.profile__photo}>
      
    <img className={style.card__thumb} src={require("../../"+props.title.toLowerCase().trim()+".jpg")} alt="" /> 
    </div>
      <h2 style={{marginBottom:'1em'}}>{props.title}</h2>
      <p><span><MdLocationPin /></span>{props.location}</p>
       <p><span><MdDateRange /></span>{props.date}</p>
      <p><span><BsFillChatTextFill /></span>{props.description}</p>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems:'center', marginTop:'1.5em'}}>  {props.invited.includes(localStorage.getItem("user_name")) && 
      <MdDone onClick={props.acceptInvitation} size={40} color='green' style={{cursor:'pointer'}}/>}
       {props.invited.includes(localStorage.getItem("user_name")) && 
      <MdClose onClick={props.rejectInvitation} size={40} color='red' style={{cursor:'pointer'}} />}
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems:'center', marginTop:'1.5em'}}>
    
      <Button className>Detalii</Button>
      
     
      </div>
    </div>
  </div>
</div>
  
  
    )
};

export default MatchCard; 