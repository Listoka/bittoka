import React from 'react'

const SidebarSection = props => {
  // types header, body, footer
  // const headerClasses = 'my-0'
  const bodyClasses = 'border-grey border-l-0 border-r-0 my-0'
  // const footerClasses = 'my-0'

  let classes = 'my-0'
  // if (props.type === 'header') {
  //   classes = headerClasses
  // }

  if (props.type === 'body') {
    classes = bodyClasses
  }

  // if (props.type === 'footer') {
  //   classes = footerClasses
  // }

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}

export default SidebarSection