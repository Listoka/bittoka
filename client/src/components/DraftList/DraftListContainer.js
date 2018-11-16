import React, { Component } from "react";
import { DraftListItem } from './DraftListItem';
import API from '../../utils/API';
import { List } from '../List';

export class DraftListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userName: props.authUser.dbUser.username,
      // id: props.id,
      drafts: []
    };
  };

  componentDidMount() {
    let promises = [this.getPostsAndDrafts(this.props.id)]
    Promise.all(promises)
      .then(results => {
        const drafts = results[0].filter(post => post.isDraft)
        console.log(results)
        this.setState({
          drafts: drafts,
        });
      })
  };

  getPostsAndDrafts = (id) => {
    return API.getPostsAndDrafts(id).then(results => results.data)
  };

  removeDraft = (event, index, id) => {
    console.log(id)
    event.preventDefault();
    let array = this.state.drafts
    array.splice(index, 1)
    this.setState({ drafts: array })
    API.deletePost(id)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };

  render() {
    return (
      <DraftsList data={this.state.drafts} removeDraft={this.removeDraft} />
    );
  };
};

const DraftsList = props => {
  return <List data={props.data} keyProp='_id' component={DraftListItem} removeDraft={props.removeDraft} />
}