import React from 'react'
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext'

const Account = (props) => {
  return (
    <div>
      <p>{JSON.stringify(props.authUser)}</p>
      <AuthUserContext.Consumer>
        {authUser => console.log(authUser)}
      </AuthUserContext.Consumer>
    </div>

  )
}

export default Account