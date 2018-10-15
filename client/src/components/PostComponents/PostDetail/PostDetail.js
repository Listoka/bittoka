import React, { Component } from "react";
import TipButton from '../../../components/TipButton';
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom';
import AuthUserContext from "../../AuthUserSession/AuthUserContext";
import API from '../../../utils/API'
import './postDetail.css'

export class PostDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            body: props.body,
            _id: props._id,
            title: props.title,
            teaser: props.teaser,
            authorName: props.authorName,
            categoryName: props.categoryName,
            author: props.author,
            upvotes: 0,
            upvoteList: []
        };
    }

    afterPayment = (trans) => {
        console.log(trans)
        API.upvotePost(this.state._id).then(result => {

        })
    };

    render() {
        return (
            <React.Fragment>
                <br />

                {/* TODO: refactor edit button into its own component using withAuthorization */}
                <AuthUserContext.Consumer>
                    {
                        authUser => {
                            if (authUser && authUser.dbUser._id === this.props.author) {
                                return (
                                    <Link to={{ pathname: `/posts/${this.props._id}/edit` }}>
                                        <i className="far fa-edit">
                                            Edit Post</i>
                                    </Link>
                                )
                            }
                        }
                    }
                </AuthUserContext.Consumer>
                <h2>{this.props.title}</h2>
                <p>By: <Link to={{ pathname: `/user/${this.props.author}` }}>{this.props.authorName}</Link></p>
                <div className='postBody'>
                    <React.Fragment>
                        {this.props.body ? renderHTML(this.props.body) : null}
                    </React.Fragment>
                </div>
                <div className='container'>
                    <div className='row'>
                        <TipButton
                            minTipAmt='.03'
                            tipMessage='UPVOTE'
                            paymentSuccessCbk={this.afterPayment}
                            label='Upvote'
                            payeeId={this.props.author}
                        />
                        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-6' >
                            <h5>Upvotes: {this.state.upvotes}</h5>
                            {this.state.upvoteList ? this.state.upvoteList.map(user => <p>{user.username}</p>) : null}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };
};