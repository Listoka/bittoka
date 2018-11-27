import React from "react";
import { MainWrapper, Button, BitcoinIcon, Input } from '../../components/Widgets/index';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ProfileViewConductor } from './';
import ListokaMoneyButton from "../../components/ListokaMoneyButton";
import AuthUserContext from "../../components/AuthUserSession/AuthUserContext";

export const ProfilePage = props => (

  <div className='absolute w-full'>
    <div className='w-full flex mx-0'>
      <MainWrapper styles='w-2/3'>
      <div className= 'mb-20px rounded bg-darkest-gray'>
        <div className={'m-2 px-2 pb-2'}>
          <h1>{props.authorName}</h1>
        </div> 
        <div className={'m-2 px-2 pb-2 flex'}>

          <div className='w-2/5'>
            <div className='w-2/3 mr-10px'>
              <p className='inline-block text-white'>Money button number</p>
            </div>
            <div className='w-1/3'>
              <input className='text-center text-white focus:input-active' id='moneybuttonID' type='text' placeholder={props.payees[0].to}></input>
            </div>
          </div>

          <p className='w-2/5 text-left text-white'>Total paid {props.payees[0].to}</p>

          <p className='w-1/5 text-left text-white'>Total earned {props.payees[0].to}</p>
        </div>
      </div>
        <Button text={'View Posts'} onClick={(e) => props.switchView(e, 'POSTS')} />
        <Button text={'View Comments'} onClick={(e) => props.switchView(e, 'COMMENTS')} />
        <ProfileViewConductor
          userPosts={props.userPosts}
          userComments={props.userComments}
          currentView={props.currentView}
        />
      </MainWrapper>
      <MainWrapper styles='w-1/3'>
        <Sidebar>
          <h2>Bio</h2>
          <hr className='h-px' />
          <p>{props.displayedBio}</p>
          <hr />
          <div>
            <h6 className='uppercase font-bold pb-3'>Leave {props.authorName} a tip! <BitcoinIcon /></h6>
            <div className='flex'>
              <Input
                onChange={props.handleTipChange}
                type='number'
                step='0.01'
                min='0.10'
                className='form-control customTipField'
                style={{ width: 180 + 'px' }}
                value={props.tipAmt}
                placeholder='.00'
                name='tipAmt'
              />
              <div className='mb-10px mt-1'>
                <Button onClick={props.handleTipSubmit} text='Update Tip' styles={'text-sm'} />
              </div>
            </div>
            <div className='mt-2'>
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
                        <hr />
                      </React.Fragment>
                    )
                  }
                }
                }
              </AuthUserContext.Consumer>
            </div>
          </div>
        </Sidebar>
      </MainWrapper>
    </div>
  </div>

);
