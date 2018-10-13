import React from 'react';
import { Link } from 'react-router-dom';
import './postListItem.css';

export const PostListItem = props => {
    return (

        <div className='listItem card' id={props._id}>
            <div className='post-body'>
                <div className='clearfix'>
                    <span>
                        <div className='infoContainers'>
                            <h4 className='infoContainers'><Link to={{ pathname: `/api/posts/${props._id}` }}>{props.title}</Link></h4>
                            <div className='postMeta'>
                                <ul className='tagList '>
                                    {props.tags.sort().map(tags => (
                                        <li>#&nbsp;{tags}</li>
                                    ))}
                                </ul>
                            </div>
                            <p className='post-subtitle'>Posted by: {props.authorName}</p>
                        </div>
                        <p className='post-text'>{props.body}</p>
                    </span>
                    
                </div>

                <div className='clearfix'>
                    <div className='infoContainers'>
                        <p className='smallPostText'><i class="fas fa-comments-dollar"></i>&nbsp;&nbsp;{props.comments.length} &nbsp;&nbsp;</p>

                        <p className='smallPostText'><i class="fab fa-bitcoin"></i>&nbsp; $1.00 &nbsp;&nbsp;</p>
                    </div>

                    <div className="fltRight">
                        <span className="delete-btn" onClick={(event) => props.handleDeleteButton(event, props._id)}>
                            <i class="far fa-trash-alt"></i>&nbsp;&nbsp; | &nbsp;&nbsp;
                <Link to={{ pathname: '/editpage', state: { body: props.body, _id: props._id, title: props.title, teaser: props.teaser, authorName: props.authorName, categoryName: props.categoryName } }}><i className="far fa-edit"> Edit Post</i></Link>
                        </span>
                    </div>
                </div>
            </div>
        </div >
    );
};