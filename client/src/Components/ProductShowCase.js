import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from './ProductShowCase.module.scss';
import { ItemContext } from '../Context/ItemContext';

import Navbar from './Navbar';
import CartBubble from './CartBubble';
import Loader from './Loader';
import { ACTIONS } from '../actions';

function ProductShowCase() {
    
    const [state, setState] = useState({});

    const [loading, setLoading] = useState(false);

    let { id } = useParams();
    
    const fetchProduct = async (id) => {
        setLoading(true);
        try {            
            const response = await fetch(`/api/items/${id}`);
            const data = await response.json();
            setState(data);
        } catch (error) {
            console.log('error fetching product', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProduct(id);
    }, []);

    return (
        <div>
            <Helmet>
                <title>{state && state.product_name}</title>
            </Helmet>
            <Navbar />
            {loading 
            ? 
            <div className={styles.loading}>
                <Loader />
            </div>
            : <Product state={state} />}
        </div>
    )
}

function Product({ state }) {

    // const [quantity, setQuantity] = useState(1);

    // const handleIncrement = () => {
    //     // validate quantity
    //     if (state.available_quantity === quantity) return; 

    //     setQuantity(quantity + 1);
    // }

    // const handleDecrement = () => {
    //     // validate quantity
    //     if (quantity === 1) return;
    //     setQuantity(quantity - 1);
    // }

    const { cart, dispatch } = useContext(ItemContext);

    // const addToCart = (state) => {
    //         if (cart.items !== null) {

    //             // validate quantity
    //             const products = cart.items.filter(item => item.product._id === state._id);
    //             const getCartQty = products.find(product => product.cart_qty);
    //             const previousQty = getCartQty.cart_qty;
    //             const currentQty = previousQty + quantity;
    //             // console.log('yo im logging', product);

    //             dispatch({ 
    //                 type: ACTIONS.ADD_CART_ITEM,
    //                 payload: {
    //                     product: state,
    //                     cart_qty: currentQty
    //                 } 
    //             });
    //         } else {
    //             dispatch({ 
    //                 type: ACTIONS.ADD_CART_ITEM,
    //                 payload: {
    //                     product: state,
    //                     cart_qty: quantity   
    //                 } 
    //             });
    //         }
    // }

    const addToCart = (state) => {
        if (cart.items !== null) {
            const found = cart.items.find(item => item._id === state._id);
            if (found !== undefined) {
                alert('bruh da product already exists');
            } else {
                dispatch({ type: ACTIONS.ADD_CART_ITEM, payload: state });
            }
        } else {
            dispatch({ type: ACTIONS.ADD_CART_ITEM, payload: state });
        }
    }

    return (
        <section className={styles.wrapper}>
            
            <div className={styles.image}>
                <img draggable="false" src="https://res.cloudinary.com/dw2wcjhod/image/upload/v1604854731/coffee_ukkvte.jpg" alt="product" />
            </div>

            <div className={styles.content}>
                <div className={styles.heading}>
                    <h1>{state.product_name}</h1>
                    <p>{state.description}</p>
                </div>
                
                <div className={styles.nutrition}>
                    <div>
                        <p>Calories</p>
                        <p>{state.calories}g</p>
                    </div>
                    <div>
                        <p>Total Fat</p>
                        <p>{state.total_fat}g</p>
                    </div>
                    <div>
                        <p>Sugar</p>
                        <p>{state.suger}g</p>
                    </div>
                </div>

                <div className={styles.price}>
                    <p>Price</p>
                    <p>{state.price} LKR</p>
                </div>

                {/* <div className={styles.quantity}>
                    <p>Quantity</p>
                    <div className={styles.quantity_buttons}>
                        <button onClick={handleIncrement}><i className="fas fa-plus"></i></button>
                        <p>{quantity}</p>
                        <button onClick={handleDecrement}><i className="fas fa-minus"></i></button>
                    </div>
                </div> */}

                <div className={styles.buttons}>
                    <button className={styles.button}>Buy Now</button>
                    <button onClick={() => addToCart(state)} className={styles.button}>Add to Cart</button>
                </div>
            </div>
            <CartBubble />
        </section>
    );
}

export default ProductShowCase;
