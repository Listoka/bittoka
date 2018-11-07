# Content Detail

This page contains components that display the content of the post or a paywall,
the comments associated with that post, and the purchasing / upvote mechanic.

## Content Detail Page
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
- (mostly) dumb component, might have state only to determine whether it is
  collapsed or not
- renders a root comment node and another `CommentList` containing children
  comments

## Comment 
- Dumb component
- Takes a func to cast vote
- displays comment body, author, date-time, etc


