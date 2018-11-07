# Editor Page

This is the core of the writing experience on Listoka.  This page is responsible for both loading in previously existing content as well as starting a new post.  

## Editor Container
- Makes network requests and maintains state for
  - Post Data
    - Body
    - Category
    - Applied Tags
    - Teaser
    - Paywall Settings
- Defines handlers for form controls
  - Editor Value
  - Category Select
  - Tag Select
  - Title Input
  - Teaser Input
- Defines handlers for Publishing and Saving Drafts
- Renders the post editor form
- Does *not* determine layout or styles

## Editor Form
- stateless component
- defines structure and styles for the display of the form
- passes through the handler functions defined in the `EditorContainer`
- renders the form components
- renders the rich text editor component

## Rich Text Editor
- Currently works as a drop-in component from `react-rte`
- This will require more planning if we do a rewrite to change the interface, but I suspect that the rich text editor component will end up being a container component that in turn renders an 'RTE Controls' component and an 'RTE Input' component.