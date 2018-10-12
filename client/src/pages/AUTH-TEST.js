import React from 'react'
import withAuthorization from '../components/AuthUserSession/withAuthorization'
import axios from '../utils/authAxios'

class AuthTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: null,
      url: '',
      method: 'get',
      data: null
    }
  }

  doRequest = (event) => {
    event.preventDefault()
    let data = JSON.parse(this.state.data)
    console.log(data)
    axios({
      method: this.state.method,
      url: this.state.url,
      data: data
    }).then(response => {
      this.setState({ response })
      console.log(response)
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <form>
        <select name='method' onChange={this.handleChange}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input type='text' name='url' onChange={this.handleChange} placeholder='url' />
        <textarea name='data' value={this.state.data} />
        <input type='submit' onClick={this.doRequest} />
      </form>
    )
  }

}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AuthTest)