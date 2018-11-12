import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const styles = {
  'bitcoin-story': {
    'color': 'snow',
    'backgroundColor': 'royalblue'
  },
  'listoka': {
    'color': 'snow',
    'backgroundColor': 'darkcyan'
  },
  'stories': {
    'color': 'snow',
    'backgroundColor': 'orangered'
  },
}


const CategoryFlair = props => (
  <Link className='no-underline hover:no-underline' to={`/categories/${props.categoryName}`}>
    <span style={styles[props.categoryName]} className={`text-xs px-1 capitalize`}>
      {props.categoryName}
    </span>
  </Link>
)

CategoryFlair.propTypes = {
  categoryName: PropTypes.string
}

export default CategoryFlair