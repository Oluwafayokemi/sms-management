# sms-management
Sms Management App is an application that provides users with the ability to send text messages to other uses, users can also view all messages sent and received.
### Required Features
1. Users can send sms.
2. Users can receive sms.
3. User can sign up
4. User can sign in
5. Authenticated user can view all sms sent and received
6. Authenticated user can veiw a single sms by id
6. Authenticated user can delete sms by id
### Model Requirement
#### SMS:
- person sending sms
- person receiving sms
- message of sms
- sms status
#### Contact
- name of person
- phone number of person

##### The following relationship needs to be represented in the model:

- All sms sent by a Contact should be linked to them
- All sms sent to a Contact should be linked to them
- Deleting a contact removes the messages they sent and references to messages they received.

### Why this App is useful?
Enables authenticated user to send and receive sms

### Tools and Technologies used
- PostreSQL with sqitch for database migration
- node postgres
- Typescript
- winston logger
- class-validator to validate input
- JwtWebToken for authentication
- Bcrypt for hashing password

### Get Started
- $ git clone https://github.com/Oluwafayokemi/sms-management.git
- $ install sqitch with ```brew install sqitch --with-postgres-support```
### set up database
- run ```createdb sms-management``` to create a database for sms-management
### Set up Guide
- cd into the newly cloned folder
- Go into the project directory:
- create .env file or run `touch .env`
- copy .env.example file into .env file
- Copy the url to your database to DATABASEURL in .env
- on your terminal run

```
sqitch deploy
```
To migrate the tables and columns to your database
```
npm install 
```
To install all packages
```
npm start 
```
On your browser navigate to localhost:9000
* You should do this *
- server is running on port `${whatever port you choose}`

- Open postman and test out the endpoints;

### For Api Documentation
API Routes Endpoints
For Requests
- POST '/api/auth/signup' Sign up as a new user
- POST '/api/auth/login' Login as an existing user
- POST '/api/message' Create a message
- GET '/api/message' Fetch all the message created and sent
- GET '/api//message/:id'  Fetch a message that belongs to a logged in user
- DELETE '/api/message/:id' Delete a request
