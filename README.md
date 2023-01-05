# **team28 - Vojaĝanto App**

Vojaĝanto is travel-journal app for people who enjoy travelling and who want to share their adventures on map.

## **Setup Instruction**

The Express server will serve the static files generated by React build. Use the following commands to setup the program.

This app requires MongoDB, please have a local database at port 27017.

```sh
# In root directory
# install dependency
npm run setup

# Build React app
npm run build-client

# Start Express server
npm start
```

Note that it is possible for setup or build to cause error on package `react-leaflet`. In that case, please do the following.

```sh
# In /vojaganto
npm install react-leaflet@2.8.0

# Open package.json and change react-leaftlet back to 2.6.0
# Then in folder vojaganto
npm install

# back to main root
npm run build-client

#start Express server
npm start
```

## Test Credentials

Client users (active) can login, view public journeys, and manage their own trips and journeys.

Admin users are set by another admin in the admin dashboard. They can delete public postings if the posting is inappropriate, manage users' roles (admin or client) and activate/inactivate a user (inactive means banned, so that they cannot login). Admin users also have the functionalities of client users.

```sh
# User account
username: user
password: user

# Admin account
username: admin
password: admin
```

## **Feature List**

### **Client App Features**

- [x] Login client
- [x] Register client
- [x] Logout client
- [x] Home page postings
  - [x] View all
  - [x] View map markers
  - [x] Search
  - [x] Pagination
  - [x] Public only
- [x] View posting
  - [x] Content
  - [x] Link to journey and author
  - [x] Map marker
  - [x] Edit privilege to author
  - [x] Private privilege to author
- [x] Create posting
  - [x] Input content
  - [x] Get journeys
  - [x] Upload image
  - [x] Delete image
  - [x] Add marker to map
- [x] Edit posting
  - [x] Load existing data to input
  - [x] Update content
  - [x] Delete posting
- [x] Profile
  - [x] View profile
  - [x] View map markers
  - [x] Edit privilege to author
  - [x] Private privilege to author
- [x] Edit Profile
  - [x] Update content
  - [x] Update avatar
- [x] Journey
  - [x] Create journey
    - [x] Unique name under a user
  - [x] View postings and markers
  - [x] Private privilege to author
  - [x] Edit privilege to author
  - [x] Update title
  - [x] Delete Journey
    - [x] Safe move postings to default
    - [x] Cannot delete defaultJourney

### Admin Dashboard Features

- [x] Admin login
- [x] Admin logout
- [x] View all postings
  - [x] View info
  - [x] Search
  - [x] Delete posting
  - [x] View content
- [x] View all users
  - [x] View info
  - [x] Search
  - [x] Activate/Inactivate users
  - [x] Change user role

## Views and Features Instructions

### Authentication

#### Log in

Click the "Login/Register" button in the home view to login an account with username and password. You will receive an alert message, and see the button becomes "Logout". You can logout the account by clicking that button. The session limit is 30 minutes. Only "active" user can login.

#### Register

By clicking the "Click here to register" link on the Login Modal, a Register Modal will appear, where you can enter unique username, password, and a nickname to register a client account. If username already taken or input not valid, you will have an alert. After register, please login with the login modal.

### Home Page `/`

View the public trips and their markers on the map.

#### View a public post

On the left side are all the public postings posted by all users. At most 20 posts will be on home page at same time, there is a switch page option at the bottom of posts, click it will show the next 20 posts. A user can click into any of the postings to view it without logging into an account.

#### Search public posts

On the left side of the login button is a search bar, where a user can search related postings using this search bar by title, content, author username, journey title. Search results will be on the same view.

#### Login as User

To login into or register an account, a user will simply click the "LOGIN | REGISTER" button on the top right of the left view. A user can click "Cancel" to exit the login window. Note that the session only exist for 30min, please login again after that

#### Register an User Account

A user can register an account by clicking "Click here to register" in the login in popup. Clicking on the "Cancel" button will exit the register window and return to the login window.

#### Log out

Once a user logs in, the original login/register button will be changed to a "Log out” button. A user can click this button to log out of the account.

#### Navbar

Once a user logs in, a navigation bar will appear at the bottom of the page. Clicking on the "Home" will be directed to the Home page and clicking on the "Profile" will be directed to the Profile Page of the current user (if logged in). Clicking on the pencil button beside the nav bar will allow a user to create a new post, which is further explained in the next section.

### View Posting

Posting, or *trip*, refers to an article that is posted by a user to record their trip. It contains information including title, date, journey, author, destination, images, body, and map marker.

#### View Individual Posting `/trip/:pid`

