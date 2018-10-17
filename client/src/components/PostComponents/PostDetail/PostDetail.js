import React, { Component } from "react";
import TipButton from '../../../components/TipButton';
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom';
import AuthUserContext from "../../AuthUserSession/AuthUserContext";
import './postDetail.css';

export class PostDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tipAmt: 0,
            tipState: 0
        }
    }

    afterPayment = () => {
        alert("Payment Successful!")
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
                <TipButton
                    minTipAmt='.03'
                    tipMessage='UPVOTE'
                    paymentSuccessCbk={this.afterPayment}
                    label='Upvote'
                    payeeId={this.props.author}
                />
            </React.Fragment>
        );
    };
};