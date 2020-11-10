import React, { useEffect, useState} from 'react';
import styles from './Products.module.scss';

import { Link } from 'react-router-dom';
import Loader from './Loader';

function Products() {

    const [loading, setLoading] = useState(false);

    const [state, setState] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/items');
            const data = await response.json();
            setState(data);
        } catch (error) {
            console.log('error on loading items', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        // let mounted = true;
        fetchData();
        // if (mounted) setLoading(false);

        // return () => {
        //     mounted = false;
        // }
    }, []);

    return (
        loading ? 
        <div className={styles.loading}>
            <Loader />
        </div> :
        <section className={styles.wrapper}>
            {state.map((product, index) => (
                <div key={index} className={styles.product}>
                    <Link to={`/product/${product._id}`}>
                        <img draggable="false" alt="product" src="https://res.cloudinary.com/dw2wcjhod/image/upload/v1604854731/coffee_ukkvte.jpg" />
                        <p className={styles.name}>{product.product_name}</p>
                    </Link>
                        <p>LKR {product.price}</p>
                </div>
            ))}
        </section>
    );
}
export default Products;
