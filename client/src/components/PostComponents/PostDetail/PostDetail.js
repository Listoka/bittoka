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
            upvotes: props.voters ? props.voters.length : 0,
            upvoteList: props.voters || [],
            purchasers: props.purchasers || []
        };
        console.log('voters: ' + JSON.stringify(props.voters))
    }

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
            })
        })
    }

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
                <p>By: <Link to={{ pathname: `/users/${this.props.author}` }}>{this.props.authorName}</Link></p>
                <AuthUserContext.Consumer>

                    {
                        authUser => {
                            this.state.purchasers.find(purchaser => authUser.dbUser._id) ?
                                <React.Fragment>
                                    <div className='postBody'>
                                        {this.props.teaser || null}
                                    </div>
                                    <TipButton
                                        minTipAmt={this.props.price}
                                        tipMessage='PURCHASE'
                                        paymentSuccessCbk={this.afterPurchase}
                                        label='Purchase'
                                        payeeId={this.props.author}
                                    />
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <div className='postBody'>
                                        <React.Fragment>
                                            {this.props.body ? renderHTML(this.props.body) : null}
                                        </React.Fragment>
                                    </div>
                                    <div className='container'>
                                        <div className='row'>
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
                                                                <TipButton
                                                                    minTipAmt='.03'
                                                                    tipMessage='UPVOTE'
                                                                    paymentSuccessCbk={this.afterUpvotePayment}
                                                                    label='Upvote'
                                                                    payeeId={this.props.author}
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
                                            <div className='col-lg-3 col-md-4 col-sm-6 col-xs-6' >
                                                <h5>Upvotes: {this.state.upvotes}</h5>
                                                <ul>
                                                    {this.state.upvoteList.map(user => <li key={user._id}>{user.username}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                        }
                    }
                </AuthUserContext.Consumer>
            </React.Fragment>
        );
    };
};