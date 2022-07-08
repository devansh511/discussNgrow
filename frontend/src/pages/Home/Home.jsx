import React from 'react'
import styles from './Home.module.css';
import { useHistory } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

export const Home = () => {
  // const signInLink = {
  //   color : '#0077FF',
  //   fontWeight : 'bold',
  //   textDecoration: 'none',
  //   marginLeft : '10px',
  // };

  const hist = useHistory();
  function register() {
    hist.push('./authenticate');
  }

  
   return (
    <div className={styles.cardWrapper}>
        <Card title="Welcome to discussNgrow!" icon="hand">
            <p className={styles.text}>
                Join us to escalate your overall personality and extend your
                knowledge by having discussions on discussNgrow. See yourself growing
                like never before. Happy and Healthy Discussing :)
            </p>
            <div>
                <Button onClick={register} text="Let's GO" />
            </div>
            <div className={styles.signInWrapper}> 
                <span className={styles.hasInvite}>Have an invite text?</span>
                
            </div>
        </Card>
    </div>
  );
}
