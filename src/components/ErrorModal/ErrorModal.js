import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./Error.module.css";



const ErrorModal = (props) => {


  return (
    <div>
      <div className={styles.backdrop} onClick={props.onConfirm} />
        <Card className={styles.modal} >
          <header className={`${styles.header} ${props.className}`}>
            <h2>{props.error}</h2>
          </header>
          <div className={styles.content}>
            <div className={styles.item}>{props.content}</div>
          </div>
          <footer className={styles.actions}>
            <Button  type='button' onClick={props.onConfirm}>OK</Button>
          </footer>
        </Card>
    </div>
  );
};

export default ErrorModal;