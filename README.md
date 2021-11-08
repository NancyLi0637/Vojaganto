# team28 - Vojaĝanto App

Vojaĝanto is a React app for people who enjoy travelling and who want to journal their adventures.

## Setup Instruction

Note: Make sure you are in the folder `/vojaganto` and on the `main` branch before you run the following commands.

```shell
# To the project root directory
cd vojaganto

# Install node modules dependencies
npm install

# Test run app
# The app will run on localhost:3000/
npm start
```

## Testing Instructions

Since the data are currently mocked and will eventually be fetched from the server, in Phase 1 we implemented the functionalities as they will only end up in console log, e.g., after editing a posting and click "POST" button, console will log its content, but you will not see the posting in the home page. In the following phases, replacing console log by actual api functions will easily make the functionalities real. The mock data are created by different members, and are not consistent and connected.

Since the logged-in user is currently stored by a react state, refreshing the page will reset the state and thus logout. In the next phases when we have access to more advanced storage methods (cookie, localStorage, session), the login state can be persisted.

## Views and Features

### Authentication

#### Log in

At this phase, a user can only login with *user* as the username and password. Entering any other information will receive a warning.

#### Register

Leaving the fields empty or entering *user* or *admin* as a username will receive a warning. Any other info can be used to register an account, but will only have a "Registered" message logged in the console. In phase 2, we will connect to a database for storing the registered information.

### Home Page `/`

This page is the entrance for an user to access an existing account. On the right side of this page is a map which will be introduced at the end of this file.

#### View a public post

On the left side are all the public postings posted by all users. A user can click into any of the postings to view it without logging into an account.  

#### Login as User

To login into or register an account, a user will simply click the "LOGIN | REGISTER" button on the top right of the left view. A user can click "Cancel" to exit the login window.

#### Register an User Account

A user can register an account by clicking "Click here to register" in the login in popup. Clicking on the "Cancel" button will exit the register window and return to the login window.

#### Log out

Once a user logs in, the original login/register button will be changed to a "Log out” button. A user can click this button to log out of the account.

#### Navbar

Once a user logs in, a navigation bar will appear at the bottom of the page. Clicking on the "Home" will be directed to the Home page and clicking on the "Profile" will be directed to the Profile Page. Clicking on the pencil button beside the nav bar will allow a user to create a new post, which is further explained in the next section.

### View Postings

Posting, or *trip*, refers to an article that is posted by a user to record their trip. It contains information including the title, the date, the journey, the author, the destination, the images, and the body.

#### View Individual Posting `/trip/:pid`

User can view the posting of the corresponding `pid`, e.g., accessing `/trip/1` will display the posting with pid 1; in mock, there is only one posting and will not be varied by pid.

#### Edit Posting `/edit`

The author of a posting will see an "Edit" button in the View Posting page. The old contents will be loaded to the editing page and user can update or delete the posting. The first image will be the cover image in Home Page.

#### Create Posting `/new-posting`

A logged-in user can create new posting by clicking the "pen" button on the navbar.

#### Journey Page `/journey/:jid`

A journey page contains a collection of postings with the same journey category tag (each category corresponds to a jid). When user is at a posting view page or a profile page, they can enter the journey page by pressing the journey category tag, and they will be directed to the journey page with the correponding jid; User can access the corresponding posting pages by clicking the postings on journey page; In mock, there is only one journey page and the content will not be varied by jid

### Profile Page

Profile page contains the user information (avatar, username, nickname, user description) and the postings posted by the user (organized according to its journey category tag); Only the user themselves can edit that profile page, and if a person is not logged in to the corresponding user account but accessed it directly through url extension `/profile/uid`, that user can only see the posting and profile information without permission to edit anything.

#### View Profile `/profile/uid`

This is the page that displays the profile of the user whose user id is the uid from the url, and if the current user logged in as the owner of the profile, he/she will see a edit profile button on the top right corner of the profile page; In mock, there is only one profile page and the content will not be varied by uid (However, if the user is logged in as the owner of the profile page, that user can see the edit profile option on the profile page).

#### Edit Profile

This is a modal that hovers on the view profile page, and the user will be able to modify the avatar, nickname and self description on that modal (the user will not be allowed to change the username); Currenly, after successfully modifying the user profile, a log message will appear on the browser console to indicate that the user profile has been modified (in the future, it should be changed to posting data to backend server and database), and the profile information on the view profile page will be modified just for demonstration purpose.

### Admin

There is no direct access methods from client pages to the admin dashboard. The only way to access admin dashboard is to access `/admin/login` route.

There are four pages for the admin dashboard: login, home, user management, and post management. If an user tries to access pages other than the login page without using the admin account, the user will be redirected to the admin login page.

#### Admin Login `/admin/login`

The mock admin account has *admin* as both the username and the password. Login with other username or password will only show a warning.

#### Admin Dashboard

##### Admin Home Page `/admin/home`

There is nothing on the home page except a welcome message with the current admin username and the navbar.

##### Users Management Page `/admin/users`

This page will have a table showing all users we have, and their info such as the username, the nickname and the last login time.

##### Postings Management Page `/admin/postings`

This page is the same as the users management page, but an admin will have the ability to remove an existing post.

### Map

At this phase, we are using a simple image as the map. In the next phase, we will use a third-party library to implement functions such as "locating" and "adding a new location". Accessing map requires calling map API, so is not implemented.

At the top right is the current location. If a user is logged in and clicks on the pen button beside the nav bar, then a button for adding location will show at the bottom right of the map. It is currently not implemented because we will use a library later.

## External Libraries

- React
- react-router
- node-sass
- Material UI: basically for icons.
- Leaflet: not yet used. We will add it in Phase 2 since it requires data.
