import React from 'react'
import SideBarSection from './SidebarSection'

const SBTagFilter = props => {
  if (!props.tags || props.tags.length < 1) {
    return null
  }

  return (
    <SideBarSection>
      <div className='text-left text-xl'>Tags</div>
      <hr className="border-medium-gray border-2 hrModals"></hr>
      {props.tags.sort().map(tag => (
        <li className='rounded-lg text-xs mb-2 py-2px list-reset overflow-hidden cursor-pointer tagLinkInactive' key={tag} onClick={(event) => props.toggleSelectTag(event, tag)}>
          {tag}
        </li>
      ))}
    </SideBarSection>
  )
}

export default SBTagFilter

