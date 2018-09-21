import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import './App.css';
import categories from "./categories.json";
import SubNav from "./components/subNav";
import FlexContainer from "./components/flexContainer";

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
          {/* <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/books/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch> */}
        </div>
      </Router>
    )
  }
};

export default App;
