//React
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Nav
import { Nav } from './components/Nav';
import SubNav from './components/subNav';

// "Pages"
import EditorPageContainer from './pages/Editor/EditorPageContainer';
import NoMatch from './pages/NoMatch';
import AccountContainer from './pages/Account';
import MainPageContainer from './pages/Main/MainPageContainer';
import PostDetailPage from './pages/Content/PostDetailPage';
import { ProfileContainer } from './pages/Profile/ProfileContainer';
import authTest from './pages/AUTH-TEST';

// Higher Order Components
import withAuthentication from './components/AuthUserSession/withAuthentication';
import withModals from './components/Modals/withModals'
import API from './utils/API';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  };

  componentDidMount() {
    console.log('App componentDidMount!')
    API.getCategories()
      .then(categories => this.setState({ categories }))
      .catch(err => console.log('App getCategories ERR: ', err))
  }

  render() {
    console.log('App state: ', this.state)
    return (
      <Router>
        <div>
          <Nav openModal={this.openModal} />

          {/* Category Navigation */}
          <Route
            exact
            path={['/', '/categories/:categoryName', '/posts/:postId']}
            render={props => <SubNav {...props} categories={this.state.categories} />}
          />

          {/* Page Routes */}
          <Switch>
            <Route
              exact
              path={['/', '/categories/:categoryName']}
              render={props => <MainPageContainer {...props} categories={this.state.categories} />}
            />
            <Route
              exact
              path={['/editor', '/editor/:postId', '/posts/:postId/edit', '/categories/:categoryName/posts/new']}
              render={props => <EditorPageContainer {...props} categories={this.state.categories} />}
            />
            <Route exact path='/posts/:postId' component={PostDetailPage} />
            <Route exact path='/account' component={AccountContainer} />
            <Route exact path='/users/:id' component={ProfileContainer} />
            <Route exact path='/(authtest|postman)' component={authTest} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default withAuthentication(withModals(App));
