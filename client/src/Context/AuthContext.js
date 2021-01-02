import React, { createContext, useReducer } from 'react';
import { ACTIONS } from '../actions';

export const AuthContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.USER_LOADING:
            return state = {
                ...state,
                isLoading: true
            }
        // eslint-disable-next-line no-fallthrough
        case ACTIONS.USER_LOADED:
            return state = {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        // eslint-disable-next-line no-fallthrough
        case ACTIONS.LOGIN_SUCCESS:
        case ACTIONS.REGISTER_SUCCESS:
            // setLocalStorage(action.payload)
            // console.log(action.payload.data, 'dispatched to context');
            console.log('action payload', action.payload);
            return state = {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token: action.payload.token,
                user: { data: action.payload.data },
            }
        // eslint-disable-next-line no-fallthrough
        case ACTIONS.AUTH_ERROR:
        case ACTIONS.LOGIN_FAIL:
        case ACTIONS.LOGOUT_SUCCESS:
        case ACTIONS.REGISTER_FAIL:
            localStorage.removeItem('token');
            return state = {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case ACTIONS.UPDATE_SUCCESS:
            // console.log(action.payload.data, 'dispatched to context');
            return state = {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: { data: action.payload.data },
            }
        // eslint-disable-next-line no-fallthrough
        default:
            return state
    }
}

const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        isLoading: false,
        user: null
    });

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;