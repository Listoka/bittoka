import React from 'react';
import axios from 'axios'

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        dbUser: null
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          axios({
            method: 'get',
            url: '/api/users/uid/' + authUser.uid
          }).then(dbUser => {
            this.setState({
              authUser: authUser,
              dbUser: dbUser.data
            })
          })
          .then(() => this.serverVerifyToken())
          .catch(err => console.log('withAuthentication ERROR: ', err))
        } else {
          this.setState({
            authUser: null,
            dbUser: null
          })
        }
      })
    }

    serverVerifyToken() {
      firebase.auth.currentUser.getIdToken(/* force refresh */ true)
        .then(idToken => {
          axios({
            method: 'post',
            url: '/api/secret',
            data: { idToken }
          }).then(result => {
            console.log('verify result: ', result)
          })
        })
    }


    render() {
      const { authUser, dbUser } = this.state;

      if (authUser) {
        authUser.dbUser = dbUser
      }

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

export default withAuthentication;