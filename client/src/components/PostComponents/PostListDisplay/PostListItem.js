import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from '../../AuthUserSession/AuthUserContext';
import Moment from 'react-moment';
import { EditButton } from '../../Widgets/EditButton';

export const PostListItem = props => {
  return (
    <div className='listItem card' id={props._id}>
      <div className='post-body'>
        <div className='clearfix'>
          <span>
            <div className='infoContainers'>
                <h4 className='infoContainers'><Link to={{ pathname: `/posts/${props._id}` }}>{props.title}</Link></h4>
                <div className='inline'>
                  <ul className='tagList '>
                    {props.tags.sort().map(tags => (
                      <li key={tags}>#<span className='mr-1'></span>{tags}</li>
                    ))}
                  </ul>
                </div>
                <p className='post-subtitle'>Posted by: <Link to={{ pathname: `/users/${props.author}`}}> {props.authorName}</Link> in <Link to={`/categories/${props.categoryName}`}><span className={`${props.categoryName}Flair flair`}>{props.categoryName}</span></Link></p>
            </div>
            <p className='post-text'>{props.teaser}</p>
          </span>
        </div>

        <div className='clearfix'>
          <div className='infoContainers'>
            <p className='smallPostText'><Link to={{ pathname: `/posts/${props._id}` }}><i className="fas fa-comments-dollar"></i><span className='mr-2'></span>{props.comments.length}<span className='mr-1'></span></Link></p>
            <p className='smallPostText'><i className="fas fa-arrow-up"></i><span className='mr-1'></span>{props.voters.length}<span className='mr-2'></span></p>
            <p className='smallPostText'><i className="fab fa-bitcoin"></i><span className='mr-1'></span>$0.75<span className='mr-2'></span></p>
            <p className='smallPostText'><i className="fas fa-calendar-alt"></i><span className='mr-1'></span><Moment fromNow>{props.createdAt}</Moment><span className='mr-2'></span></p>
          </div>

            <div className="float-right">
              <AuthUserContext.Consumer>
                {
                  authUser => {
                    if (!!authUser && authUser.dbUser._id === props.author) {
                      return (
                        <span className="edit-btn-float-right">
                          <Link to={{ pathname: `/posts/${props._id}/edit` }}>
                            <EditButton 
                              text='Edit Post'
                            />
                          </Link>
                        </span>
                      )
                    }
                  }
                }
              </AuthUserContext.Consumer>
            </div>
        </div>
      </div>
    </div>
  );
};