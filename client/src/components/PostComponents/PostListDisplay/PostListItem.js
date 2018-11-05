import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from '../../AuthUserSession/AuthUserContext';
import Moment from 'react-moment';
import { EditButton, BitcoinIcon, CalendarIcon, CommentsDollarIcon, UpArrowIcon, ClearFix, Card, PostBody, Paragraph, UnorderedList, InlineParagraph } from '../../Widgets';

export const PostListItem = props => {
  return (
    <Card>
      <PostBody>
        <ClearFix>
          <span>
            <InlineParagraph styles={'font-header text-2xl'}>
              <Link to={{ pathname: `/posts/${props._id}` }}>{props.title}</Link>
            </InlineParagraph>
            <div className='inline'>
              <UnorderedList styles={'text-grey float-right'}>
                {props.tags.sort().map(tags => (
                  <li key={tags}>#<span className='mr-1'></span>{tags}</li>
                ))}
              </UnorderedList>
            </div>
            <Paragraph styles={'text-sm mb-10px text-grey'} text={'Posted by'}>
              <Link to={{ pathname: `/users/${props.author}`}}> {props.authorName}</Link> in 
              <Link to={`/categories/${props.categoryName}`}>
                <span className={`${props.categoryName}Flair flair`}>{props.categoryName}</span>
              </Link>
            </Paragraph>
            <Paragraph styles={'mb-10px'}>{props.teaser}</Paragraph>
          </span>
        </ClearFix>

        <ClearFix>
            <InlineParagraph>
              <Link to={{ pathname: `/posts/${props._id}` }}>
                <CommentsDollarIcon /><span className='mr-2'></span>{props.comments.length}<span className='mr-1'></span>
              </Link>
            </InlineParagraph>
            <InlineParagraph>
              <UpArrowIcon /><span className='mr-1'></span>{props.voters.length}<span className='mr-2'></span>
            </InlineParagraph>
            <InlineParagraph>
              <BitcoinIcon /><span className='mr-1'></span>$0.75<span className='mr-2'></span>
            </InlineParagraph>
            <InlineParagraph>
              <CalendarIcon /><span className='mr-1'></span><Moment fromNow>{props.createdAt}</Moment><span className='mr-2'></span>
            </InlineParagraph>

            <div className="float-right">
              <AuthUserContext.Consumer>
                {
                  authUser => {
                    if (!!authUser && authUser.dbUser._id === props.author) {
                      return (
                        <Link to={{ pathname: `/posts/${props._id}/edit` }}>
                          <EditButton 
                            text='Edit Post'
                          />
                        </Link>
                      )
                    }
                  }
                }
              </AuthUserContext.Consumer>
            </div>
        </ClearFix>
      </PostBody>
    </Card>
  );
};