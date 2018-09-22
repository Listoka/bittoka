# "Bittoka or Story Time or Stories for Bits"

## MVC ##

* **User and Admin login (Firebase?)** *
   - Something to do with the MoneyButton I would think
   - Admin to moderate discussion / delete posts, and to tip
* **Three main content pages**
   1. *Home*
      - Links to three different search types: Trending, Most upvoted/tipped (if possible), New.
      - Displays the top 5 trending posts (if possible). If not, display the most upvoted. 
      - The post displays: Title of post, Username, Upvotes, (tipped amount if possible)
   2. *Your Bitcoin Story*
      - Same as Home, except it only includes posts made to this category
      - Ability for user to add a tipping button to their post
   3. *Stories*
      - Same as Home, except it only includes posts made to this category
      - Ability for user to add a tipping button to their post, and hopefully a paywall
* **Navbar**
   - FAQ (Jist), Login, Logout. Link to homepage with website name. Typewriter
   - Updates page based on whether user is logged in or logged out
* **Database/Posts**
   - Posts are linked to user account and category type
   - Logged-in user can create post, edit post, delete post
* **React**
   - All links working properly
* **Design**
   - Looks pretty, professional, and appealing to all users
   - Colors: Grey, Green, Black, White

## Not MVC but very hopeful: ##
* A Following function (opens the door to adding a category to view only people you follow)
* Reddit-like decay feature to capture trending/hot topics
* Add Facebook/Twitter share buttons to every post
* Threaded comments like Reddit
* User can view their own posts within their login page

## Totally not MVC but maybe someday: ##
* Search feature

## MoneyButton NOT MVC, but must learn ##
* Capability to prompt user to make payment in order to create a post or comment
* Capability to see who-tipped-who and what amount
* Capability to view total tipped amount for the post
