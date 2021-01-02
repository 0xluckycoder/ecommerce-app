import React, { createContext, useState } from 'react';

export const NavbarContext = createContext();

const NavbarContextProvider = ({ children }) => {
    const [navState, setNavState] = useState(false);

    return (
        <NavbarContext.Provider value={{ navState, setNavState }}>
            {children}
        </NavbarContext.Provider>
    );    
}

export default NavbarContextProvider; 