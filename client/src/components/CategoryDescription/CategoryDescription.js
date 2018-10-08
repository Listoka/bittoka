import React from 'react';
import './categoryDescription.css';

const CategoryDescription = props => {
    return (
        <div className='container categoryDescription'>
        <h2>{props.displayName}</h2>
            <p>{props.description}</p>
            <hr></hr>
        </div>
    );
};

export default CategoryDescription;