import React from 'react'
import API from '../../utils/API';

class TransactionListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const userId = this.props.userId
    if (!userId) return

    Promise.all([this.fetchTxFrom(userId), this.fetchTxTo(userId)])

  }

  fetchTxFrom(userId) {
    return API.getTxFromUser(userId)
      .then(result => result.data)
      .catch(err => console.log('fetchTxFrom ERR: ', err))
  }

  fetchTxTo(userId) {
    return API.getTxToUser(userId)
      .then(result => result.data)
      .catch(err => console.log('fetchTxTo ERR: ', err))
  }

  fetchTxAll(userId) {

  }

}

export default TransactionListContainer