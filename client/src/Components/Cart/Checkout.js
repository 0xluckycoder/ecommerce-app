import React, { useContext } from 'react';
import style from './Checkout.module.scss';
import { ItemContext } from '../../Context/ItemContext';
import { ACTIONS } from '../../actions';

function Checkout({ setPage }) {

    const { cart, dispatch } = useContext(ItemContext);

    const calculateTotal = (items) => {
        let value = 0;
        items.map(item => value += item.price);
        return value;
    }

    return (
        <div className={style.wrapper}>
            <h1>Your Cart</h1>
            <div className={style.list}>
                <ul>
                    {cart.items !== null && cart.items.map((item, index) => (
                        <li key={index}>
                            <img draggable="false" src="https://res.cloudinary.com/dw2wcjhod/image/upload/v1609596515/posts/xok0ucfoquts81pws0mn.jpg" alt="product" />
                            <div>
                                <p>{item.product_name}</p>
                                <p className={style.price}>{item.price} LKR</p>
                            </div>
                            <i onClick={() => dispatch({ type: ACTIONS.REMOVE_CART_ITEM, payload: { id: item._id } })} className="fas fa-times"></i>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={style.footer}>
                {
                cart.items === null
                
                ? <h1>0 LKR</h1>
                
                : <h1>{calculateTotal(cart.items)} LKR</h1>
                
                }
                <button onClick={() => setPage('payment')} className={style.button}>Checkout</button>
            </div>
            {/* {cart.items.map(item => <p>{item.product_name}</p>)}*/}
        </div>
    );
}

export default Checkout;