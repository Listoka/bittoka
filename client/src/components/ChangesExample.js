import React from "react";
import { Link } from 'react-router-dom';

export const CreatePostButton = props => {
    return (
        <button className="btn btn-success"><Link to={{pathname:'/createpost', state:{categoryName: props.categoryName}}}>Submit</Link></button>
    );
};