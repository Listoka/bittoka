import React from 'react'

const List = props => {
  // default List styles
  let classes = 'm-1 p-1 bg-white border-medium-gray rounded '

  // allow adding style classes to end of default class string
  // note that this does not always work as expected... 
  // e.g. adding 'bg-blue' on props.className will not overwrite 'bg-white'
  if (props.mergeClasses) {
    classes += props.className
  }

  // allow overwriting of styles
  if (!props.mergeClasses && props.className && typeof(props.className === 'string')) {
    classes = props.className
  }

  return (
    <div className={classes}>
      {props.data.map(itemProps => {
        return React.createElement(props.component, { key: itemProps[props.keyProp], ...itemProps }, null)
      })}
    </div>
  )
}

export default List;