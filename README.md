# Tripper

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## TODO

- forgotten password path
- apollo 
  - https://www.apollographql.com/
  - GQL files: https://www.apollographql.com/docs/react/recipes/webpack.html

### BACKEND

- dataloader
- refresh jwt token
  - https://solidgeargroup.com/refresh-token-with-jwt-authentication-node-js
  - https://gist.github.com/ziluvatar/a3feb505c4c0ec37059054537b38fc48
- can delete any id, not just your own?
- stop duplicate list name error
- user lists array, and lists destination array, not updating when list or dest respectively is added
- Error handling
- proper statuses
- Countries
- Holidays
- order destinations/lists
- stop brute force email/password
- bundle server for prod - https://github.com/rollup/rollup
- caching - reddis
- preact
- https://expressjs.com/en/advanced/best-practice-performance.html
- https://strongloop.com/strongblog/best-practices-for-express-in-production-part-one-security/
- Hosting
  - container
  - container db
  - daemon
  - new relic - https://github.com/newrelic/node-newrelic
- splunk
- Passport?

### FRONTEND

- redux
- redux saga
- Avoid bank holidays flag (cheaper flights)
- Avoid particular bank holidays (checkbox loop available)
- Move country to autosuggest
- Edit user
- Edit list
- Edit destination
- order destinations/lists
- Routes
  - Home (explain app)
  - Login/Signup
  - Settings (delete / update user)
  - Create list
  - Organise destinations
  - Results
- Login with facebook etc.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Create a self signed certificate

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

## Install MongoDB

```sh
brew install mongodb
```

To load and start the MongoDB background service:

```sh
brew tap homebrew/services
brew services start mongodb
```

To check the service is running:

```sh
brew services list
```

## GraphQL

# mutation {
#   createUser(userInput: {
#     email:"gazzwi86@gmail.com",
#     password: "password",
#     country: "GB"
#     lists: []
#   }){
#     _id
#     email
#     country
#     password
#   }
# }

# mutation {
#   updateUser(userInput: {
#     _id: "5c4cbcf21e1e407602dc0342"
#     email:"gazzwi86@gmail.com",
#     password: "password",
#     country: "FR"
#     lists: []
#   }){
#     _id
#     email
#     country
#     password
#   }
# }

# query {
#   users {
#     _id
#     email
#     password
#     country
#     lists{
#       _id
#       name
#       destinations{
#         _id
#         destination
#         duration
#       }
#     }
#   }
# }

# query {
#   signinUser(authInput: {
#     email:"gazzwi86@gmail.com",
#     password: "password",
#   }){
#     userId
#     token
#     tokenExpires
#   }
# }

# mutation{
# 	deleteUser(userId: "5c4cd28964d8c87b8a92c59d")
# }

# mutation {
#   createList(listInput: {
#     name:"2020",
#     destinations: [],
# 		creator: "5c4cd28964d8c87b8a92c59d",
#   }){
#     _id
#     name
#     destinations{
#       _id
#       destination
#       duration
#     }
#     creator {
#       password
#     }
#   }
# }

# mutation {
#   updateList(listInput: {
#     _id: "5c4cc1a58c15fc76df28a123",
#     name:"2020",
#     destinations: [],
# 		creator: "5c4cc1588c15fc76df28a121",
#   }){
#     _id
#     name
#     destinations{
#       _id
#       destination
#       duration
#     }
#     creator {
#       password
#     }
#   }
# }

# query {
#   lists {
#     _id
#     name
#     destinations{
#       destination
#       duration
#     }
#     creator{
#       _id
#       email
#     }
#   }
# }

# mutation{
# 	deleteList(listId: "5c4cc1a58c15fc76df28a123")
# }

# mutation {
#   createDestination(destinationInput: {
#     destination: "Paris",
#     duration:2,
# 		list: "5c4cd29c64d8c87b8a92c59e",
#   }){
#     _id
#     destination
#     duration
#     list {
#       name
#     }
#   }
# }

# mutation {
#   updateDestination(destinationInput: {
#     _id: "5c4cc329a621c176fe54b487",
#     destination: "Bolgna",
#     duration:3,
# 		list: "5c4cc309a621c176fe54b483",
#   }){
#     _id
#     destination
#     duration
#     list {
#       name
#     }
#   }
# }

# query {
#   destinations {
#     _id
#     destination
#     duration
#     list {
#       name
#       _id
#     }
#   }
# }

# mutation{
# 	deleteDestination(destinationId: "5c4cc338a621c176fe54b488")
# }