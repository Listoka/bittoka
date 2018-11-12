import React, { Component } from 'react'
import axios from '../../utils/authAxios'
import MoneyButton from '@moneybutton/react-money-button'
import API from '../../utils/API'

const listokaCut = .01
const listokaAcctNum = '783' // FIXME: Put in secure place (read from db?)

class ListokaMoneyButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      payeeMbId: 0
    }
  }

  componentDidMount = () => {
    if (!this.props.payeeId) return
    this.getPayeeMoneyBtnId(this.props.payeeId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.payeeId !== this.props.payeeId) {
      this.getPayeeMoneyBtnId(this.props.payeeId)
    }
  }

  getPayeeMoneyBtnId = payeeId => {
    axios.get(`/api/users/id/${payeeId}`).then(result => {
      console.log('payee:' + payeeId)
      console.log('payee mb id: ' + result.data.moneyBtnId)
      console.log(result)
      this.setState({
        payeeMbId: result.data.moneyBtnId
      })
    })
      .catch(err => console.log('getPayeeMoneyBtnId Err: ', err))

  }

  handleError = err => {
    alert(`MoneyButton transaction failed. ${err}`)
  }

  logPayment = (trans) => {
    console.log('Trans: ' + JSON.stringify(trans))
    const txDetails = {
      userId: this.props.userId,
      paidUserId: this.props.payeeId,
      txFrom: trans.userId,
      txType: this.props.txType,
      txOutputs: [{ moneyButtonId: trans.outputs[0].to, amount: trans.outputs[0].amount },
      { moneyButtonId: trans.outputs[1].to, amount: trans.outputs[1].amount }],
      commentId: this.props.commentId || null,
      postId: this.props.postId || null
    }
    API.createTransaction(txDetails).then(result => {
      console.log('tx log result: ' + JSON.stringify(result))
      this.props.paymentSuccessCbk(trans)
    });
  };

  render() {
    return (
      <React.Fragment>
        {(this.state.payeeMbId) ?
          <MoneyButton
            outputs={[{
              to: this.state.payeeMbId,
              amount: this.props.payVal - listokaCut,
              currency: 'USD'
            },
            {
              to: listokaAcctNum,
              amount: listokaCut,
              currency: 'USD'
            }]}
            type='tip'
            label={this.props.label}
            onPayment={this.logPayment}
            onError={this.handleError}
          />
          :
          <p>MoneyButton loading...</p>
        }
      </React.Fragment>
    )
  }
}

export default ListokaMoneyButton