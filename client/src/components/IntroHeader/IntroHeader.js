import React from 'react'
import AuthUserContext from '../AuthUserSession/AuthUserContext'

const IntroHeader = props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => !authUser &&
      <React.Fragment>
        <div className='w-full bg-darkest-gray rounded p-5 mb-5'>
          <div className='text-light-gray text-base'>
            <p className='mb-3 text-3xl font-header text-center'>"Listoka"</p>
              <hr className="border-medium-gray border-2 hrModals mb-3"></hr>
            <p className='mb-3'>Welcome to the writing and entertainment-based platform that enables anyone
              to earn money by contributing useful and/or enjoyable content to the world.</p>
            <p className='mb-3'>On our platform, you will find people earning money for doing a variety of things
              such as telling stories, posting how-to tutorials, spreading bits of wisdom, entertaining,
              and sharing artwork. If it's beneficial to the world, you'll find it here.</p> 
            <p className='mb-3'>For those that contribute, your financial reward is determined by other users of the platform. 
              That is, you will receive varying amounts of Bitcoin ($) from other users when: </p>
            <p>- They vote or comment on your post</p>
            <p>- They pay to view content you've hidden behind a paywall</p>
            <p className='mb-3'>- They simply want to show appreciation for your efforts by tipping you directly.</p> 
            <p className='mb-3'>Enabling contributors to earn money in a direct and instant manner like this is only made
              possible with Bitcoin and the MoneyButton. But do not worry! You do not need to understand
              how it works or anything of that nature. You just go to the MoneyButton website and create an
              account like you would on any other website. Once it is setup and you've created an account on 
              our platform, you can start earning Bitcoin.</p>
            <p className='mb-3'>And to get you started, <span className='text-brand-green'>we're giving away $.25 to any user that posts a Story and shares
              it to our Facebook or Twitter account.</span> You can post a personal story, a fictional story,
              or your Bitcoin story. The choice is yours!</p>
              <hr className="border-medium-gray border-2 hrModals"></hr>
            <p className='mb-6'>If you have further questions, we encourage you to visit our FAQ page or contact us
              over Social Media.</p>
            <p className='mb-6'>We hope you like our platform!</p>
            <p>The Listoka Team</p>
          </div>
        </div>
      </React.Fragment>}
    </AuthUserContext.Consumer>
  )
}

export default IntroHeader