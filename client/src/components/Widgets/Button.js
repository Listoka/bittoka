import React from 'react';

export const Button = props => {
  return (
    // The Bootstrap and postBtn will be changed once Lindsay themes the website. Left for now.
    <button className='btn postBtn' {...props}>
      <span className={`font-normal ${props.styles}`}>{props.text}</span>
    </button>
  );
};

// we'll probably want to move more in this direction for the little input/control type widgets
// Note that this is just a sample or proposal to make it easier to collect all the button styles in one place
const B = props => {
  const { className, children, btnType, ...other } = props
  // if we get a 'type' prop, use that to determine which styles to apply
  // otherwise, if we pass in className use that
  // otherwise, use the default styles
  switch (btnType) {
    case 'primary':
      classes = ''
      break;
    case 'secondary':
      classes = ''
      break;
    default:
      classes = className || 'default button classes'
  }

  return (
    <button className={classes} {...other}>
      {children}
    </button>
  )
}

// if we need a specific type of button that needs extra functionality like Link,
// we can just wrap the Button component, for example

// const CreatePostButton = props => {
//   return (
//     <Link to={`/proper/url/thing`} className='no-underline hover:no-underline'>
//       <B type='createPost'>Create Post</B>
//     </Link>
//   )
// }