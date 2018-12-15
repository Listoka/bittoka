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
    let promises = [
      this.getPostsAndBio(this.state.id),
      this.getPostsAndDrafts(this.state.id),
      this.getTotalPaidToUser(this.state.id),
      this.getTotalPaidFromUser(this.state.id)
    ]

    Promise.all(promises)
      .then(results => {
        console.log('Account Promises Result: ', results)
        this.setState({
          drafts: results[1].filter(post => post.isDraft),
          userPosts: results[1].filter(post => !post.isDraft),
          bio: results[0].user.bio,
          userName: results[0].user.username,
          moneyBtnId: results[0].user.moneyBtnId,
          amtEarned: (results[2] && results[2].toFixed(2)) || 0,
          amtPaid: (results[3] && results[3].toFixed(2)) || 0
        });
      })
  };

  getPostsAndDrafts = (id) => {
    return API.getPostsAndDrafts(id).then(results => results.data)
  }

  getPostsAndBio = (id) => {
    return API.getPostsAndBio(id).then(results => results.data)
  }

  // TODO: Ended up cleaning the response object up in the API util file, so this isn't really necessary
  // leaving it for now though, because that is not how we do it anywhere else, and we should probably
  // make a consistent decsion one way or the other..
  getTotalPaidToUser = (id) => API.getTotalPaidToUser(id)
  getTotalPaidFromUser = (id) => API.getTotalPaidFromUser(id)

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
    console.log('handleFormSubmit this.state:', this.state);
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
      .then(res => console.log('removeDraft response: ', res))
      .catch(err => console.log('removeDraft ERR: ', err))
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