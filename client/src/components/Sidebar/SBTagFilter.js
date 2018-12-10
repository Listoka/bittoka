import React from 'react'
import SideBarSection from './SidebarSection'

const SBTagFilter = props => {
  if (!props.tags || props.tags.length < 1) {
    return null
  }

  return (
    <SideBarSection>
      <h3 className='text-left mb-20px'>Tags</h3>
      {props.tags.sort().map(tag => (
        <li className='rounded-8px mb-10px py-2px list-reset overflow-hidden pl-10px cursor-pointer  tagLinkInactive' key={tag} onClick={(event) => props.toggleSelectTag(event, tag)}>
          {tag}
        </li>
      ))}
    </SideBarSection>
  )
}

export default SBTagFilter

