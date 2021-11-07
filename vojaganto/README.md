# Vojaganto Client App

## Setup Instruction

```shell
# Install node modules dependencies
npm install

# Test run app
# The app will run on localhost:3000/
npm start
```

## Testing Instructions

Since the data are currently mocked and will eventually be fetched from the server, in Phase 1 we implemented the functionalities as they will

### Data Mocks

## Views and Features

### Authentication

### Home Page

### View Postings

#### View Individual Posting

#### Edit and Create Posting

#### Journey Page

### Profile Page

#### Edit Profile

### Admin

There is no direct access methods from client pages to the admin dashboard.

The only way to access admin dashboard is to add url extension `/admin/login` at default route

There are four pages for the admin dashboard: login, home, user management, post management

If access pages other than login using not admin account, you will be redirect to the login page

#### Admin Login

The mock admin account has *admin* as both username and password.

Login with other username or password will only show warning.

#### Admin Dashboard

The admin home page has route `/admin/home`

There is nothing on the home page except a welcome message with current admin username and the navbar.

The users management page has route `/admin/users`

This page will have a table showing all users we have, and info about them like username, nickname and last login time.

The posts management page has route `/admin/postings`

This page is same as the users management page, but admin will have the ability to remove an exist post.

### Map

## External Libraries

- React
- react-router
- node-sass
- Material UI: basically for icons.
- Leaflet: not yet used. We will add it in Phase 2 since it requires data.
