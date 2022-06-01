# Bank transactions practice

You are tasked with writing a piece of software to do Checks and Balances.
It must comprise an HTTP Server with two endpoints:

One to insert a new monetary transaction, money in or out, for a given user;

One to return a user’s current balance.

#### Requirements

It must not be possible to withdraw money for a given user when they don’t have enough balance;

You should take concurrency issues into consideration;

It must be executable in Linux & macOS machines;

You don’t have to worry about databases; it’s fine to use in-process, in-memory storage;

It must be production quality according to your understanding of it

## Description:

Back end solution for the Checks and Balances test.

It is composed of user handler and account handler. I introduced a simple User logic cause a a bank transaction should have some authentication and authorization system. Then there is an account entity and services to handle the transactions. Below there is a more detailed explanation

### HTTP:

this module is composed of the routes and handlers to process the FrontEnd requests. it is composed of:

#### Add User, Login, get user and get all users(only for admins) Routes

these route registers a new User into the system. It is simple but there are some checks performed at the route level, like making sure all params are present. This UI service it's abstracted from the business logic layer
There are middlewares to check that all validations are successful, also there is a middleware to handle errors, user authentication(to make sure the user has the right token and also that it is executing on his account only.

#### Add account, find an account and find all account (for a user) routes

This routes allow a user to create an account, with a specific currency, so a user can have different accounts with different currencies, one account per currency. A user can also get his/her account or accounts info

#### Middlewares:

We have middlewares to register every request and assign a specific code to be tracked on a log system like Kibana or datadog
Also user auth middlewares to check the user rights before the requests go to the business logic

Validator middleware to check all the validations and prevent the requests to get to the handler if the validation fails

### Transaction route

This route allows a user to add or withdraw money from his/her account. If the user does not have sufficient funds then the operation is not allowed

### Infra:

This module abstracts the DB implementation, allowing services to requests data from the DB without worrying about the DB implementation. They just called methods and they received the expected data

### utils:

Some utils that can be used by any function in the app

### account and user:

contains the business logic to handle the users and the bank accounts and transaction. It is abstracted away from the UI implementation, like that it is not tied to any specific framework.
It creates entities for each module, with validations to make sure the entity meets the business rules (not to be mistaken with the DB models) it also contains all the business use cases to handle the requests

#### Run local

Clone it, create a .env file following the .example.env, npm install and:

```bash
npm run start:dev
npm start
npm run test
```

To do a transaction, since I am loading some users at start up you can execute the postman collection attached to the email.

First execute "user login". Copy the token and paste it on the authorization header for each request.

Execute "user create account" to add a new account for the user

Execute "post transaction" to add money or withdraw . If you withdraw please add a negative number there, like -20

### to do:

It would have been ideal to include more test and integration test, there are some but not a 100% coverage.
I included an in memory DB but the ideal thing would also be to have a real implementation. In Memory test is great for testing environments , like that we don't have to mock the Repo, we just use the inmemory one for the test

### finally

I included some basic test with Jest here, again just for this test and the time I had I did not include a lot of tests.

I followed a clean architecture approach for this solution and functional programming. I tried to mimic a production build but of course it is not ideal, I just did this in one day. I know that there are better approaches but for the test this should be enough
I think that is all, if you have any questions please contact me and I will try to answer them.
