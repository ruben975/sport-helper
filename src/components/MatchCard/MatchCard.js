import styles from "./MatchCard.module.css";
import { MdAdminPanelSettings,MdLocationPin,MdDateRange } from "react-icons/md";


const MatchCard = (props) => {


    return (
        <div className={styles.card}>
           <div className={styles.image}>  <img className={styles.card__thumb} src={require("../../"+props.title.toLowerCase().trim()+".jpg")} alt="" /> </div>
          <div className={styles.adminSection}> <MdAdminPanelSettings />  <div >{props.admin}</div> </div>
          <div className={styles.adminSection}> <MdLocationPin />  <div >{props.location}</div> </div>
          <div className={styles.adminSection}> <MdDateRange />  <div >{props.date}</div> </div>
        </div>
    )
};

export default MatchCard; 