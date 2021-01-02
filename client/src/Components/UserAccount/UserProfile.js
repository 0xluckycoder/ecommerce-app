import React, { useContext, useEffect } from 'react';
import styles from './UserProfile.module.scss';
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../../Context/AuthContext';
import { Redirect, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import EditProfile from './EditProfile';


function UserProfile() {
    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        // state.user && state.user.data && state.user.data.isAdmin;
    }, []);
    
    return (
        state.isAuthenticated && state.user && state.user.data &&
        <>
        <Navbar />
        <section className={styles.wrapper}>
            <div className={`card text-center ${styles.card}`}>
                <div className="card-body">
                <h5 className="card-title">{state.user.data.firstName} {state.user.data.lastName}</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{state.user.data.email}</li>
                    <li className="list-group-item">{state.user.data.shippingAddress}</li>
                    <li className="list-group-item">
                        <button className={styles.button}>Logout</button>
                        <Link to={`/edit/${state.user.data._id}`}><button className={styles.button}>Edit Profile</button></Link>
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
