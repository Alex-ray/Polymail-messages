# Webapp-Challenge

## Purpose

This exercise is for you to demonstrate your ability to create a performant web application that matches a design mockup and feature specs in features and functionality.

## What we're looking for

* Proficiency in code architecture and implementation in creating a performant application to spec.
* Ability to use HTML / CSS / JS to match a design mockup.
* Ability to write clean, well-organized, and easily understandable code.
* Consideration for edge cases, errors, loading / empty states, etc.

## Challenge

Create a React app that communicates with our mock RESTful JSON API, allowing the user to login and view messages in a basic email client interface. It should meet the following requirements:

* User should be able to "login" with an email / password combination
* Upon successful login, display a list of threads retrieved from the api in the left-hand column.
* When a Thread is selected, it's corresponding messages should be displayed in the right-hand pane along with each of its messages.
* User should be able to "reply" to a thread by composing a message in the bottom-right text area. A reply that is "sent" should appear as a message in the corresponding thread.

### Resources
- [Login Mockup](/Login.png) View mockup of Login screen
- [Main Mockup](/Main.png) View mockup of Main screen
- [Zeplin](https://zpl.io/Z1VIEEs) Export assets and view mockup details such as colors, spacing, and typography. You may need to create a Zeplin account. If you haven't received an invitation from us for this, please let us know.
- [API Specs](/api.md) RESTful JSON API specs

## Bonus Points

These are not required, but would be great additions if time permits:

* Full test coverage
* Have search input filter threads
* Offline cache / support
* Allow file attachments to be included in a "reply"
* Make design responsive
* Suggested Technologies: Webpack, React, Redux, Redux-Observable, React-Router. *Feel free to use what you're familiar with, as you're not expected to know any/all of these technologies*

## Let's Get Started!

To begin this challenge, please clone this repo and create a Pull Request into the repo when you are finished. You will only have 3 days to complete the challenge, so please prioritize accordingly. Please add details for running your app to the `Running My App (README.md)` section below.

## FAQ

Not all of the images / icons were included, what should I do?
* Any missing assets can be improvised.

The challenge requirements seem vague, am I missing something?
* This challenge is designed to be open-ended, so feel free to be creative in the areas that lack strict guidelines.

# Running My App (README.md)

## Alex J Ray


### Quickstart
In the root directory of this project run
`npm install && npm run build && npm run production`

### Prerequists
Make sure you are on Node version `7` or greater and NPM version `4` or greater.

### Installation
To install dependencies run `npm install`

### Development
The development environment uses Hot Module Reloading 3 and can be seen from
`localhost:8080` using the command `npm run development`

### Production
Production can be run using `npm run build && npm run production` which will start a server on `localhost:8080`

### Tests
On account of misreading the api docs I went ahead and created a simple cookie authentication system using passport.js, which you can test by running
`npm run test`

Be sure to uncomment the `logout` route on line `56` in the `server/server.js` otherwise
some of the test will fail : )

#### Stack
- Node.js
- Express

- React
- React Router 4
- Redux

- Webpack 2
- Home Module Reloader 3

- mocha
- chai
- chai-http
