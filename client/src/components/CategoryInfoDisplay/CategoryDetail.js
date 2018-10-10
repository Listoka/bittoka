import React from 'react';
import './categoryDetail.css';

export const CategoryDetail = ({children}) => {
    return (
        <div className='container-fluid categoryDetail rounded'>
            {children}
        </div>
    );
};

// export default CategoryDetail;