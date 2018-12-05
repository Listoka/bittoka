import React from "react";
import { MainWrapper, Button, Input } from '../../components/Widgets/index';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ProfileViewConductor } from './';
import ListokaMoneyButton from "../../components/ListokaMoneyButton";
import AuthUserContext from "../../components/AuthUserSession/AuthUserContext";

export const ProfilePage = props => (

  <div className='absolute w-full'>
    <div className='w-full flex flex-wrap container mx-auto -mx-10px'>

      <MainWrapper styles='w-2/3'>
        <div className='mb-20px ml-10px p-40px rounded-8px bg-darkest-gray'>
          <div className={'m-2 px-2 pb-2'}>
            <h1>{props.authorName}</h1>
          </div>
          <div className={'m-2 px-2 pb-2 flex text-left'}>
            <p className='flex-1/3 text-left text-white'>Total paid {props.payees[0].to}</p>
            <p className='flex-1/3 ml-40px text-left text-white'>Total earned {props.payees[0].to}</p>
          </div>
          <Button className='btn btn-primary btn-primary:hover btn-primary:active outline-none' text={'View Posts'} onClick={(e) => props.switchView(e, 'POSTS')} />
          <Button className='btn btn-primary btn-primary:hover btn-primary:active outline-none' text={'View Comments'} onClick={(e) => props.switchView(e, 'COMMENTS')} />
        </div>
        <div className='flex flex-col'>
          <ProfileViewConductor
            userPosts={props.userPosts}
            userComments={props.userComments}
            currentView={props.currentView}
          />
        </div>
      </MainWrapper>

      <MainWrapper styles='w-1/3'>
        <div className=''>
          <Sidebar>
            <h4 className='mb-10px'>Bio</h4>
            <p>{props.displayedBio}</p>
          </Sidebar>

          <Sidebar>
            <div>
              <h4 className='mb-20px'>Leave a tip</h4>
              <div className="flex items-stretch w-full mb-4 relative">
                <Input
                  onChange={props.handleTipChange}
                  type='number'
                  step='0.01'
                  min='0.10'
                  className='flex-1 w-full min-w-100px input input:focus input:disabled text-xs rounded-r-none h-10 relative'
                  value={props.tipAmt}
                  placeholder='.00'
                  name='tipAmt'
                />
                <div className="flex -mr-px">
                  <span className="flex-none items-center p-5px whitespace-no-wrap btn btn-primary btn-primary:hover ml-0 mb-20px rounded-l-none rounded-r-4px mt-0" onClick={props.handleTipSubmit}>Update tip</span>
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
      </MainWrapper>
    </div>
  </div>
);
