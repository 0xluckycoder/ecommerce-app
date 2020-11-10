import React from 'react';
import styles from './Navbar.module.scss';

import { Link, useHistory } from 'react-router-dom';

function Navbar() {

    let history = useHistory();
    
    return (
        <header className={styles.wrapper}>
            <div className={styles.logo}>
                <Link to="/"><p>Dark <span>Coffee</span></p></Link>
            </div>

            <div className={styles.links}>
                <ul>
                    <li>Home</li>
                    <li>Trending</li>
                    <li>Our Blog</li>
                    <li>Gift Cards</li>
                    <li>Rewards</li>
                </ul>
            </div>

            <div className={styles.searchWrapper}>
                <div className={styles.search}>
                    <input type="search" placeholder="Search" />
                    <i className="fas fa-search"></i>
                </div>

                <div className={styles.signIn}>
                    <button onClick={() => history.push('/dark-coffee/login')} className={styles.button}>Sign in</button>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
