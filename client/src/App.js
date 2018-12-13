//React
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//JSON file and navigation
import { Nav } from './components/Nav';
import categories from './categories.json';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: categories,
    };
  };

  render() {
    return (
      <Router>
        <div>
          <Nav openModal={this.openModal} />
          <Switch>
            <Route exact path='/' component={MainPageContainer} />
            <Route exact path='/categories/:categoryName' component={MainPageContainer} />
            <Route exact path='/categories/:categoryName/posts/new' component={EditorPageContainer} />
            <Route exact path='/posts/:postId' component={PostDetailPage} />
            <Route exact path='/posts/:postId/edit' component={EditorPageContainer} />
            <Route exact path='/account' component={AccountContainer} />
            <Route exact path='/users/:id' component={ProfileContainer} />
            <Route exact path='/editor' component={EditorPageContainer} />
            <Route exact path='/editor/:postId' component={EditorPageContainer} />
            <Route exact path='/(authtest|postman)' component={authTest} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default withAuthentication(withModals(App));
