import React from 'react'
import Navbar from './Navbar/Navbar';
import Carousel from './Carousel';
import Products from './Products';
import CartBubble from './CartBubble';

import { Route } from 'react-router-dom';
import SignInModal from './Auth/SignInModal';

function Home() {
    
    return (
        <>
            <Navbar />
            <Carousel />
            <CartBubble />
            <Products />
            
            <Route path="/dark-coffee/login" component={SignInModal} />
        </>
    )
}

export default Home;
