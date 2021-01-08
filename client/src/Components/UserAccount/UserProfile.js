import React, { useContext, useEffect } from 'react';
import styles from './UserProfile.module.scss';
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../../Context/AuthContext';
import { Redirect, Link, Route, BrowserRouter as Router, useHistory } from 'react-router-dom';
import EditProfile from './EditProfile';


function UserProfile() {
    const { state, dispatch } = useContext(AuthContext);

    window.addEventListener('storage', () => {
        console.log('fired')
    });

    let history = useHistory();

    // useEffect(() => {
    // }, []);

    // const { firstName, lastName, email, shippingAddress, _id } = state;
    
    return (
        state.isAuthenticated && state.user &&        
        <>
        <Navbar />
        <section className={styles.wrapper}>
            <div className={`card text-center ${styles.card}`}>
                <div className="card-body">
                <h5 className="card-title">{state.user.firstName} {state.user.lastName}</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{state.user.email}</li>
                    <li className="list-group-item">{state.user.shippingAddress}</li>
                    <li className="list-group-item">
                        <button className={styles.button}>Logout</button>
                        <Link to={`/edit/${state._id}`}><button className={styles.button}>Edit Profile</button></Link>
                    </li>
                </ul>
                </div>
            </div>
            
            <div className={styles.history}>
                <p className="text-center">No Previous Orders Available</p>
            </div>
        </section>
        </>
    );
}

export default UserProfile;
