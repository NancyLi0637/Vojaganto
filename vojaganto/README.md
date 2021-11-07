# Vojaĝanto App

Vojaĝanto is a React app for people who enjoy travelling and who want to journal their adventures.

## Setup Instruction

```shell
# Install node modules dependencies
npm install

# Test run app
# The app will run on localhost:3000/
npm start
```

## Testing Instructions

Since the data are currently mocked and will eventually be fetched from the server, in Phase 1 we implemented the functionalities as they will only end up in console log, e.g., after editing a posting and click "POST" button, console will log its content, but you will not see the posting in the home page. In the following phases, replacing console log by actual api functions will easily make the functionalities real. The mock data are created by different members, and are not consistent and connected.

### Data Mocks

## Views and Features

### Authentication

### Home Page

### View Postings

Posting, or *trip*, refers to an article that is posted by a user to record their trip. It contains information including title, date, journey, author, destination, images, and the body.

#### View Individual Posting `/trip/:pid`

User can view the posting of corresponding `pid`, e.g., accessing `/trip/1` will display the posting with pid 1; in mock, there is only one posting and will not be varied by pid.

#### Edit Posting `/edit`

The author of a posting will see an "Edit" button in the View Posting page. The old contents will be loaded to the editing page and user can update or delete the posting. The first image will be the cover image in Home Page.

#### Create Posting `/new-posting`

A logged-in user can create new posting by clicking the "pen" button on the navbar.

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
