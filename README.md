
# Auth-App with Reactjs, Node.js, Express, JWT Authentication

This is a simple AuthApp and RESTful API built with Node.js, Express, JWT (JSON Web Tokens), and MongoDB (Mongoose), Reactjs to manage user accounts. The App includes user registration, authentication, and basic profile management features.


## Features

- **User Registration**: Users can create an account by providing their email and password. Additional user information such as first name, last name, phone, biography, and a profile photo is optional.

- **JWT Authentication**: JSON Web Tokens are used for secure authentication. Users receive a JWT upon successful login, which is then used to authenticate and authorize their requests.

- **Profile Management**: Registered users can view, update, and delete their user profiles.

- **File Upload**: User profile photos are uploaded and stored on the server. Express middleware handles file uploads.





## Getting Started

To run this API locally, follow these steps:

```bash
1. Clone this repository to your local machine.

2. Install the required dependencies using `npm install`.

3. Set up your MongoDB database and configure the connection in a `.env` file for api.

4. Start the development server using `npm run dev`.

```
    
## .env.example

```
APP_PORT=3000
MongoURI=PARTOFMONGODBURI
DB_PASS=PASSWORDMONGODB
DB_USER=DBNAME
TOKEN_EXPIRATION=5h
TOKEN_KEY=ahfsdfgfg8t754754654mfthdgmfshmfwhgnfbfnfknfkbnvbritrtirtrt43543534
```
```
In src/config/database.js you have this: mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}${mongoURI}`)
``` 


## App features
```
- Register a User: `POST /users/` - Create a new user account.

- User Login: `POST /tokens/` - Receive a JWT token upon successful login.

- Get User Profile: `GET /users/:id` - Retrieve user information by ID.

- Update User Profile: `PUT /users/` - Update user information.

- Delete User Account: `DELETE /users/` - Delete the user's account.

```

## Technologies Used

**Back-end:** Node, Express, MongoDB, JSON Web Tokens (JWT)
**Front-end:** Reactjs, Redux and Reux/Toolkit, React-Toastify, React-router, Axios


## Build

To build this project, run

```bash
  npm run build
```
