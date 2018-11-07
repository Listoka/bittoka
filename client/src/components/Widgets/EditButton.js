import React from 'react';

export const EditButton = props => {
  return (
    <i {...props} className="far fa-edit text-link-color btn text-base">
      <span className='font-normal text-base'>  {props.text}</span>
    </i>
  )
};