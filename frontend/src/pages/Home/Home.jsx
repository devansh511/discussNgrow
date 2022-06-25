import React from 'react'
import styles from './Home.module.css';
import { Link, useHistory } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import { Button } from '../../components/shared/Button/Button';

export const Home = () => {
  const signInLink = {
    color : '#0077FF',
    fontWeight : 'bold',
    textDecoration: 'none',
    marginLeft : '10px',
  };

  const hist = useHistory();
  function register() {
    hist.push(`./register`);
  }

  
   return (
    <div className={styles.cardWrapper}>
        <Card title="Welcome to discussNgrow!" icon="hand">
            <p className={styles.text}>
                We’re working hard to get discussNgrow ready for everyone! 
                While we wrap up the finishing touches, we’re adding people 
                gradually to make sure nothing breaks.
            </p>
            <div>
                <Button onClick={register} text="Get you username" />
            </div>
            <div className={styles.signInWrapper}> 
                <span className={styles.hasInvite}>Have an invite text?</span>
                <Link style={signInLink} to= "/login"> Sign in</Link>
            </div>
        </Card>
    </div>
  );
}
