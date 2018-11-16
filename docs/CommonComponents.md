# Common Components

This details a few components that are shared or general components that are used in multiple places for similar purposes.

## List
- Stateless
- General component list container
- Receives props
  - data (required): an array of objects
  - keyProp (required): a string, the property on the object to use as a `key` for react
  - component (required): a component to render using 
  - className (optional): a string of css classes to apply to `List` container div.
    - Currently there are some default styles on `List` that will be used if no className prop is given.
  - all other props (like handler functions, etc.) will be passed through `List` to each instance created of the passed in component.

  ## Sidebar
  - Just a div with some sidebar styles
  - intended to render wrapped sidebar section components

  ## SidebarSection
  - Styled wrapper for sections in the sidebar
  - intended to be wrapped by specialized sidebar components like `SBTagFilter`
  - In the event that we have different styles for sidebar sections, `SidebarSection` should take a prop to determine which styles to apply.
    - E.g. we could pass a 'type' prop with a value like 'header' or 'footer' and apply the appropriate styles