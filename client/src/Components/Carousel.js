import React from 'react'
import coffee from '../assets/coffee-cup.png';
import styles from './Carousel.module.scss';

function Carousel() {
    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <video 
                src="https://res.cloudinary.com/dw2wcjhod/video/upload/v1604847265/video_rfjr7n.mp4" autoPlay="true" loop="true" muted="true"></video>
                {/* <video></video> */}
            </div>
            <div className={styles.content}>
                <h1>Dark Coffee</h1>
                <p>What goes best with a cup of coffee, Another cup</p>
                <button className={styles.button}>Shop Now</button>
            </div>
        </section>
    );
}

export default Carousel;
