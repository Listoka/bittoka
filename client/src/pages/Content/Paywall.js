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
              <p className='pl-1 my-4'>{props.teaser}</p>
              <hr className="mx-1 border-brand-green border-2 hrModals"></hr>
              <div className='pl-1'>
                <p className='text-xs'>You must log in to purchase the rest of this content.</p>
              </div>
            </React.Fragment>
          )
        }

        // TODO: Figure out a way to generalize this authorized check
        let purchasers = props.purchasers || []
        let authorized = (authUser.dbUser._id === props.author) || purchasers.includes(authUser.dbUser._id)

        // if the current user is authorized to view 
        if (authorized) {
          return props.children
        }

        return (
          <div className='font-body text-base'>
            <p className='pl-1 my-4'>{props.teaser}</p>
            <hr className="mx-1 border-brand-green border-2 hrModals"></hr>
            <div className='pl-1'>
              <p className='text-xs mb-2'>Complete Payment to unlock this content.</p>
              {/* and purchase button */}
              <div className='flex'>
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