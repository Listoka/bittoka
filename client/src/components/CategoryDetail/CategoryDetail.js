import React from 'react';
import './categoryDetail.css';

const CategoryDetail = ({children}) => {
    return (
        <div className='container-fluid categoryDetail'>
            {children}
        </div>
    );
};

export default CategoryDetail;