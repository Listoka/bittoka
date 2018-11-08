import React from 'react'
import AuthUserContext from '../AuthUserSession/AuthUserContext'

// this is just a placeholder for now

const IntroHeader = props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => !authUser &&
        <div className='w-full bg-grey border-black rounded h-screen px-3 py-16'>
          <h2 className='text-grey-darker text-5xl'>Intro Header</h2>
        </div>}
    </AuthUserContext.Consumer>
  )
}

export default IntroHeader