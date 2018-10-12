import React, { Component } from "react";
import CommentBox from '../../CommentBox';
import TipButton from '../../../components/TipButton'

import { Link } from 'react-router-dom';

export class PostDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categoryName: props.categoryName,
            body: props.body,
            _id: props._id,
            title: props.title,
            teaser: props.teaser, 
            authorName: props.authorName, 
            categoryName: props.categoryName,
            tipAmt: 0,
            tipState: 0
        };
    }

    afterPayment = () => {
        alert("Payment Successful!")
    }


    render() {
        return (
            <div>
                <br />
                <Link to={{pathname:'/editpage', state:{categoryName: this.state.categoryName, body: this.state.body, _id: this.state._id, title: this.state.title, teaser: this.state.teaser, authorName: this.state.authorName, categoryName: this.state.categoryName}}}><i className="far fa-edit"> Edit Post</i></Link>
                <p>{this.props.title}</p>
                <p>By: {this.props.authorName}</p>
                <p>{this.props.body}</p>
                <TipButton
                    minTipAmt='.03'
                    tipMessage='To upvote, enter tip amount'
                    paymentSuccessCbk={this.afterPayment}
                    label='Upvote'
                    payeeId={this.props.author}
                />
                <hr />
                <CommentBox />
            </div>
        )
    }
}
