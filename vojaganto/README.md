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

#### Admin Login

#### Admin Dashboard

### Map

## External Libraries

- React
- react-router
- node-sass
- Material UI: basically for icons.
- Leaflet: not yet used. We will add it in Phase 2 since it requires data.
