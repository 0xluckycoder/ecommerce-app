import React, { useContext } from 'react';
import styles from './Navbar.module.scss';
import { AuthContext } from '../../Context/AuthContext';
import { NavbarContext } from '../../Context/NavbarContext';
import { Link, useHistory } from 'react-router-dom';
import { ACTIONS } from '../../actions';
import Search from './Search';
import MobileNav from './MobileNav';

function Navbar() {

    const { state } = useContext(AuthContext);

    let history = useHistory();

    const { setNavState } = useContext(NavbarContext);
    
    return (
        <nav className={styles.wrapper}>
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
                    {state.isAuthenticated && state.user && state.user.data
                    ?<button onClick={() => history.push(`/user/${state.user.data._id}`)} className={styles.button}>My Profile</button>
                    :<button onClick={() => history.push('/dark-coffee/login')} className={styles.button}>Sign in</button>}
                    
                </div>

                <div onClick={() => setNavState(true)} className={styles.menuIcon}>
                    <i class="fas fa-bars"></i>
            </div>
            </div>
            <MobileNav />
        </nav>
    );
}

export default Navbar;
