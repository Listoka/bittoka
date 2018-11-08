# Account Page (private)

This is the private view of all your user information on Listoka.  There is enough here that we will need to implement a nested react router to be able to have tabs or other navigation within the page itself.

## Account Page Nav
- Either tabs or a side bar
- Contains ReactRouter `Link` components
- (Also has a link to the public profile page of the current user)

## Transaction History Container
- Makes network requests and maintains state for
  - The current user's transactions
- Renders a list component with the txData array and a TxListItem component
- Does *not* determine structure or styles

## List Component
- stateless
- General list component.
- Takes props for a data array and a ListItem component to render
- Maps the data and returns an array of the ListItem component
- Determines the base-line styles for the component list container

## Transaction List Item
- stateless component
- receives data from the list component
- Determines the styles and structure of the transaction list item

## Draft List Container
- Makes network requests and maintains state for
  - the current user's WIP posts
- Renders a list component with the drafts array and DraftListItem component
- Does *not* determine structure or styles

## Draft List Item
- stateless component
- receives data from the list component
- Determines the styles and structure of the draft list item

## Settings Form Container
- Maintains state and makes network requests for
  - Current user bio
  - MoneyButtonId update
  - password reset form

## Settings Form
- Renders the inputs for updating
  - Bio
  - MoneyButtonId
  - password reset