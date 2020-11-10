import React from 'react';
import { Formik, Form, useField } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import styles from './SignUp.module.scss';

function SignUp() {

    let history = useHistory();

    return (
        <section className={styles.wrapper}>
            <div className={styles.graphic}>
                <h1>Today's Good Mood Is Sponsored By Coffee</h1>
            </div>
            <div className={styles.form}>
                <h1>Sign up</h1>
                <p>Let's get you all setup so you don't have to enter same info again when ordering.</p>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        shippingAddress: ""
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().max(10).required('first name is required'),
                        lastName: Yup.string().max(10).required('last name is required'),
                        email: Yup.string().email().max(25).required('email required'),
                        shippingAddress: Yup.string().max(40).required('shipping address is required')
                    })}
                >
                    <Form>
                        <div className={styles.inlineFields}>
                        <TextField id="firstName" name="firstName" type="text" label="First Name" />
                        <TextField id="lastName" name="lastName" type="text" label="Last Name" />
                        </div>
                        <TextField id="email" name="email" type="email" label="Email" />
                        <TextField id="shippingAddress" name="shippingAddress" type="text" label="Shipping Address" />
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

/*
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(),
                        password: Yup.string().required()
                    })}
                    onSubmit={({email, password}) => {
                        handleSignUp(email, password);
                    }}
                >
                    <Form>
                        <TextField id="email" name="email" type="email" label="Email" placeholder="example@email.com" />
                        <TextField id="password" name="password" type="password" label="Password" placeholder="********" />
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
                <button onClick={() => setState('signin')}>Sign in</button>
            </div>
        </>
        }
        </>
    );
}

const TextField = ({id, label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <label>{label}</label>
            <input {...field} {...props} className={`form-control ${meta.touched && meta.error ? `is-invalid` : null}`} />
            {meta.touched && meta.error ? (
                <div id={id} className="invalid-feedback">
                    {meta.error}
                </div>
            ): null}
        </div>
    );
}
*/ 
