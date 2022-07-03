import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../http';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
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

    const dispatch = useDispatch();
    
    const { isAuth, user } = useSelector((state) => state.auth);
    
    async function logoutUser() {
        try {
            const { data } = await logout();
            dispatch(setAuth(data));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={logoStyle} to="/">
                <img src="/images/hand.png" alt="logo" />
                <span style={logoText}>discussNgrow</span>
            </Link>
            {isAuth && (
                <div className={styles.navRight}>
                    <h3>{user?.name}</h3>
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                user.avatar
                                    ? user.avatar
                                    : '/images/image.png'
                            }
                            width="40"
                            height="40"
                            alt="a"
                        />
                    </Link>
                    <button
                        className={styles.logoutButton}
                        onClick={logoutUser}
                    >Logout
                        {/* <img src="/images/logout.png" alt="logout" /> */}
                    </button>
                </div> 
            )}
        </nav>
    );
};

