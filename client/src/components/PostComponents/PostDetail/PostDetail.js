import React, { Component } from "react";
import CommentBox from '../../CommentBox';
import TipButton from '../../../components/TipButton'

export class PostDetail extends Component {
    constructor(props) {
        super(props)

    }

    afterPayment = () => {
        alert("Payment Successful!")
    }

    render() {
        return (
            <div>
            <br />
            <p>{this.props.title}</p>
            <p>By: {this.props.authorName}</p>
            <p>{this.props.body}</p>
            <TipButton
                payeeId={this.props.author}
                paymentAmt='.03'
                label='Tip to Upvote'
                paymentSuccessCbk={this.afterPayment}
            />
            <hr />
            <CommentBox />
        </div>            
        )
    }
}
