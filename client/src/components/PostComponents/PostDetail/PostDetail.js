import React, { Component } from "react";
import CommentBox from '../../CommentBox';
import TipButton from '../../../components/TipButton'

export class PostDetail extends Component {

    afterPayment = () => {
        
    }
    render() {
        return (
            <div>
            <br />
            <p>{this.props.title}</p>
            <p>By: {this.props.authorName}</p>
            <p>{this.props.body}</p>
            <TipButton
                payeeId='783'
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
/*
export const PostDetail = (props) => {
    return (
        <div>
            <br />
            <p>{props.title}</p>
            <p>By: {props.authorName}</p>
            <p>{props.body}</p>
            <TipButton
                payeeId='783'
                paymentAmt='.03'
                label='Tip to Upvote'
                paymentSuccessCbk={this.afterPayment}
            />
            <hr />
            <CommentBox />
        </div>
    );
};
*/