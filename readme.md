# Node-React sample App

## Getting Started

Git clone the project;

Run 
```
npm install
npm start

```
By default, it will serve the app on port 3333, go to [http://localhost:3333](http://localhost:3333) to launch it. 

Additionally you need to start mongoDB and Api server.

```
mongo
node server/app.js

```

### Prerequisites

You need to have mongoDB installed and nodeJs version > 7.4

### Api documentation 
There are following requests available
#### Unauthenticated
- POST api/user for creating user
Example payload:
        
```

{
    email: 'some@mail.com',
    password: '12345678'
}

```
        
- POST api/user/login for authenticating user
Example payload:
        
```
{
    email: 'some@mail.com',
    password: '12345678'
}

``` 
        
- POST api/user/forgot-password for recovering password
Example payload:
        
```
{
    email: 'some@mail.com'
}

``` 
#### Authenticated
- GET api/user returns all users
- GET api/user/:id returns user by given id
- DELETE api/user/:id Deletes the user by given id