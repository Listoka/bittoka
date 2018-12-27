import React from 'react';
import { Link } from 'react-router-dom';

const SubNavItem = props => {
  let className = 'inline-flex text-base text-body hover:text-brand-green'

  // style appropriately if active
  className = props.active
    ? className + ' text-brand-green'
    : className + ' text-light-gray'

  return (
    <div className='flex align-center items-center mx-2 my-3 ' id={props.id}>
      <Link className={className} to={`/categories/${props.href}`}> {props.name}</Link>
    </div>
  )
}

const SubNav = props => (
  <div className='flex flex-wrap flex-row items-center justify-center'>
    {props.categories.map(category => {
      const active = props.match.params.categoryName === category.name
      return (
        <SubNavItem
          id={category._id}
          key={category._id}
          href={category.name}
          name={category.displayName}
          active={active}
        />
      )
    }
    )}
  </div>
)
export default SubNav;