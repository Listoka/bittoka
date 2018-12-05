import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const styles = {
  'bitcoin-story': {
    'color': 'white',
    'backgroundColor': 'royalblue'
  },
  'listoka': {
    'color': 'white',
    'backgroundColor': 'darkcyan'
  },
  'stories': {
    'color': 'white',
    'backgroundColor': 'orangered'
  },
}


const CategoryFlair = props => (
  <Link className='no-underline hover:no-underline' to={`/categories/${props.categoryName}`}>
    <span style={styles[props.categoryName]} className={`rounded-8px py-2px px-2 whitespace-no-wrap capitalize`}>
      {props.categoryName}
    </span>
  </Link>
)

CategoryFlair.propTypes = {
  categoryName: PropTypes.string
}

export default CategoryFlair