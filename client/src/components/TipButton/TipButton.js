import React, { Component } from 'react'
import withAuthorization from '../../components/AuthUserSession/withAuthorization';

import MoneyButton from '@moneybutton/react-money-button'

const listokaCut = .01
const listokaAcctNum = '588' // FIXME: Put in secure place (read from db?)

class TipButton extends Component {
    state = {
        payees: []
    }

    getPayees = (id) => {
        this.props.authUser.requestWithAuth('get', `/api/users/id/${id}`).then( result => {
            this.setState({
                payees: [{
                    to: result.data.moneyBtnId,
                    amount: (this.props.paymentAmt - listokaCut),
                    currency: 'USD'
                },
                {
                    to: listokaAcctNum,
                    amount: listokaCut,
                    currency: 'USD'
                }]
            })
            console.log(result.data)
            console.log('payees: ' + JSON.stringify(this.state.payees))
        }
        )
    }

    constructor(props) {
        super(props)
        //this.req = props.requestWithAuth
        this.state.payees = []
        this.getPayees(this.props.payeeId)
        console.log('props: ' + JSON.stringify(props))
        console.log('payment: ' + (props.paymentAmt - listokaCut))
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
const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(TipButton);
