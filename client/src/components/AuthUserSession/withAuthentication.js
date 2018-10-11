import React from 'react';
import axios from '../../utils/authAxios'

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        dbUser: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          axios.get('/api/users/uid/' + authUser.uid)
            .then(result => this.setState({ authUser: authUser, dbUser: result.data }))
            .catch(err => console.log('withAuthentication ERROR: ', err))
        } else {
          this.setState({ authUser: null, dbUser: null })
        }
      })
    }

    render() {
      const { authUser, dbUser } = this.state;

      if (authUser) {
        authUser.dbUser = dbUser
      }

      return (
        <AuthUserContext.Provider value={authUser} >
          <Component {...this.props} />
        </AuthUserContext.Provider >
      );
    }
  }

export default withAuthentication;