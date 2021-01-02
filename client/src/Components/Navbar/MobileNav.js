import React, { useState, useContext } from 'react';
import Search from './Search';
import styles from './MobileNav.module.scss';
import { NavbarContext } from '../../Context/NavbarContext';
import { AuthContext } from '../../Context/AuthContext';
import { useHistory } from 'react-router-dom';

function MobileNav() {
    let history = useHistory();
    const { setNavState, navState } = useContext(NavbarContext);
    const { state } = useContext(AuthContext);
    return (
        <div className={navState ? `${styles.wrapper} ${styles.available}` : `${styles.wrapper} ${styles.unavailable}`}>
            <Search />
            <div className={styles.navItems}>
                <ul>
                    <li>Home</li>
                    <li>Trending</li>
                    <li>Our Blog</li>
                    <li>Gift Cards</li>
                    <li>Rewards</li>
                    <li>{state.isAuthenticated && state.user && state.user.data
                    ?<button onClick={() => history.push(`/user/${state.user.data._id}`)} className={styles.button}>My Profile</button>
                    :<button onClick={() => history.push('/dark-coffee/login')} className={styles.button}>Sign in</button>}
                    </li>
                </ul>
            </div>
            <div onClick={() => setNavState(false)} className={styles.close}>
                <i class="fas fa-times"></i>            
            </div>
        </div>
    )
}


export default MobileNav;
