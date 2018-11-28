import React from "react";
import { MainWrapper, Button, Input } from '../../components/Widgets/index';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ProfileViewConductor } from './';
import ListokaMoneyButton from "../../components/ListokaMoneyButton";
import AuthUserContext from "../../components/AuthUserSession/AuthUserContext";

export const ProfilePage = props => (

  <div className='absolute w-full'>
    <div className='w-full flex mx-0'>   

      <MainWrapper styles='w-2/3'>
      <div className= 'mb-20px ml-10px pl-40px py-40px rounded-8px bg-darkest-gray'>
        <div className={'m-2 px-2 pb-2'}>
          <h1>{props.authorName}</h1>
        </div> 
        <div className={'m-2 px-2 pb-2 flex text-left'}>
          <p className='flex-1/3 text-left text-white'>Total paid {props.payees[0].to}</p>
          <p className='flex-1/3 ml-40px text-left text-white'>Total earned {props.payees[0].to}</p>
        </div>
        <Button className='btn btn-primary btn-primary:hover' text={'View Posts'} onClick={(e) => props.switchView(e, 'POSTS')} />
        <Button className='btn btn-primary btn-primary:hover' text={'View Comments'} onClick={(e) => props.switchView(e, 'COMMENTS')} />
      </div>
        <ProfileViewConductor
          userPosts={props.userPosts}
          userComments={props.userComments}
          currentView={props.currentView}
        />
      </MainWrapper>  

      <MainWrapper styles='w-1/3'>
        <div className='mr-10px'>
          <Sidebar>
            <h4 className='mb-10px'>Bio</h4>
            <p>{props.displayedBio}</p>
          </Sidebar>

          <Sidebar>
            <div>
              <h4 className='mb-20px'>Leave a tip</h4>
                  <Input
                    onChange={props.handleTipChange}
                    type='number'
                    step='0.01'
                    min='0.10'
                    className='input input:focus input:disabled w-full text-h6f'
                    value={props.tipAmt}
                    placeholder='.00'
                    name='tipAmt'
                  />

              <div className='flex justify-center mb-20px'>
                  <Button 
                    className='btn btn-primary btn-primary:hover -ml-20px w-120' 
                    onClick={props.handleTipSubmit} 
                    text='Update tip'
                  />
              </div>

              <div className='flex justify-center'>
                <div className='w-3/4 mx-auto'>
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
              </div>

            </div>
          </Sidebar>
        </div>        
      </MainWrapper>
    </div>
  </div>
);
