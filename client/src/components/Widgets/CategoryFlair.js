import React from 'react'
import { Link } from 'react-router-dom'

const CategoryFlair = props => (
  <Link to={`/categories/${props.categoryName}`}>
    <span className={`${props.categoryName}Flair flair`}>{props.categoryName}</span>
  </Link>
)

export default CategoryFlair