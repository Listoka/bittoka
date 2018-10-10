import React, { Component } from 'react'
import MoneyButton from '@moneybutton/react-money-button'

const listokaCut = .01
const listokaAcctNum = '588' // FIXME: Put in secure place (read from db?)

class TipButton extends Component {
    state = {
        payees: []
    }
    constructor(props) {
        super(props)
        this.state.payees = [{
            to: props.payeeId,
            amount: (props.paymentAmt - listokaCut),
            currency: 'USD'
        },
        {
            to: listokaAcctNum,
            amount: listokaCut,
            currency: 'USD'
        }]
        console.log('props: ' + JSON.stringify(props))
        console.log('payment: ' + (props.paymentAmt - listokaCut))
        console.log('payees: ' + JSON.stringify(this.state.payees))
    }

    handleError = err => {
        alert(`MoneyButton transaction failed. Error: ${err}`)
    }

    render() {
        return (
            <MoneyButton
                outputs={this.state.payees}
                type='tip'
                label={this.props.label}
                onPayment={this.props.paymentSuccessCbk}
                onError={this.handleError}
            />
        )
    }
}

export default TipButton