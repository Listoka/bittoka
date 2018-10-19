import React, { Component } from 'react'
import axios from '../../utils/authAxios'
import MoneyButton from '@moneybutton/react-money-button'
import API from '../../utils/API'

const listokaCut = .01
const listokaAcctNum = '783' // FIXME: Put in secure place (read from db?)

class ListokaMoneyButton extends Component {
    state = {
        payees: []
    }

    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        axios.get(`/api/users/id/${this.props.payeeId}`).then(result => {
            console.log('payee:' + this.props.payeeId)
            console.log('payee mb id: ' + result.data.moneyBtnId)
            console.log(result)
            this.setState({
                payees: [{
                    to: result.data.moneyBtnId,
                    amount: this.props.payVal - listokaCut,
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
        const txDetails = {
            userId: this.props.userId,
            paidUserId: this.props.payeeId,
            txFrom: trans.userId,
            txType: this.props.txType,
            txOutputs: [{ moneyButtonId: trans.outputs[0].to, amount: trans.outputs[0].amount }, 
                        { moneyButtonId: trans.outputs[1].to, amount: trans.outputs[1].amount } ],
            commentId: this.props.commentId || null,
            postId: this.props.postId || null
        }
        API.createTransaction(txDetails).then( result => {
            console.log('tx log result: ' + JSON.stringify(result))
            this.props.paymentSuccessCbk(trans)
        })
        
    }

    render() {
        return ( 
            <div>
                {(this.state.payees && this.state.payees.length > 0) ? 
            <MoneyButton
                outputs={this.state.payees}
                type='tip'
                label={this.props.label}
                onPayment={this.logPayment}
                onError={this.handleError}
            />
            :
            <p>MoneyButton loading...</p>
            }
            </div>
        )
    }
}

export default ListokaMoneyButton