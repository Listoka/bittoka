//React
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//JSON file and navigation
import Nav from "./components/Nav";
import categories from "./categories.json";
import SubNav from "./components/subNav";
import FlexContainer from "./components/flexContainer";
//Routes
import Home from "./pages/Home";
import BitcoinStories from "./pages/BitcoinStories";
import Stories from "./pages/Stories";
import Jist from "./pages/Jist";
import Join from "./pages/Join";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";

class App extends Component {
  
  state = {
    categories: categories
  }
  
  render(){
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
            />
          ))}
          </FlexContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/stories" component={Stories} />
            <Route exact path="/yourbitcoinstory" component={BitcoinStories} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/join" component={Join} />
            <Route exact path="/jist" component={Jist} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default App;
