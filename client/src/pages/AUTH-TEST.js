import React from 'react'
import withAuthorization from '../components/AuthUserSession/withAuthorization'

class AuthTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: null,
      requestWithAuth: props.authUser.requestWithAuth
    }
  }
  getPosts = () => {
    this.state.requestWithAuth('get', '/api/posts', null)
      .then(response => console.log(response))
  }

  render() {
    return (
      <button onClick={this.getPosts}>GET</button>
    )
  }

}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AuthTest)