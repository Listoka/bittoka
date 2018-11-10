import React from 'react'
import AuthUserContext from '../../components/AuthUserSession/AuthUserContext'
import ListokaMoneyButton from '../../components/ListokaMoneyButton'

const Paywall = props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        if (!authUser) {
          return (
            <React.Fragment>
              <p>{props.teaser}</p>
              <div className='bg-grey-lighter m-4 p-2'>
                <p className='text-xs text-center m-1'>You must log in to purchase the rest of this content.</p>
              </div>
            </React.Fragment>
          )
        }

        let purchasers = props.purchasers || []
        let authorized = (authUser.dbUser._id === props.author) || purchasers.includes(authUser.dbUser._id)

        // if the current user is authorized to view 
        if (authorized) {
          return props.children
        }

        return (
          <div className='m-2'>
            <p>{props.teaser}</p>
            <div className='bg-grey-lighter m-4 p-2'>
              <p className='text-xs text-center m-1'>Complete Payment to unlock this content.</p>
              {/* and purchase button */}
              <div className='flex justify-center'>
                <ListokaMoneyButton
                  payVal={props.paywallCost}
                  paymentSuccessCbk={props.afterPurchasePayment}
                  label='Purchase Content'
                  payeeId={props.author}
                  userId={authUser.dbUser._id}
                  txType='purchase'
                  postId={props._id}
                />
              </div>
            </div>
          </div>
        )
      }}
    </AuthUserContext.Consumer>
  )
}

export default Paywall