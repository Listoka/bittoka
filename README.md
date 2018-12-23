# Listoka

## Description ##

Listoka can be thought of as a Social Media website where users make money by contributing content that other people appreciate. Users earn money through votes, comments, tips, and by hiding content behind paywalls. For example, in our Stories category a user may post part of a story for free and hide the remaining portion behind a paywall. In order for another user to view the rest of the story, they will have to make a payment. This is made possible through an NPM package called MoneyButton, which allows Bitcoin micropayments as low as 1 cent to be sent from one party to another. Using MoneyButton enables us to offload all financial responsibilities since we do not have access to user’s funds or accounts. MoneyButton also allows for payment automation and the ability to route payments to multiple parties. Meaning, we can configure the routes so the platform gets paid a small amount whenever a financial transfer is made. 

There are relatively few micropayments platforms in existence and the few that exists appeal strictly to cryptocurrency users. This is because the content is geared towards that user base. To differentiate our platform and appeal to the non-crypto enthusiast, Listoka’s content is geared towards topics that normal people find entertaining or useful. The theme of our platform is to be fun and enjoyable or beneficial towards people’s lives. This is why story telling will be a focal point; along with a Teach/Learn category where users can do things such as post “how-to” tutorials.

In short, Listoka is a micropayments platform where users earn money by contributing fun and useful content that is beneficial towards people’s lives. 

We’ve come a long way, but there's still work to be done. 

## Where we’re at: ##

As of right now, we have the following functionality along with a polished, attractive interface:

- User login/logout
- Users able to create a post, leave comments, and vote
- MoneyButton integration: Tipping, cost to vote, User sets the paywall amount, collecting tipped/spent amounts
- Profile page where other users can view that user’s profile information and tip
- Account page to view and change settings, stats, posts, etc
- Save draft capability
- Rich Text Editor integration with draft-js-plugins to allow Bold, Underline, H2, etc.
- Modal integration where it makes sense (ie: login & create account)
- Social Media shares on each post
- Threaded commenting system
- Ability to sort posts by newest/oldest & # of votes from the past week, month, and all-time

## Functionality needed before launching: ##
	
- Ability to charge for posting/commenting
- Admin account
- Password reset and e-mail verification
- MoneyButton Auth integration
- MoneyButton Webhooks for Paywall validation
- Avatar system based on upvotes added to user Profiles
- Following functionality
- Bookmark/Saving of posts to view in Account page
- Search functionality
- Revamp Subnav into descriptors with categories

![Image of Stories Page on 12.22.18](https://i.imgur.com/gLSdj73.png)
![Image of Comments Page on 12.21.18](https://i.imgur.com/p66fJGF.png)
