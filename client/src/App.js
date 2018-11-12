//React
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//JSON file and navigation
import { Nav } from './components/Nav';
import categories from './categories.json';
import SubNav from './components/subNav';
import FlexContainer from './components/flexContainer';
// import API from './utils/API';
//Routes
// import Home from './pages/Home';
import Editor from './pages/Editor'
import Content from './pages/Content';
import NoMatch from './pages/NoMatch';
// import * as routes from './constants/routes';
import AccountPage from './pages/Account';
// import MainCategoryPage from './pages/MainCategoryPage';
// import { Profile } from './pages/Profile';
import { ProfileContainer } from './pages/Profile';

import authTest from './pages/AUTH-TEST';

// Auth Helper
import withAuthentication from './components/AuthUserSession/withAuthentication';
import ModalConductor from './components/Modals/ModalConductor'
import MainPageContainer from './pages/Main/MainPageContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: categories,
      currentModal: '',
    };
  };

  openModal = (event, modalName) => {
    event.preventDefault()
    this.setState({ currentModal: modalName })
  }

  closeModal = () => this.setState({ currentModal: '' })

  render() {
    return (
      <Router>
        <div>
          <Nav openModal={this.openModal} />
          <FlexContainer>
            {this.state.categories.map(category => (
              <SubNav
                id={category.id}
                key={category.id}
                href={category.href}
                name={category.name}
              />
            ))}
          </FlexContainer>
          <ModalConductor
            currentModal={this.state.currentModal}
            closeModal={this.closeModal}
          />
          <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route exact path='/' component={MainPageContainer} />
            {/* <Route exact path='/home' component={Home} /> */}
            {/* <Route exact path='/categories/:categoryName' component={MainCategoryPage} /> */}
            <Route exact path='/categories/:categoryName' component={MainPageContainer} />
            <Route exact path='/categories/:categoryName/posts/new' component={Editor} />
            <Route exact path='/posts/:id' component={Content} />
            <Route exact path='/posts/:postId/edit' component={Editor} />
            <Route exact path='/account' component={AccountPage} />
            {/* <Route exact path='/users/:id' component={Profile} /> */}
            <Route exact path='/users/:id' component={ProfileContainer} />
            <Route exact path='/editor' component={Editor} />
            <Route exact path='/(authtest|postman)' component={authTest} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default withAuthentication(App);
