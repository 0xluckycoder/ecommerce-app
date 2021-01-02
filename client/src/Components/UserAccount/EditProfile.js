import React, { useContext, useState } from 'react';
import styles from './EditProfile.module.scss';
import { AuthContext } from '../../Context/AuthContext';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import Navbar from '../Navbar/Navbar';
import { updateRequest } from '../../API/api';
import { ACTIONS } from '../../actions';

function EditProfile() {

    const { state, dispatch } = useContext(AuthContext);
    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const updateUser = async (values) => {
        setLoading(true);
        try {
            const data = await updateRequest(values);
            if (data) {
                dispatch({ type: ACTIONS.UPDATE_SUCCESS, payload: data });
                setLoading(false);
                history.push(`/user/${state.user.data._id}`)
            }
        } catch (error) {
            console.log('Error Occurred During Register', error);
            setErrors(error);
        }

    }

    return (
        state.isAuthenticated && state.user && state.user.data ?
        <>
        <Navbar />
        <section className={styles.wrapper}>
            {/* alerts */}
            <div className={`card text-center ${styles.card}`}>
            {errors.error !== undefined && <div className="alert alert-danger" role="alert">{errors.error}</div>}
            {loading && <div className="alert alert-primary" role="alert">Please wait...</div>}
                <div className="card-body">
                <div className="card-title text-left">Update your profile</div>
                <Formik
                    initialValues={{
                        firstName: `${state.user.data.firstName}`,
                        lastName: `${state.user.data.lastName}`,
                        shippingAddress: `${state.user.data.shippingAddress}`,
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().max(10).required('first name is required'),
                        lastName: Yup.string().max(10).required('last name is required'),
                        shippingAddress: Yup.string().max(40).required('shipping address is required'),
                    })}
                    onSubmit={({firstName, lastName, shippingAddress}) => {
                        // console.log(firstName, lastName, shippingAddress);
                        updateUser({ firstName, lastName, shippingAddress, id: state.user.data._id });
                        // console.log(values);
                        // register(values);
                        // registerRequest(, password);
                    }}
                >
                    <Form>
                        <TextField id="firstName" name="firstName" type="text" label="First Name" />
                        <TextField id="lastName" name="lastName" type="text" label="Last Name" />
                        <TextField id="shippingAddress" name="shippingAddress" type="text" label="Shipping Address" />
                        <div className={styles.formButtons}>
                            <button className={styles.button} type="submit">Save</button>
                            <button className={styles.button} onClick={() => history.push(`/user/${state.user.data._id}`)}>Cancel</button>
                        </div>
                    </Form>
                </Formik>
                </div>
            </div>
        </section>
        </>
        :
        <Redirect to="/" />
    )
}

const TextField = ({id, label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className={styles.field}>
            <label>{label}</label>
            <input {...field} {...props} className={`form-control ${meta.touched && meta.error ? `is-invalid` : null}`} />
            {meta.touched && meta.error ? (
                <div id={id} className="invalid-feedback">
                    {meta.error}
                </div>
            ): <div className="error-empty-space"></div>}
        </div>
    );
}

export default EditProfile;

