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

## Content Detail
- dumb, stateless component
- displays either the teaser or content body based on props
- sets the structure and style to display information like post title, author,
  cost, votes, body, teaser, etc.
 
