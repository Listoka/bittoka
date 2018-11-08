import React from 'react'
import SideBarSection from './SidebarSection'

const SBTagFilter = props => {
  if (!props.tags || props.tags.length < 1) {
    return null
  }

  return (
    <SideBarSection>
      <p className='text-left font-bold mb-1'>Tags</p>
      {props.tags.sort().map(tag => (
        <li className='tagLink rounded tagLinkInactive' key={tag} onClick={(event) => props.toggleSelectTag(event, tag)}>
          {tag}
        </li>
      ))}
    </SideBarSection>
  )
}

export default SBTagFilter

