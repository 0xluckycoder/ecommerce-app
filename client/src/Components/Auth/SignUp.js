import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, useField } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import styles from './SignUp.module.scss';
import { AuthContext } from '../../Context/AuthContext';
import { registerRequest } from '../../API/api';
import { ACTIONS } from '../../actions';

function SignUp() {

    let history = useHistory();

    const { dispatch } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const timer  = setTimeout(() => setErrors({}), 2000);
        return () => {
            clearTimeout(timer);
        }
    }, [errors]);

    const register = async (values) => {
        setLoading(true);
        try {
            const { user } = await registerRequest(values);
            dispatch({ type: ACTIONS.REGISTER_SUCCESS, payload: user });
        } catch (error) {
            dispatch({ type: ACTIONS.REGISTER_FAIL });
            console.log('Error Occurred During Register', error);
            setErrors(error);
        }
        setLoading(false);
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.graphic}>
                <h1>Today's Good Mood Is Sponsored By Coffee</h1>
            </div>
            <div className={styles.form}>
                <h1>Sign up</h1>
                <p>Let's get you all setup so you don't have to enter same info again when ordering.</p>
                {errors.error !== undefined && <div className="alert alert-danger" role="alert">{errors.error}</div>}
                {loading && <div className="alert alert-primary" role="alert">Please wait...</div>}
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        shippingAddress: "",
                        password: ""
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().max(10).required('first name is required'),
                        lastName: Yup.string().max(10).required('last name is required'),
                        email: Yup.string().email().max(100).required('email required'),
                        shippingAddress: Yup.string().max(40).required('shipping address is required'),
                        password: Yup.string().min(8).max(100).required('Password is required')
                    })}
                    onSubmit={(values) => { register(values) }} >
                    <Form>
                        <div className={styles.inlineFields}>
                        <TextField id="firstName" name="firstName" type="text" label="First Name" />
                        <TextField id="lastName" name="lastName" type="text" label="Last Name" />
                        </div>
                        <TextField id="email" name="email" type="email" label="Email" />
                        <TextField id="shippingAddress" name="shippingAddress" type="text" label="Shipping Address" />
                        <TextField id="password" name="password" type="password" label="Password" />
                        <div className={styles.formButtons}>
                            <button className={styles.button} type="submit">Create My Account</button>
                            <button className={styles.button} onClick={() => history.push('/')}>Not Now</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </section>
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

export default SignUp;