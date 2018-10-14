import React, { Component } from "react";
import TipButton from '../../../components/TipButton';
import { Link } from 'react-router-dom';

export class PostDetail extends Component {

    state = {
        tipAmt: 0,
        tipState: 0
    }

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
        };
    }

    htmlDecode = (input) => {
        console.log('htmlDecode input', input)
        const doc = new DOMParser().parseFromString(input, "text/html");
        console.log('htmlDecode doc', doc)
        return doc.documentElement.textContent;
    }

    afterPayment = () => {
        alert("Payment Successful!")
    };

    render() {
        return (
            <React.Fragment>
                <br />
                {/* TODO: make this only show if logged in user is author */}
                <Link to={{ pathname: `/posts/${this.state._id}/edit` }}>
                    <i className="far fa-edit">
                        Edit Post</i>
                </Link>
                <p>{this.props.title}</p>
                <p>By: {this.props.authorName}</p>
                <div>
                    <React.Fragment>
                    {this.props.body}
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