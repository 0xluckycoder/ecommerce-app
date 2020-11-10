import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import styles from './SignInModal.module.scss';

function SignInModal() {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "visible";
        }
    }, []);

    let history = useHistory();

    const handleClose = (e, includeClass) => {
        typeof e.target.className === "string" && 
        e.target.className !== "" && 
        e.target.className.split(' ').includes(includeClass) && history.push('/dark-coffee');
    }

    return ReactDOM.createPortal(
        <div onClick={(e) => handleClose(e, 'sign-in-overlay')} className={`sign-in-overlay ${styles.overlay}`}>
            <div className={styles.wrapper}>
                <div className={styles.body}>
                <h1>Sign in</h1>
                <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email().required(),
                    password: Yup.string().required()
                })}
                onSubmit={({email, password}) => {
                    console.log(email, password);
                }}
                >
                    <Form>
                        <TextField id="email" name="email" type="email" label="Email" />
                        <TextField id="password" name="password" type="password" label="Password" />
                        <div className={styles.buttonWrapper}>
                            <button className={styles.button}>Sign in</button>
                        </div>
                    </Form>
                </Formik>
                <p>Dont have an account ? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
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

export default SignInModal;
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