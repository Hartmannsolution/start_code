# react-nodejs-docker-compose
Example project on how to develop project on Docker Compose with React and Node.js and MongoDB with Mongoose.

## Run application
1. Clone this repository
2. Run `docker-compose up` to start application
3. Run `docker exec node-api node test_data/populate_users.js` to populate 3 users
4. Open `http://localhost:3000` in your browser to see the application running

### Dev setup
In the package.json file of the react_app, there is a "proxy": "http://node-api:3080" setting that allows webpack to forward reqeuests to the node-api container, as though it were running on the same host with relative paths.

### For production
Use nginx to serve the static files from the react_app container and proxy requests to the node_api container.

### Server endpoints
File: api/routes/users.js
Url | Method | Description
--- | --- | ---
/users | GET | Get all users
/users/:id | GET | Get user by id
/users | POST | Create new user
/users/:id | PUT | Update user by id
/users/:id | DELETE | Delete user by id

### Client endpoints
File: react_app/src/services/userService.js
Url | Method | Description
--- | --- | ---
/ | GET | Get all users
/:id | GET | Get user by id
/add | POST | Create new user
/:id | PUT | Update user by id
/:id | DELETE | Delete user by id

## JWT token
There is a branch: jwt on git where jwt is implemented on the backend. In routes/login.js is the login endpoint and in routes/users.js is the authentication middleware where the token is verified on a protected route.