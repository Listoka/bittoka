# Profile Page

## Profile Page Container
- Makes network requests and maintains state for the user's:
  - posts
  - comments
  - bio
  - moneybutton details (for tipping)
- Defines functions for interacting with content list
- Renders Profile Page
- Does *not* define structure or styles

## Profile Page
- Stateless
- Determines structure and styles for main profile page
- Renders
  - ContentList and Buttons
  - "About" Section
  - Tipping component

## Content List
- Stateless
- Wraps a generic `List` component to add some styles and render some button controls and logic to decide which ListItem component to render based on props
- Button controls allow user to select whether they are viewing the comments or the posts of that profile

## Sidebar
- Reused from Home/Index page
- Renders a SidebarSection with a 'User Bio'
- Renders a money button tip component

## Tip Button
- Money button magic, this time in sidebar form.

## Rough Layout
```
+----------------------------------------------------------------------------+
|                                                                            |
|    <Posts><Comments>                                                       |
|    +------------------------------------------+  +---------------------+   |
|    | List                                     |  | Sidebar             |   |
|    | +--------------------------------------+ |  |---------------------|   |
|    | | ListItem                             | |  | SB Section          |   |
|    | |                                      | |  |  (User Bio)         |   |
|    | +--------------------------------------+ |  |                     |   |
|    |                                          |  |                     |   |
|    |                                          |  |                     |   |
|    |                                          |  |                     |   |
|    |                                          |  |                     |   |
|    |                                          |  |                     |   |
|    +------------------------------------------+  |---------------------|   |
|                                                  | Tip button          |   |
|                                                  |                     |   |
|                                                  |                     |   |
|                                                  +---------------------+   |
+----------------------------------------------------------------------------+
```
