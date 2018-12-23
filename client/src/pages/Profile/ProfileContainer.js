import React from "react";
import API from '../../utils/API';
import { ProfilePage } from '../Profile'

const listokaCut = .01
const listokaAcctNum = '588' // FIXME: Put in secure place (read from db?)

export class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.match.params.id,
      currentView: 'POSTS',
      userComments: [],
      payees: [{
        to: listokaAcctNum,
        amount: listokaCut,
        currency: 'USD'
      },
      {
        to: 783,
        amount: .09,
        currency: 'USD'
      }],
      tipAmt: 0,
      labelAmount: .10,
      payVal: .10
    }
  }

  componentDidMount() {
    let promises = [this.getPostsAndBio(this.props.match.params.id)]
    Promise.all(promises)
      .then(results => {
        this.setState({
          // userPosts: results[0].posts,
          displayedBio: results[0].user.bio,
          authorName: results[0].user.username,
          userComments: results[0].comments,
          payees: [{
            to: results[0].user.moneyBtnId,
            amount: this.state.labelAmount - listokaCut,
            currency: 'USD'
          },
          {
            to: listokaAcctNum,
            amount: listokaCut,
            currency: 'USD'
          }]
        });
      })
  }

  getPostsAndBio = (id) => {
    return API.getPostsAndBio(id).then(results => results.data);
  };

  afterPayment = () => {
    alert("Payment Successful!")
  };

  handleError = err => {
    alert(`MoneyButton transaction failed. Error: ${err}`)
  };

  handleTipSubmit = (event) => {
    event.preventDefault();
    //this.getPayees(this.props.match.params.id)
    this.setState({ tipAmt: 0, payVal: this.state.labelAmount })
  };

  handleTipChange = (event) => {
    this.setState({ tipAmt: event.target.value, labelAmount: event.target.value })
  };

  switchView = (event, viewType) => {
    event.preventDefault();
    this.setState({ currentView: viewType })
  }

  render() {
    return (
      <ProfilePage
        {...this.state}
        handleTipChange={this.handleTipChange}
        handleTipSubmit={this.handleTipSubmit}
        handleError={this.handleError}
        afterPayment={this.afterPayment}
        switchView={this.switchView}
      />
    )
  }
}