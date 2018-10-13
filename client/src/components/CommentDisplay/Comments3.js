import React from "react";
import { Link } from 'react-router-dom';

export const Comments = (props) => {
    const createdDate = props.createdAt && props.createdAt.slice(0, 10)
    return (
        <React.Fragment>
           <hr/>
           <p><b>Author:</b> {props.authorName} [earned $x.xx]</p> 
           <p><b>Comment:</b> {props.body}</p>
           <p>[#Upvotes][Upvote MoneyButton Component]</p>
           {/* <p><Link to={{pathname:'/editpage'}}>[Reply <i className="far fa-comment"></i>]</Link>
           [Created on: {createdDate}]</p> */}
        </React.Fragment>
    );
};