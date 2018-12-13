import React from "react";
import API from '../../utils/API';
import AccountPage from '../Account/AccountPage'
import withAuthorization from '../../components/AuthUserSession/withAuthorization';

class AccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      currentView: 'SETTINGS',
      drafts: [],
      id: this.props.authUser.dbUser._id,
      bio: '',
      moneyBtnId: '',
      amtEarned: 0,
      amtPaid: 0,
      showBio: true,
      showMoneyBtnId: true
    }
  }

  componentDidMount() {
    let promises = [this.getPostsAndBio(this.state.id), this.getPostsAndDrafts(this.state.id), this.getTotalPaidToUser(this.state.id), this.getTotalPaidFromUser(this.state.id)]
    Promise.all(promises)
      .then(results => {
        this.setState({
          drafts: results[1].filter(post => post.isDraft),
          userPosts: results[1].filter(post => !post.isDraft),
          bio: results[0].user.bio,
          userName: results[0].user.username,
          moneyBtnId: results[0].user.moneyBtnId,
          amtEarned: (results[2] && results[2].totalPaid.toFixed(2)) || 0,
          amtPaid: (results[3] && results[3].totalPaid.toFixed(2)) || 0
        });
      })
  };

  getPostsAndDrafts = (id) => {
    return API.getPostsAndDrafts(id).then(results => results.data)
  }

  getPostsAndBio = (id) => {
    return API.getPostsAndBio(id).then(results => results.data)
  }

  getTotalPaidToUser = (id) => {
    return API.getTotalPaidToUser(id).then(results => results.data[0])
  }

  getTotalPaidFromUser = (id) => {
    return API.getTotalPaidFromUser(id).then(results => results.data[0])
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleMoneyBtnIdSubmit = (event) => {
    event.preventDefault();
    const data = {
      moneyBtnId: this.state.moneyBtnId,
      bio: this.state.bio
    };
    API.updateProfile(this.state.id, data)
      .then(res => console.log(res.data), this.setState({ showMoneyBtnId: true }))
      .catch(err => console.log(err))
  };

  handleFormSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
    const data = {
      bio: this.state.bio,
      moneyBtnId: this.state.moneyBtnId
    };
    if (this.state.bio.length > 4) {

      API.updateProfile(this.state.id, data)
        .then(res => console.log(res.data), this.setState({ showBio: true }), API.getPostsAndBio(this.state.id))
        .catch(err => console.log(err))
    };
  };

  switchView = (event, viewType) => {
    event.preventDefault();
    this.setState({ currentView: viewType })
  }

  removeDraft = (e, id) => {
    e.preventDefault()
    const drafts = this.state.drafts.filter(d => d._id !== id)
    this.setState({ drafts })
    API.deletePost(id)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  editBio = () => { this.setState(prevState => ({ showBio: !prevState.showBio })) }
  editmoneyBtnId = () => { this.setState(prevState => ({ showMoneyBtnId: !prevState.showMoneyBtnId })) }

  render() {
    return (
      <AccountPage
        {...this.state}
        userId={this.props.authUser.dbUser._id}
        switchView={this.switchView}
        removeDraft={this.removeDraft}
        editBio={this.editBio}
        editmoneyBtnId={this.editmoneyBtnId}
        onChange={this.handleInputChange}
        handleFormSubmit={this.handleFormSubmit}
        handleMoneyBtnIdSubmit={this.handleMoneyBtnIdSubmit}
      />
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AccountContainer);