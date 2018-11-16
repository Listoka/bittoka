# Content Detail

This page contains components that display the content of the post or a paywall,
the comments associated with that post, and the purchasing / upvote mechanic.

## Post Detail Page
- stateless component
- takes ReactRouter props
- renders `ContentDetailContainer` and `CommentListContainer`
- can set some basic styles if we need to, but really its whole point is to
  render the two container components

## Content Detail Container
- smart component
- makes network requests and manages state for:
    - Post Data
    - Author Data
    - Paywall Info
- renders a `ContentDetail` component
- defines a func that is passed down to moneyButton in order to notify that a
  purchase has been completed?

## Content Detail
- dumb, stateless component
- displays either the teaser or content body based on props
- sets the structure and style to display information like post title, author,
  cost, votes, body, teaser, etc.
- renders the Paywall component

## Paywall
- stateless component
- receives post data and paywall cost via props
- Has 3 render outputs
  - if user is not logged in, display message 'must log in to purchase'
  - if user is logged in, but hasn't purchased, show purchase money button
  - if already purchased, render children
- children of the Paywall component if the content has been purchased, otherwise it displays the appropriate paywall message

## UpvoteMoneyButton
- stateless component
- simple wrapper around the Listoka Money button that sets some container styles
- also sets some props for the MoneyButton 
- TODO: make a more general money button wrapper for styles and to display info/error messages
 
## MoneyButton
- Does some money button magic to allow purchasing of content, then lets the
  content detail container know about it.

## Comment List Container
- smart component
- makes network requests and manages state for the list of comments associated
  with the current post
- renders a `CommentList` component
- defines functions to handle upvotes and add new comments
 
## Comment List
- dumb component wrapper around the general `List` component
- renders a root comment node and another `CommentList` containing children
  comments

## CommentNodeContainer
- stateful container component
- renders a CommentNode
- Maintains state for whether or not a comment node is collapsed
- Maintains state for whether or not the reply form is visible
- passes through comment data to CommentNode

## CommentNode
- Dumb component
- Takes a func to cast vote
- displays comment body, author, date-time, etc
- renders a vote button
- renders a CommentList with this comment's replies
- Has 3 render states based on props
  - Default is the expanded comment body and its replies container
  - collapsed view is the minified version that only shows the author and it's number of votes
    - (and number of replies?)
  - 'root' view where there is no comment data
    - this view is used only at the top level in order to get the reply functionality to respond directly to the post

## Vote Button
- takes a prop to determine which comment the vote is for
- only renders if the user is logged in
- has state to provide visual feedback that the user has already voted

## Rough Layout
```
+-----------------------------------------------------------------------------+
|               +---------------------------------------------+               |
|               | ContentDetail                               |               |
|               |                                             |               |
|               |       PostTitle, Author, Paywall || Body    |               |
|               |                                             |               |
|               |                                             |               |
|               |                                             |               |
|               |                                             |               |
|               |                                             |               |


|               |                                             |               |
|               |                                             |               |
|               +---------------------------------------------+               |
|                                                                             |
|             +-------------------------------------------------+             |
|             | CommentList                                     |             |
|             | +---------------------------------------------+ |             |
|             | | Comment                                     | |             |
|             | |                                             | |             |
|             | | +-----------------------------------------+ | |             |
|             | | | CommentList                             | | |             |
|             | | | +-------------------------------------+ | | |             |
|             | | | | Comment                             | | | |             |
|             | | | +-------------------------------------+ | | |             |
|             | | | +-------------------------------------+ | | |             |
|             | | | | Comment                             | | | |             |
|             | | | +-------------------------------------+ | | |             |
|             | | +-----------------------------------------+ | |             |
|             | +---------------------------------------------+ |             |
|             | +---------------------------------------------+ |             |
|             | | Comment                                     | |             |
|             | |                                             | |             |
|             | | +-----------------------------------------+ | |             |
|             | | | CommentList                             | | |             |
|             | | | +-------------------------------------+ | | |             |
|             | | | | Comment                             | | | |             |
|             | | | +-------------------------------------+ | | |             |
|             | | +-----------------------------------------+ | |             |
|             | +---------------------------------------------+ |             |
|             +-------------------------------------------------+             |
+-----------------------------------------------------------------------------+
```