User can view the posting of the corresponding `pid`, e.g., accessing `/trip/1` will display the posting with pid 1. Note that there are images for a post, if there are multiple images there will be a scrollbar under images so that user can slide them horizontally. The client can click on the journey name to access the journey page and click on the author name to see the author's profile

#### Create Posting `/new-posting`

A logged-in user can create new posting by clicking the "pen" button on the navbar. Input the fields as they appear, (destination is user-defined input), and add a marker on the map by clicking the map.

#### Edit Posting `/edit`

The author of a posting will see an "Edit" button in the View Posting page. The old contents will be loaded to the editing page and user can update or delete the posting. The first image will be the cover image in Home Page.

### Journey Page `/journey/:jid`

A journey page contains a collection of postings with the same journey category tag (each category corresponds to a jid). Click the journey name in a posting or in a user's profile to access this page. User can access the corresponding posting pages by clicking the postings on journey page. The map will show the markers of the postings under this journey.

#### Edit Journey

The owner of the journey can click the edit button to edit journey title or delete the journey in a modal. The journeys under a user must have unique title. Notice the default journey ("Unnamed Journey") cannot be deleted and will receive an alert warning.

### Profile Page

Profile page contains the user information (avatar, username, nickname, user description) and the postings of the user (organized according to its journey); Only the user themselves can edit that profile page. Private postings will be displayed here, but only the author can see them.

#### View Profile `/profile/uid`

This is the page that displays the profile of the user with the uid. This page can be access from any post by click on the author name or click the profile button on navbar as a logged-in user. If the current user logged in as the owner of the profile, he/she will see a edit profile button on the top right corner of the profile page.

#### Edit Profile

This is a modal that hovers on the view profile page, and the user will be able to modify the avatar, nickname and self description on that modal (the user will not be allowed to change the username); After successfully modifying the user profile, message will appear on the top of browser to indicate that the user profile has been modified, and the profile information on the view profile page will be modified once the page is auto refreshed.

### Admin

There is no direct access methods from client pages to the admin dashboard. The only way to access admin dashboard is to access `/admin/login` route.

There are four pages for the admin dashboard: login, home, user management, and posting management. If an user tries to access pages other than the login page without using the admin account, the user will be redirected to the admin login page.

#### Admin Login `/admin/login`

Only users with admin role can login here. Login with other username or password will only show a warning.

#### Admin Home Page `/admin/home`

There is nothing on the home page except a welcome message with the current admin name and the navbar.

#### Users Management Page `/admin/users`

This page will have a table showing all users we have, and their info such as the username, the nickname and the last login time. There are two ways to manage a user: switch its role and ban/unban it. The button `Inactive` will ban a user so that he will not be able to login. If a user is currently banned, the button become `Active` which can be used by admin to unban the user. The other button is to set a user to admin or client and it works in the same way as ban/unban button

#### Postings Management Page `/admin/postings`

This page is the same as the users management page, but an admin will have the ability to remove an existing post. Note that private post will not show up here and can't be removed by admin. "View content" will direct you to the posting page.

### Map

On every page, a map will be shown on the right. The map can be moved around by holding and dragging the cursor. A user can also zoom in or zoom out of the map by scrolling the mouse. The map contains different location markers corresponding to each page. Each marker corresponds to a specific post. Clicking on any of the markers will show a popup box with the post's
title and date. In the editing mode, a user can click on anywhere of the map to generate a new marker. Note that map will be initialize on Toronto, for posts that has location not in Toronto, user needs to zoom out in order to see all of them. It is also possible for a post to not have a location, so the total number of marker on the map might be less than number of posts

#### Home Page

Contains the markers of all the public posts on the left side. Each marker corresponds to one post.

#### ViewPosting Page

Contains one marker of this specific post.

#### Profile Page

Contains the markers of all posts under all journeys of this user. Each journey has a different marker. That is, all the 
posts of one journey have one type of marker and are different from the posts of other journeys.

#### Journey Page

Contains the markers of all posts under this journey.

#### EditPosting Page

Existing Post - Contains the marker of the current location of this post. A user can click on anywhere on the map and a new
marker will show. This will change the current location of this post.

New Post - Contains no markers. A user can click on anywhere on this map and a new marker will show.

## External Libraries

### Frontend

- react
- react-router
- node-sass
- leaflet
- react-leaflet

### Backend

- bcrypt
- cloudinary: store images
- mongodb
- express-session
- mongoose
- connect-mongo
- cors
- dotenv
- express
- multer
- nodemon
- path

## Server API

### User

### `POST /api/user/login`

