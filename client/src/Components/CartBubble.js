import React, { useContext, useState } from 'react';
import styles from './CartBubble.module.scss';
import { ItemContext } from '../Context/ItemContext'
import Cart from './Cart/Cart';

function CartBubble() {
    const { cart, dispatch } = useContext(ItemContext);

    const [open, setOpen] = useState(false);

    // {cart.items === null || cart.items === [] ? <h1 className={style.empty}>Cart is Empty</h1> : null}

    const handleCart = (items) => {
        if (items === null || items.length == 0) {
            return;
        } else {
            setOpen(!open);
        }
    }

    return (
        <>
            <div onClick={() => handleCart(cart.items)} className={styles.wrapper}>
                <i className="fas fa-shopping-cart"></i><p>{cart.items !== null ? cart.items.length : 0} items</p>
                {/* if empty show cart is empty */}
            </div>
            {open && <Cart setOpen={setOpen} />}
        </>
    );
}

export default CartBubble;