import React, { Component } from "react";
//import TipButton from '../../../components/TipButton';
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom';
import AuthUserContext from "../../AuthUserSession/AuthUserContext";
import API from '../../../utils/API'
import './postDetail.css'
import ListokaMoneyButton from "../../ListokaMoneyButton";

export class PostDetail extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        body: this.props.body,
        _id: this.props._id,
        title: this.props.title,
        teaser: this.props.teaser,
        authorName: this.props.authorName,
        categoryName: this.props.categoryName,
        author: this.props.author,
        upvotes: this.props.voters ? this.props.voters.length : 0,
        upvoteList: this.props.voters || [],
        purchasers: this.props.purchasers || []
    };

    afterUpvotePayment = (trans) => {
        console.log('Last transaction' + JSON.stringify(trans))
        API.upvotePost(this.state._id).then(result => {
            console.log('After upvote: ' + JSON.stringify(result))
            let voteNames = []
            result.data.voters.map(voterRec => { voteNames.push(voterRec) })
            this.setState({
                upvotes: result.data.voters.length,
                upvoteList: voteNames
            })
        })
    };

    afterPurchasePayment = (trans) => {
        console.log('purchase trans: ' + JSON.stringify(trans))
        API.purchasePost(this.state._id).then(result => {
            console.log('After purchase success: ' + JSON.stringify(result))
            this.setState({
                purchasers: result.data.purchasers
            });
        });
    };

    render() {
        return (
            <React.Fragment>
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
                <div className='row'>
                    <div className='col-lg-8'>
                        <h2>{this.props.title}</h2>
                        <p>By: <Link to={{ pathname: `/users/${this.props.author}` }}>{this.props.authorName}</Link> in <Link to={`/categories/${this.props.categoryName}`}><span className={`${this.props.categoryName}Flair flair`}>{this.props.categoryName}</span></Link> <i class="fas fa-arrow-up"></i> {this.state.upvotes}</p>
                    </div>
                    <AuthUserContext.Consumer>
                        {authUser => {
                            if (authUser) {
                                // Don't allow user to upvote more than once
                                if (this.state.upvoteList.find(voter => voter._id === authUser.dbUser._id)) {
                                    return (
                                        <p className='col-lg-3 col-md-4 col-sm-6 col-xs-6'>You have already upvoted this article.  You may only upvote once.</p>
                                    )
                                } else {
                                    return (
                                        <ListokaMoneyButton
                                            payVal='.03'
                                            paymentSuccessCbk={this.afterUpvotePayment}
                                            label='Upvote'
                                            payeeId={this.props.author}
                                            userId={authUser.dbUser._id}
                                            txType='post-vote'
                                            postId={this.state._id}
                                        />
                                    )
                                }
                            } else {
                                return (
                                    <p className='col-lg-3 col-md-4 col-sm-6 col-xs-6'>You must be logged in to upvote.</p>
                                )
                            }
                        }}
                    </AuthUserContext.Consumer>
                </div>
                <AuthUserContext.Consumer>

                    {
                        authUser => {
                            if (authUser) {
                                // If I am the author or I am a purchaser, display the body and offer an upvote
                                // Otherwise, offer the teaser and a purchase button
                                return (authUser.dbUser._id === this.props.author ||
                                    this.state.purchasers.find(purchaser => purchaser._id === authUser.dbUser._id) ?
                                    <React.Fragment>
                                        <div className='postBody'>
                                            <React.Fragment>
                                                {this.props.body ? renderHTML(this.props.body) : null}
                                            </React.Fragment>
                                        </div>
                                        <div className='container'>
                                            <div className='row'>


                                                {/*<div className='col-lg-3 col-md-4 col-sm-6 col-xs-6' >
                                                    <h5><i class="fas fa-arrow-up"></i> {this.state.upvotes}</h5>
                                                    <ul>
                                                        {this.state.upvoteList.map(user => <li key={user._id}>{user.username}</li>)}
                                                    </ul>
                                                </div>*/}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <div className='postBody'>
                                            {this.props.teaser || null}
                                        </div>
                                    </React.Fragment>
                                )
                            }
                            else {
                                // If no one is logged in, just return the teaser
                                return (
                                    <p>{this.props.teaser || null}</p>
                                )
                            }

                        }
                    }
                </AuthUserContext.Consumer>
            </React.Fragment >
        );
    };
};