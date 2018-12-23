import React from "react";
import { Button, Input } from '../../components/Widgets/index';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ProfileViewConductor } from './';
import ListokaMoneyButton from "../../components/ListokaMoneyButton";
import AuthUserContext from "../../components/AuthUserSession/AuthUserContext";

export const ProfilePage = props => (

  <div className='absolute w-full mt-5'>
    <div className='container w-full block sm:block md:block lg:flex xl:flex mx-auto'>

      <div className='mr-1 block sm:block md:block lg:w-2/3 xl:w-2/3'>
        <div className='mb-2 p-4 rounded-lg bg-darkest-gray'>
          <div className={'mb-2'}>
            <div className='text-3xl font-header'>{props.authorName}'s Profile</div>
          </div>
          <hr className="border-brand-green border hrModals mb-3"></hr>
          <div className='flex text-left mb-2'>
            <p className='flex-1/3 text-left text-light-gray'>Total paid {props.payees[0].to}</p>
            <p className='flex-1/3 ml-8 text-left text-light-gray'>Total earned {props.payees[0].to}</p>
          </div>
          <Button className='btn btn-primary btn-primary:hover btn-primary:active outline-none ml-0 text-sm' text={'View Posts'} onClick={(e) => props.switchView(e, 'POSTS')} />
          <Button className='btn btn-primary btn-primary:hover btn-primary:active outline-none text-sm ml-1' text={'View Comments'} onClick={(e) => props.switchView(e, 'COMMENTS')} />
        </div>
        <div className='flex flex-col'>
          <ProfileViewConductor
            userComments={props.userComments}
            currentView={props.currentView}
            userId={props.author}
          />
        </div>
      </div>

      <div className='block ml-1 sm:block md:block lg:w-1/3 xl:w-1/3'>

        <Sidebar>
          <h4 className='mb-2 font-normal'>Bio</h4>
          <hr className="border-medium-gray border-2 hrModals mb-2"></hr>
          <p>{props.displayedBio}</p>
        </Sidebar>

        <Sidebar>
          <div>
            <h4 className='mb-5 font-normal'>Leave a tip!</h4>
            <div className="flex items-stretch w-full mb-2 relative">
              <Input
                onChange={props.handleTipChange}
                type='number'
                step='0.01'
                min='0.10'
                className='flex-1 w-full min-w-100px input input:focus input:disabled border text-xs rounded-r-none h-8 relative'
                value={props.tipAmt}
                placeholder='.00'
                name='tipAmt'
              />
              <div className="flex -mr-px">
                <span className="flex-none text-sm h-8 items-center p-2 cursor-pointer whitespace-no-wrap btn btn-primary btn-primary:hover border ml-0 mb-5 rounded-l-none rounded-r mt-0" onClick={props.handleTipSubmit}>Update Tip</span>
              </div>
            </div>
            <AuthUserContext.Consumer>
              {authUser => {
                if (authUser) {
                  return (
                    <React.Fragment>
                      <ListokaMoneyButton
                        payVal={props.payVal}
                        payeeId={props.author}
                        userId={authUser.dbUser._id}
                        txType='tip'
                        label={`Tip`}
                        paymentSuccessCbk={props.afterPayment}
                        onError={props.handleError}
                      />
                    </React.Fragment>
                  )
                }
              }
              }
            </AuthUserContext.Consumer>
          </div>
        </Sidebar>

      </div>
    </div>
  </div>
);
