import React, { createContext, useReducer } from 'react';
import { ACTIONS } from '../actions';

export const ErrorContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.GET_ERRORS:
            state = {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
            break;
        case ACTIONS.CLEAR_ERRORS:
            state = {
                msg: {},
                status: null,
                id: null
            };
            break;
        default:
            return state;
    }
};

const ErrorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        msg: {},
        status: null,
        id: null
    });

    return (
        <ErrorContext.Provider value={{ state, dispatch }}>
            {children}
        </ErrorContext.Provider>
    );
}

export default ErrorContextProvider;