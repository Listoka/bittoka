import React, { Component } from 'react'
import axios from '../../utils/authAxios'
import { Input, FormBtn } from '../PostComponents/PostForm'
import MoneyButton from '@moneybutton/react-money-button'
import './TipButton.css'

const listokaCut = .01
const listokaAcctNum = '588' // FIXME: Put in secure place (read from db?)

class TipButton extends Component {
    state = {
        payees: [{ amount: 0 }],
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
        this.setState({ tipState: evt.target.value })
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
            
            <div className='card col-lg-3 col-md-4 col-sm-6 col-xs-6'>
                <div className='card-body'>
                    <div className='card-title'>
                        {this.props.tipMessage}
                    </div>
                    <div className='card-text'>
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
                                <p> (minimum {this.props.minTipAmt}): </p>

                                <Input
                                    onChange={this.handleTipChange}
                                    className='form-control'
                                    type='text'
                                    style={{ width: 80 + 'px' }}
                                />
                                <FormBtn
                                    onClick={this.handleTipSubmit}
                                >Submit</FormBtn>
                                    
                        

                            </div>

                        )}
                    </div>
                </div>
            </div>
            

        )
    }
}
export default TipButton
