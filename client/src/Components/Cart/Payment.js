import React, { useState, useEffect, useContext } from 'react';
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { ItemContext } from '../../Context/ItemContext';
require('dotenv').config();
const stripePromise = loadStripe(process.env.publishableKey);


function Payment({ page, setPage }) {
    const { cart, dispatch } = useContext(ItemContext);
    const elements = useElements();
    const stripe = useStripe();

    return (
        <div>
            <h1>Payment</h1>
            <Elements stripe={stripePromise}>
            <MyCheckoutForm />
            </Elements>
        </div>
    );
}

export default Payment;