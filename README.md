# Click UP User Management - Back End

## Stack

- nodejs
- express
- postgresql

## User Stories

- User can sign up with email address, name (not unique), and a password
  - **ASSUMPTION**: if user email is in db already signup means just adding the password

- User can create groups each with a name (not unique)
  - **SUGGESTION**: it's better to have a group name unique for a particular user

- User can add other users to groups by their email address
  - **ASSUMPTION**: regardless if another user email is in the system or not

- Users can view the groups they created, but only the groups they created, along with the users in those groups. If the user in the group has created an account, including their name.

## Implementation requirement

- no orm
- jwt
- anything with a @ sign and at least one character before and after it a valid email address

## Additional requirement

Create the schema yourself with an accompanying .sql file to generate it.
Please provide some simple docs for your API, a readme on how to get up and running, and an estimate of how long you spent on this. The documentation can just be a simple text file.
Add any notes of things you would add in a prod environment but doesn't seem necessary here such as email validation that actually works.

## Deployment

Deployed on Heroku https://pg-project.herokuapp.com/

Automatic deploys from master are enabled. Every push to master will deploy a new version of this app.
Keep in mind that I am using a free plan, the app falls asleep if not busy. Give it a few seconds to wakeup.

## Local install

1. Clone this repo.
```
git clone https://github.com/mike-4040/cu-users.git
cd cu-users
```
2. Install dependency
```
npm i
```
3. Follow the instructions in `.env_form`.

4. Update `configrc.js`, if necessary.

5. Run sql scripts in the correct order to create tables.
```
1_user.sql
2_group.sql
3_user_in_group.sql
```
6. Run

production
```
npm start
```
or development
```
npm run dev
```
You might need to install `nodemon`.
```
npm i -g nodemon
```

## How to try

The application provides only `api`, no client.
The best way to play with it is to use tools like postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/88b092ef728721ad1978#?env%5BCU%20Heroku%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwczovL3BnLXByb2plY3QuaGVyb2t1YXBwLmNvbSIsImVuYWJsZWQiOnRydWV9XQ==)

Follow simple instructions in Requests description.

[API documentation](https://documenter.getpostman.com/view/6976266/SztK2QEb)

## Good to know

Validation can be turned **On** and **Off** in configrc.js

## To Do

1. Strict validation on all routes.
1. Custom validation messages.
1. Refactor all sql requests to separate files 
