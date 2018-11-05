import React from 'react';

export const Form = props => {
  return (
    <form {...props}>
      {props.children}
    </form>
  )
};