Log into a user account by username and password

body: `{ username, password }`

return: If success, return a user object that the current user logs into without password field.

note: If the active field of the user is false, login will fail

### `PUT /api/user/logout`

Log out the current user. This API is protected by session.

No data needed

return: nothing but a 200 status code

### `GET /api/user/:_id`

Get information about user with given _id.

return: If _id exist, return a user object without password field

### `PUT /api/user/:_id`

Modify the user information of the current user. Note that no matter what _id is given, the update will be applied on current login user. This API is protected by session.

formbody: the new data for the current user, available fields are `password, name, description, avatar`

Note that avatar needs to be a image file

return: New user object without password field

### `POST /api/user`

Create a new user

body: required fields are `username, password, name`

return: The user created without password field

### `GET /api/user/session/resume`

Get the user stored in session. This API is protected by session.

no body required

return: The user in session without password field

### `GET /api/user/:_id/journey`

Get all the journey of the user specified by _id.

no body required

return: An array of journey that belongs to that user

### `POST /api/user/:_id/journey`

Create a journey for the user specified by _id (If the user is not the current user, then the new journey will be created to the current user, not the user specified). This API is protected by session.

body: required field is `title`, optional fields is `color`. This API is protected by session.

return: The created journey

### `GET /api/user/:_id/posting`

Get all the postings of the user specified by _id.

no body required

return: An array of postings that belongs to that user (organized according to the journey)


### Posting

### `GET /api/posting`
Get all the public postings in this application.

query: `search, page`

- seach: (Optional) a string such that if it is specified, only the postings whose posting title, destination, author username, author name, journey title,or posting body contains the given seach string will get returned
- page: (Optional) which page of the postings can get returned 

return: An array of postings with the information

### `GET /api/posting/:_id`

Get information about posting with given _id (if the user is allowed to access it).

body: no body required

return: If _id exist and the current user is allowed to access it, return a posting object containing its associated data

### `POST /api/posting`

Create a new posting

body: required field is `title`, optional fields are `journey, date, body, public, images, longitude, latitude, destination`. This API is protected by session.

return: The posting created

### `PUT /api/posting`

Modify the posting information (if the current user can access that posting). This API is protected by session.

body: optional fields are `title, journey, date, body, public, images, longitude, latitude, createdTime, destination`. This API is protected by session.

return: New posting created

### `DELETE /api/posting/:_id`

Delete the posting specified by _id (if the current user can aceess that posting). If the deleted posting is the last posting in the journey, and the journey is not the default journey for its author, delete that journey as well. This API is protected by session.

no body required

return: The deleted posting

### `POST /api/posting/image`

Upload an image

form body: `{avatar: file}`

return: `{ imageId, url }`

### `DELETE /api/posting/image`

Delete an image

form body: `{ imageId, url }`

return: if success, return `{ imageId, url }`

### **Journey**

### `GET /api/journey/:_id`

Get the journey according to the journey id _id.

body: no body required

return: The journey required if it exists

### `PUT /api/journey/:_id`

Update journey specified by the journey id _id (If the user is authorized to update it). This API is protected by session.

body: optional fields is `title, color`. This API is protected by session.

### `DELETE /api/journey/:_id`

Deleted the journey specified by the journey id _id (If the user is authorized to delete it). All the postings under that journey will be changed to the default journey of the user. This API is protected by session.

body: no body required.

return: The deleted journey


### Admin

### `GET /api/admin/user`

Get an array of users based on query. This API is protected by session and the user in session needs to be admin

query: `search: String`

return: Return an array of user objects without password field. Search will be apply to username name and id

### `PUT /api/admin/user/:_id`

Modify the given user's role or active. This API is protected by session and the user in session needs to be admin

body: data to modify. availiable fields are role and active

return updated user without password field

### `GET /api/admin/posting`

Get all the public postings in this application. This API is protected by session and the user in session needs to be admin

query: `search, page`

- seach: (Optional) a string such that if it is specified, only the postings whose posting title, destination, author username, author name, journey title,or posting body contains the given seach string will get returned
- page: (Optional) which page of the postings can get returned 

return: An array of postings with the information

### `GET /api/admin/posting/:_id`

Get information about posting with given _id. This API is protected by session and the user in session needs to be admin

body: no body required

return: If _id exist, return a posting object containing its associated data

### `DEL /api/admin/posting/:_id`

Delete the posting specified by _id. If the deleted posting is the last posting in the journey, and the journey is not the default journey for its author, delete that journey as well. This API is protected by session and the user in session needs to be admin

no body required

return: The deleted posting


