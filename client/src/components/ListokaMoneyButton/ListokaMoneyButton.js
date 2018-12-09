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
      payeeMbId: 0,
      batch: false
    }
  }

  componentDidMount = () => {
    const { payeeId, payeeArray } = this.props

    // if we get an array, we're going to make some assumptions about what it looks like...
    // namely, we're going to assume that we get an array of objects from the CommentListContainer
    // that looks like [{ commentId, authorName, authorId, moneyBtnId, cost }, ... ]
    if (payeeArray && (typeof payeeArray === 'object') && (payeeArray.length !== undefined)) {
      this.setState({ batch: true })
      return
    }

    if (!payeeId) return
    this.getPayeeMoneyBtnId(payeeId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.payeeId !== this.props.payeeId) {
      this.getPayeeMoneyBtnId(this.props.payeeId)
    }
  }

  getPayeeMoneyBtnId = payeeId => {
    axios.get(`/api/users/id/${payeeId}`).then(result => {
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

  // this currently only supports batch comment voting, which is fine for now,
  // because that's the only kind of batch purchase we currently support
  logBatchPayment = (trans) => {
    console.log('Batch Transaction: ', trans)
    const txDetails = {
      batch: true,
      userId: this.props.userId,
      txFrom: trans.userId, // originating moneyBtnId
      txType: this.props.txType,
      txOutputs: trans.outputs.map(t => ({ moneyButtonId: t.to, amount: t.amount })),
      commentList: this.props.payeeArray.map(t => ({ userId: t.authorId, commentId: t.commentId }))
    }

    API.createTransaction(txDetails).then(result => {
      const cbk = this.props.paymentSuccessCbk
      console.log('batch tx log result: ', result)
      if (cbk && typeof cbk === 'function') {
        cbk(trans)
      }
    })
  }

  render() {
    let outputs

    if (this.state.batch) {
      outputs = this.props.payeeArray.map(obj => {
        const { moneyBtnId } = obj
        return {
          to: moneyBtnId,
          amount: this.props.payVal - listokaCut,
          currency: 'USD'
        }
      })
    } else {
      outputs = [{
        to: this.state.payeeMbId,
        amount: this.props.payVal - listokaCut,
        currency: 'USD'
      }]
    }

    let listokaOutput = {
      to: listokaAcctNum,
      amount: listokaCut * outputs.length,
      currency: 'USD'
    }

    outputs = [...outputs, listokaOutput]

    return (
      <React.Fragment>
        {(this.state.payeeMbId || (this.state.batch && outputs.length > 1)) ?
          <MoneyButton
            outputs={outputs}
            type='tip'
            label={this.props.label}
            onPayment={this.state.batch ? this.logBatchPayment : this.logPayment}
            onError={this.handleError}
            devMode={this.props.devMode}
          />
          :
          <p>MoneyButton loading...</p>
        }
      </React.Fragment>
    )
  }
}

export default ListokaMoneyButton