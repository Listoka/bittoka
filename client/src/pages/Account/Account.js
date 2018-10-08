import React, { Component } from "react";
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import API from '../../utils/API';
import './account.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userPosts: [],
        userName: props.authUser.dbUser.username
    };
  }
  componentDidMount() {
    // this.getPosts();
  }

  getPosts = () => {
    API.getUserPosts().then(results => {
      console.log(results.data);
      this.setState({ userPosts: results.data })
    });
  };

  render() {
      return (
        <div className='pagebody'>
            <div className='row'>
            {/* <p>{JSON.stringify(props.authUser)}</p> */}
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
              <div className="categoryDetail">
                {this.state.userName}
                <AuthUserContext.Consumer>
                    {authUser => {console.log('authUser: ', authUser)}}
                </AuthUserContext.Consumer>
              </div>
            </div>
            <div className='col-lg-2'></div>
            </div>
        </div>
      );
  };
};
const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(Account);