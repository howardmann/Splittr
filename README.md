# Splittr
[Click here to see live Project (hosted on Heroku)](https://bill-splittr.herokuapp.com/) - Best experienced on mobile

## Description
A mobile-first bill splitting app with SMS notifications and live loading.

A Single Page Application built with React.js and Ruby on Rails.

Individual final project by [Howie Mann](https://github.com/howardmann) designed and deployed within five days as part of General Assembly's 12 week Web Development Immersive bootcamp.

## Features

#### Creating a new bill
1. User adds individual items and people to a bill
2. User flags where, when and who paid for the bill
3. All people are notified by SMS with a weblink to split the bill

#### Splitting the bill
1. A user is prompted to enter their mobile number to find their bill
2. A user claims items they had from the bill by clicking/ touching an item
3. The app splits the bill and live updates the amount owed by each person

## UX design focus
#### Mobile first
- Responsive design for mobile, tablet and desktop experience
- Designed to replicate native mobile app experience - app can be added to mobile home screen
- Immediate SMS notifications encourage use on mobile devices

#### Security and authentication
- No annoying user sign-up required
- Users authenticated via mobile numbers, complementing mobile-first experience


## Technology stack
- [React.js](https://facebook.github.io/react/) as front-end-framework for view rendering and ajax requests to back-end API
- [Ruby on Rails](http://guides.rubyonrails.org/) and [PostgreSQL](https://www.postgresql.org/) for back-end build and database as an API
- [Twilio](https://www.twilio.com) for SMS notifications
- [jQuery](https://jquery.com/) for ajax requests
- Custom CSS design and layout built with my [own CSS grid system library](https://github.com/howardmann/simple_css_library)
- JavaScript, ES6, Ruby, HTML5 and CSS3 as programming languages
- [Heroku](https://www.heroku.com/) for cloud deployment

## New features under consideration
- **Image to text capture with [Google Cloud Vision API](https://cloud.google.com/vision/) of bill receipts**
