//React
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//JSON file and navigation
import {Nav} from './components/Nav';
import categories from './categories.json';
import SubNav from './components/subNav';
import FlexContainer from './components/flexContainer';
import API from './utils/API';
//Routes
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPage from './pages/EditPage';
import Content from './pages/Content';
import Gist from './pages/Gist';
import Join from './pages/Join';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import * as routes from './constants/routes';
import AccountPage from './pages/Account';
import MainCategoryPage from './pages/MainCategoryPage';

import authTest from './pages/AUTH-TEST';

// Auth Helper
import withAuthentication from './components/AuthUserSession/withAuthentication';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      categories: categories,
    };
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });
  
  render(){
    console.log('state: ', this.state)
    return(
      <Router>
        <div>
          <Nav />
          <FlexContainer>
          {this.state.categories.map(category => (
            <SubNav 
            id={category.id}
            key={category.id}
            href={category.href}
            name={category.name}
            // handleCategoryChange={this.handleCategoryChange}
            />
          ))}
          </FlexContainer>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/join' component={Join} />
            <Route exact path='/gist' component={Gist} />
            <Route exact path='/categories/:categoryName' component={MainCategoryPage} />
            <Route exact path='/categories/:categoryName/posts/new' component={CreatePost} />
            <Route exact path='/posts/:id' component={Content} />
            <Route exact path='/posts/:id/edit' component={EditPage} />
            <Route exact path='/account' component={AccountPage} />
            <Route exact path='/authtest' component={authTest} />
            <Route exact path='/postman' component={authTest} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default withAuthentication(App);
