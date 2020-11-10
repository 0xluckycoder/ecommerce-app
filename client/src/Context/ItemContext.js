import React, { createContext, useReducer } from 'react';
import { ACTIONS } from '../actions';

export const ItemContext = createContext();

const reducer = (cart, action) => {
    switch (action.type) {
        case ACTIONS.ADD_CART_ITEM:
            if (cart.items !== null) {
                return cart = {
                    items: [...cart.items, action.payload]
                };
            } else {
                return cart = {
                    items: [action.payload]
                }
            }
        // eslint-disable-next-line no-fallthrough
        case ACTIONS.REMOVE_CART_ITEM:
            const filtered = cart.items.filter(item => item._id !== action.payload.id);
            return cart = {
                items: filtered
            }
            // if (cart.items !== null) {
        
            // }
            
            // return cart = {
            //     ...filtered
            // };
        // eslint-disable-next-line no-fallthrough
        case ACTIONS.CLEAR_CART:
            localStorage.removeItem('items');
            return cart;
        // eslint-disable-next-line no-fallthrough
        default:
            return cart
    }
}

const ItemContextProvider = ({ children }) => {

    const [cart, dispatch] = useReducer(reducer, {
        items: localStorage.getItem('items'),
    });

    return (
        <ItemContext.Provider value={{ cart, dispatch }}>
            {children}
        </ItemContext.Provider>
    );
}

export default ItemContextProvider;