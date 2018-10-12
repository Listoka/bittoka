import React, { Component } from 'react'
import axios from '../../utils/authAxios'
import  { Input, FormBtn } from '../PostComponents/PostForm'
import MoneyButton from '@moneybutton/react-money-button'

const listokaCut = .01
const listokaAcctNum = '588' // FIXME: Put in secure place (read from db?)

class TipButton extends Component {
    state = {
        payees: [ { amount: 0 }],
        tipState: 0
    }

    getPayees = (id, tipAmt) => {
        axios.get(`/api/users/id/${id}`).then(result => {
            this.setState({
                payees: [{
                    to: result.data.moneyBtnId,
                    amount: this.state.tipState - listokaCut,
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

    handleTipChange = (evt) => {
        this.setState( { tipState: evt.target.value })
    }

    handleTipSubmit = (evt) => {
        evt.preventDefault()
        this.getPayees(this.props.payeeId)
    }

    constructor(props) {
        super(props)
    }

    handleError = err => {
        alert(`MoneyButton transaction failed. Error: ${err}`)
    }

    render() {
        return (
            <div>
                {(this.state.payees[0].amount + listokaCut >= this.props.minTipAmt ?
                    <MoneyButton
                        outputs={this.state.payees}
                        type='tip'
                        label={this.props.label}
                        onPayment={this.props.paymentSuccessCbk}
                        onError={this.handleError}
                    />
                    :
                    <div>
                        <p>{this.props.tipMessage} (minimum {this.props.minTipAmt}): </p>
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
            </div>

        )
    }
}
export default TipButton
