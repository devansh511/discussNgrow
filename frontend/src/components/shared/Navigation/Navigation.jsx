import React from 'react'
import {Link} from 'react-router-dom';
import styles from './Navigation.module.css';
export const Navigation = () => {
    const logoStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    };

    const logoText = {
        marginLeft: '10px',
    };

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={logoStyle} to="/">
                <img src='/images/hand.png' alt='hand' /><span style={logoText}>discussNgrow</span>
            </Link>
        </nav>
    );
}
