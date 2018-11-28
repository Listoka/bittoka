import React from 'react'
import PropTypes from 'prop-types'

export const List = props => {
  const { data, keyProp, component, className, mergeClasses, ...other } = props
  // default List styles
  let classes = 'mb-20px ml-10px pl-40px py-40px rounded-8px bg-darkest-gray'

  // allow adding style classes to end of default class string
  // note that this does not always work as expected... 
  // e.g. adding 'bg-blue' on props.className will not overwrite 'bg-white'
  if (mergeClasses) {
    classes += className
  }

  // allow overwriting of styles... a string like 'none' or 'n/a' works too
  if (!mergeClasses && className && typeof (className === 'string')) {
    classes = className
  }

  return (
    <div className={classes}>
      {data.map(itemProps => {
        return React.createElement(component, { key: itemProps[keyProp], ...itemProps, ...other }, null)
      })}
    </div>
  )
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  keyProp: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default List
