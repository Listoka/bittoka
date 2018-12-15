import React from 'react'
import TransactionList from './TransactionList'
import API from '../../utils/API';

class TransactionListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      limit: 10,
      transactions: []
    }
  }

  componentDidMount() {
    const userId = this.props.userId
    const { page, limit } = this.state

    if (!userId) return

    this.fetchTxAll(userId, page, limit)
      .then(tx => this.setState({ transactions: tx }))
  }

  // fetchTxFrom(userId) {
  //   return API.getTxFromUser(userId)
  //     .then(result => result.data)
  //     .catch(err => console.log('fetchTxFrom ERR: ', err))
  // }

  // fetchTxTo(userId) {
  //   return API.getTxToUser(userId)
  //     .then(result => result.data)
  //     .catch(err => console.log('fetchTxTo ERR: ', err))
  // }

  fetchTxAll = (userId, page, limit) => {
    return API.getAllTx(userId, { page, limit })
      .then(result => result.data)
      .catch(err => console.log('fetchTxAll ERR: ', err))
  }

  fetchNextPage = () => {
    let { page, limit } = this.state
    page++

    return API.getAllTx(this.props.userId, { page, limit })
      .then(result => {
        this.setState({
          transactions: [...this.state.transactions, ...result.data],
          page
        })
      })
      .catch(err => console.log('fetchNextPage ERR: ', err))
  }

  render() {
    console.log('TransactionListContainer Txns:', this.state.transactions)
    return (
      <TransactionList
      />
    )
  }
}

export default TransactionListContainer