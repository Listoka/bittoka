import React, { Component } from 'react'
import axios from '../../utils/authAxios'
import MoneyButton from '@moneybutton/react-money-button'

const listokaCut = .01
const listokaAcctNum = '588' // FIXME: Put in secure place (read from db?)

class ListokaMoneyButton extends Component {
    state = {
        payees: []
    }

    constructor(props) {
        super(props)
        axios.get(`/api/users/id/${props.payeeId}`).then(result => {
            console.log('payee:' + props.payeeId)
            console.log('payee mb id: ' + result.data.moneyBtnId)
            this.setState({
                payees: [{
                    to: result.data.moneyBtnId,
                    amount: props.payVal - listokaCut,
                    currency: 'USD'
                },
                {
                    to: listokaAcctNum,
                    amount: listokaCut,
                    currency: 'USD'
                }]
            })
        })
    }

    handleError = err => {
        alert(`MoneyButton transaction failed. Error: ${err}`)
    }

    logPayment = (trans) => {
        console.log('Trans: ' + JSON.stringify(trans))
        this.props.paymentSuccessCbk(trans)
    }

    render() {
        return (
            <MoneyButton
                outputs={this.state.payees}
                type='tip'
                label={this.props.label}
                onPayment={this.logPayment}
                onError={this.handleError}
            />
        )
    }
}

export default ListokaMoneyButton