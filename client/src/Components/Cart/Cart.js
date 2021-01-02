import React, { useState, useEffect } from 'react';
import styles from './Cart.module.scss';
import { ItemContext } from '../../Context/ItemContext';

import Checkout from './Checkout';
// import Payment from './Payment';
import Done from './Done';

function Cart({ setOpen }) {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "visible";
        }
    }, []);

    const handleClose = (e, includeClass) => {
        typeof e.target.className === "string" && 
        e.target.className !== "" && 
        e.target.className.split(' ').includes(includeClass) && setOpen(false);
    }

    return (
        <div onClick={(e) => handleClose(e, 'cart-overlay')} className={`cart-overlay ${styles.overlay}`}>
            <div className={styles.wrapper}>
                <Page />
            </div>
        </div>
    )
}

function Page() {

    const [page, setPage] = useState('checkout');

    switch (page) {
        case 'checkout':
            return <Checkout setPage={setPage} />
        // case 'payment':
        //     return <Payment setPage={setPage} />
        case 'done':
            return <Done /> 
        default:
            break;
    }
}

export default Cart;
