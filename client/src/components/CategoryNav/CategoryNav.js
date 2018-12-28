import React from 'react'
import SubNav from '../subNav';

class CategoryNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeGroup: null
    }
  }

  setActiveGroup = groupName => this.setState({ activeGroup: groupName })

  render() {
    return (
      <React.Fragment>
        <div className='flex flex-wrap flex-row items-center justify-center my-4'>
          {Object.keys(this.props.categoryGroups).map((groupName, i) => (
            <span
              key={i} onClick={() => this.setActiveGroup(groupName)}
              className='text-white text-base mx-2 cursor-pointer hover:text-brand-green'
            >
              {groupName}
            </span>
          ))}
        </div>
        {this.state.activeGroup &&
          <SubNav {...this.props} categories={this.props.categoryGroups[this.state.activeGroup]} />}
      </React.Fragment>
    )
  }
}

export default CategoryNav