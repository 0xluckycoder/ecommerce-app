import React from 'react';
import styles from './Search.module.scss';

function Search() {
    return (
        <div className={styles.search}>
            <input type="search" placeholder="Search" />
            <i className="fas fa-search"></i>
        </div>
    )
}

export default Search;
