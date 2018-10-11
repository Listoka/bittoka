import React, { Component } from "react";
import CommentBox from '../../CommentBox';
import TipButton from '../../../components/TipButton'
import  { Input, FormBtn } from '../PostForm'


const minTipAmt = .05

export class PostDetail extends Component {
    state = {
        tipAmt: 0,
        tipState: 0
    }

    constructor(props) {
        super(props)

    }

    afterPayment = () => {
        alert("Payment Successful!")
    }

    handleTipChange = (evt) => {
        this.setState( { tipState: evt.target.value })
    }

    handleTipSubmit = (evt) => {
        evt.preventDefault()
        this.setState( { tipAmt: this.state.tipState })
    }

    render() {
        return (
            <div>
                <br />
                <p>{this.props.title}</p>
                <p>By: {this.props.authorName}</p>
                <p>{this.props.body}</p>
                {(this.state.tipAmt >= minTipAmt ?
                    <TipButton
                        payeeId={this.props.author}
                        paymentAmt={this.state.tipAmt}
                        label='Tip to Upvote'
                        paymentSuccessCbk={this.afterPayment}
                    />
                    :
                    <div>
                    <p>To upvote, enter tip amount (minimum {minTipAmt}): </p>
                    <Input
                        onChange={this.handleTipChange} 
                        className='form-control'
                        />
                    <FormBtn
                        onClick={this.handleTipSubmit}
                    >
                    Submit Tip Amount
                    </FormBtn>
                    </div>
                )}
                <hr />
                <CommentBox />
            </div>
        )
    }
}
