# Click UP User Management - Back End

## Stack

- nodejs
- express
- postgresql

## implementation details

- no orm
- jwt
- anything with a @ sign and at least one character before and after it a valid email address

## User Stories

- User can sign up with email address, name (not unique), and a password
  - **ASSUMPTION**: if user email is in db already signup means just adding the password

- User can create groups each with a name (not unique)
  - **SUGGESTION**: it's better to have group name unique for particular user

- User can add other users to groups by their email address
  - **ASSUMPTION**: regardles if other user emai is in the system or not

- User can view the groups they created, but only the groups they created, along with the users in those groups. If the user in the group has created an account, include their name.

## Doc requirement

Do not use an ORM, create the schema yourself with an accompanying .sql file to generate it.
Please provide some simple docs for your API, a readme on how to get up and running, and an estimate of how long you spent on this. The documentation can just be a simple text file.
Add any notes of things you would add in a prod environment but doesn't seem necessary here such as email validation that actually works.
