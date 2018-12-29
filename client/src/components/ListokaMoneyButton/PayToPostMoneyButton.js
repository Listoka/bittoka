import React, { Component } from 'react'
import axios from '../../utils/authAxios'
import MoneyButton from '@moneybutton/react-money-button'
import API from '../../utils/API'

const listokaAcctNum = '783' // FIXME: Put in secure place (read from db?)

class PayToPostMoneyButton extends Component {
  constructor(props) {
    super(props)
  }

  logPayment = (trans) => {
    console.log('Trans: ' + JSON.stringify(trans))
    const txDetails = {
      fromUser: this.props.userId,
      txFrom: trans.userId,
      txType: 'post',
      raw: JSON.stringify(trans),
      txOutputs: trans.outputs.map(t => {
        const script = JSON.parse(t.script)
        return {
          moneyBtnId: t.to,
          amount: t.amount,
          toUser: script.listokaUserId,
          comment: script.commentId,
          post: script.postId,
          isListokaAcct: script.isListokaAcct
        }
      }),
      commentId: this.props.commentId || null,
      postId: this.props.postId || null
    }

    API.createTransaction(txDetails).then(result => {
      console.log('tx log result: ', result)
      this.props.paymentSuccessCbk(trans)
    });
  };

  handleError = err => {
    alert(`MoneyButton transaction failed. ${err}`)
  }

  render() {

    let outputs = [{
      to: listokaAcctNum,
      amount: this.props.costToPost,
      currency: 'USD',
      script: JSON.stringify({ isListokaAcct: true })
    }]

    return (
      <MoneyButton
        outputs={outputs}
        type='tip'
        label='Publish'
        onPayment={this.logPayment}
        onError={this.handleError}
        devMode={this.props.devMode}
      />
    )
  }
}

export default PayToPostMoneyButton