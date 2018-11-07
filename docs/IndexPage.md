# Index
This is the primary content discovery view for Listoka.  It shows a list of
posts and a sidebar with context aware content.

## Index Page
- 'Dumb' component, this does not maintain its own state
- Receives ReactRouter props
- Renders the view by passing a render function into the `IndexContainer`
  component
- Sets structure and styles for page inside the render function passed into
  `IndexContainer`

## Index Container
- 'Smart' Component
- Makes network request and stores state for:
    - Category Info (if applicable)
    - Category Tags (if applicable)
    - Posts array
- Defines functions for interacting with page (including but not limited to):
    - Filter posts by tags
    - Pagination for loaded posts
- Does *not* determine any structure or styles.  Instead, it receives a function
  on its 'render prop' and uses that to determine what to actually render.

## Post List
- 'Dumb' Component
- Determines the style for the post list container div
- Takes a prop with an array of post data
- renders multiple `PostListItem` components

## Post List Item
- 'Dumb' Component
- Determines the style and structure for individual post data display
- Receives post data prop
- Contains `Link` component from ReactRouter that points to the Post Detail View

## Sidebar
- 'Dumb' Component
- Determines the style and structure for the sidebar container
- Receives data like Category info and tags
- Conditionally renders multiple `SidebarSection` components

## Sidebar Section (static)
- 'Dumb' Component
- Takes some JSX and renders it with the appropriate styles in the sidebar
- Might need to be unique for each type of sidebar section

## Sidebar Section Container (dynamic)
- 'Smart' Component
- Makes network requests and holds state for sidebar sections that need to
  update their content dynamically, but do not share state with the
  `IndexContainer` component
    - E.g. this would be used for a 'user info' section or an advertisement
      section
- Takes a render prop function that should render a (static) Sidebar Section
  component. Does *not* determine its own structure or styles

## Introduction Header
- 'Dumb' Component
-  For now, this is just a static component that displays the 'onboarding'
   information to a user if they are not logged in.

## Rough Layout
```
+-----------------------------------------------------------------------------+
|  +-----------------------------------------------------------------------+  |
|  | Introduction header                                                   |  |
|  | (displayed if user is not logged in)                                  |  |
|  |                                                                       |  |
|  +-----------------------------------------------------------------------+  |
|                                                                             |
|  <Create Post Button>                                                       |
|  +--------------------------------------------------+ +------------------+  |
|  |  Post List                                       | | Sidebar          |  |
|  |  +--------------------------------------------+  | |------------------|  |
|  |  | Post List Item                             |  | | SB Section       |  |
|  |  | (many)                                     |  | |                  |  |
|  |  |                                            |  | |------------------|  |
|  |  +--------------------------------------------+  | | SB Section       |  |
|  |                                                  | |                  |  |
|  |  +--------------------------------------------+  | |------------------|  |
|  |  | Post List Item                             |  | | SB Section       |  |
|  |  | (many)                                     |  | |                  |  |
|  |  |                                            |  | |                  |  |
|  |  +--------------------------------------------+  | +------------------+  |
|  +--------------------------------------------------+                       |
|          <Pagination Controls>                                              |
+-----------------------------------------------------------------------------+
```
