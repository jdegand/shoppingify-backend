<h1 align="center">Shoppingify Backend</h1>

<div align="center">
   Solution for a challenge from  <a href="https://legacy.devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x" target="_blank">Devchallenges.io</a>.
</div>

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [Continued Development](#continued-development)
- [How to use](#how-to-use)
- [Useful Resources](#useful-resources)

## Overview

### Built With

- express generator
- bcrypt
- cookie-parser
- cors
- express
- jsonwebtoken
- mongoose

## Features

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://legacy.devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x) was to build an application to complete the given user stories.

## Continued Development

- Categories have to be created before Items - debatable if category should belong to Item model versus a model of its own.
- Categories plus populate to get all items - versus getting categories and items separately
- List should be changeable if same day? - how should state change ?
- JWT protection for most routes - getting Items not protected and getting Categories not protected
- Users route is not required.
- Statistics doesn't require a route ?
- Problems if you delete a category - item will be linked non-existent category - have to delete item as well
- Same if you delete an item have to remove it from category array
- Guidelines - no deletion of categories or items - both can be added only
- Cross referencing models might be overkill here.
- Design choice -  add quantity to item model versus list model
- Need user attached to items?
- Problem with making list name unique - different users cannot have same list name

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/jdegand/shoppingify-backend

# Install dependencies
$ npm install

# Add env variables (PORT, MONGO_URI, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET) and connect to mongo

# Run the app
$ npm start
```

## Useful Resources

- [Github](https://github.com/aydink88/shoppingify-backend/blob/main/controllers/shoppingList.js) - shoppingList controller - got an idea from this implementation
- [DevDojo](https://devdojo.com/suniljoshi19/building-a-shopping-cart-in-nodejs) - shopping cart
- [Stack Overflow](https://stackoverflow.com/questions/63753664/mongoose-callback-hell-to-promise) - mongoose callback hell
- [HackMD](https://hackmd.io/@abernier/rJPKjpjhS?type=view) - express get with route & query params
- [Stack Overflow](https://stackoverflow.com/questions/50626301/get-routes-nodejs-how-it-will-react-if-2-routes-are-the-same) - routes conflict
- [Stack Overflow](https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js) - how to get query string vairables
- [Stack Overflow](https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express) - access parameters in express
- [Stack Overflow](https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose) - populate nested array in mongoose
