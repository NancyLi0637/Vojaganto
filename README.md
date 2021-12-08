# **team28 - Vojaĝanto App**

Vojaĝanto is travel-journal app for people who enjoy travelling and who want to share their adventures on map.

## **Deployed Website**

https://vojaganto.herokuapp.com/


## **Setup Instruction**

The Express server will serve the static files generated by React build. Use the following commands to setup the program.

This app requires mongoDB, please have a local database at port 27017

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
# In folder vojaganto
npm install react-leaflet@2.8.0

# Open package.json and change react-leaftlet back to 2.6.0
# Then in folder vojaganto
npm install

# back to main root
npm run build-client

#start Express server
npm start
```

## **Test Credentials**

```sh
# User account
username: user
password: user

# Admin account
username: admin
password: admin
```

## **Views and Features**

### **Authentication**

#### **Log in**

At this phase, a user can only login with *user* as the username and password. Entering any other information will receive a warning. For admin account, use *admin* as the username and password. Note that this is in the deployed version, if use locally, please create account first.

#### **Register**

Leaving the fields empty or entering *user* or *admin* as a username will receive a warning. Any other info can be used to register an account, but will only have a "Registered" message logged in the console. In phase 2, we will connect to a database for storing the registered information. All registered user will be marked as normal client when first registered. Please use the user management in admin page to change a user into admin. If running locally, please do so by directly modify the database and change the *role* attribute to *admin*

### **Home Page** `/`

This page is the entrance for an user to access an existing account. On the right side of this page is a map which will be introduced at the end of this file.

#### **View a public post**

On the left side are all the public postings posted by all users. A user can click into any of the postings to view it without logging into an account. All posts are sorted by the oldest to newest.

#### **Search public posts**

On the left side of the login button is a search bar, where a user can search related postings using this search bar. Clicking on search will return related postings
in the same view as the pre-existing ones below.

#### **Login as User**

To login into or register an account, a user will simply click the "LOGIN | REGISTER" button on the top right of the left view. A user can click "Cancel" to exit the login window. Note that the session only exist for 30min, please login again after that

#### **Register an User Account**

A user can register an account by clicking "Click here to register" in the login in popup. Clicking on the "Cancel" button will exit the register window and return to the login window.

#### **Log out**

Once a user logs in, the original login/register button will be changed to a "Log out” button. A user can click this button to log out of the account.

#### **Navbar**

Once a user logs in, a navigation bar will appear at the bottom of the page. Clicking on the "Home" will be directed to the Home page and clicking on the "Profile" will be directed to the Profile Page. Clicking on the pencil button beside the nav bar will allow a user to create a new post, which is further explained in the next section.

### **View Postings**

Posting, or *trip*, refers to an article that is posted by a user to record their trip. It contains information including the title, the date, the journey, the author, the destination, the images, and the body.

#### **View Individual Posting** `/trip/:pid`

User can view the posting of the corresponding `pid`, e.g., accessing `/trip/1` will display the posting with pid 1; in mock, there is only one posting and will not be varied by pid. Note that there are images for a post, if there are multiple images there will be a scrollbar under images so that user can slide them horizontolly. The client can click on the journey name to access the journey page and click on the author name to see the author's profile

#### **Edit Posting** `/edit`

The author of a posting will see an "Edit" button in the View Posting page. The old contents will be loaded to the editing page and user can update or delete the posting. The first image will be the cover image in Home Page.

#### **Create Posting** `/new-posting`

A logged-in user can create new posting by clicking the "pen" button on the navbar.

#### **Journey Page** `/journey/:jid`

A journey page contains a collection of postings with the same journey category tag (each category corresponds to a jid). This page can be access from user profile page and click on a journey's title or from a posting and click the journey name. When user is at a posting view page or a profile page, they can enter the journey page by pressing the journey category tag, and they will be directed to the journey page with the correponding jid; User can access the corresponding posting pages by clicking the postings on journey page; In mock, there is only one journey page and the content will not be varied by jid

### **Profile Page**

Profile page contains the user information (avatar, username, nickname, user description) and the postings posted by the user (organized according to its journey category tag); Only the user themselves can edit that profile page, and if a person is not logged in to the corresponding user account but accessed it directly through url extension `/profile/uid`, that user can only see the posting and profile information without permission to edit anything.

#### **View Profile** `/profile/uid`

This is the page that displays the profile of the user whose user id is the uid from the url. This page can be access from any post by click on the author name or click the profile button on nav bar as a logged-in user. If the current user logged in as the owner of the profile, he/she will see a edit profile button on the top right corner of the profile page.

#### **Edit Profile**

This is a modal that hovers on the view profile page, and the user will be able to modify the avatar, nickname and self description on that modal (the user will not be allowed to change the username); After successfully modifying the user profile, message will appear on the top of browserto indicate that the user profile has been modified, and the profile information on the view profile page will be modified once the page is auto refreshed.

### **Admin**

There is no direct access methods from client pages to the admin dashboard. The only way to access admin dashboard is to access `/admin/login` route.

There are four pages for the admin dashboard: login, home, user management, and post management. If an user tries to access pages other than the login page without using the admin account, the user will be redirected to the admin login page.

#### **Admin Login** `/admin/login`

The admin account has *admin* as both the username and the password. Login with other username or password will only show a warning.

#### **Admin Home Page** `/admin/home`

There is nothing on the home page except a welcome message with the current admin name and the navbar.

#### **Users Management Page** `/admin/users`

This page will have a table showing all users we have, and their info such as the username, the nickname and the last login time. There are two ways to manage a user: switch its role and ban/unban it. The button `Inactive` will ban a user so that he will not be able to login. If a user is currently banned, the button become `Active` which can be used by admin to unban the user. The other button is to set a user to admin or client and it works in the same way as ban/unban button

#### **Postings Management Page** `/admin/postings`

This page is the same as the users management page, but an admin will have the ability to remove an existing post. Note that private post will not show up here and can't be removed by admin

### **Map**

On every page, a map will be shown on the right. The map can be moved around by holding and dragging the cursor. A user 
can also zoom in or zoom out of the map by scrolling the mouse. The map contains different location markers corresponding 
to each page. Each marker corresponds to a specific post. Clicking on any of the markers will show a popup box with the post's
title and date. In the editing mode, a user can click on anywhere of the map to generate a new marker.

#### **Home Page**
Contains the markers of all the public posts on the left side. Each marker corresponds to one post.

#### **ViewPosting Page**
Contains one marker of this specific post.

#### **Profile Page**
Contains the markers of all posts under all journeys of this user. Each journey has a different marker. That is, all the 
posts of one journey have one type of marker and are different from the posts of other journeys.

#### **Journey Page**
Contains the markers of all posts under this journey.

#### **EditPosting Page**
Existing Post - Contains the marker of the current location of this post. A user can click on anywhere on the map and a new
marker will show. This will change the current location of this post.

New Post - Contains no markers. A user can click on anywhere on this map and a new marker will show.

## **External Libraries**

### **Front End**

- react
- react-dom
- react-router
- react-router-dom
- react-scripts
- node-sass
- material UI: basically for icons.
- leaflet
- react-leaflet
- web-vitals
- jest

### **Back End**

- bcrypt
- cloudinary
- connect-mongo
- cors
- dotenv
- express
- express-session
- mongodb
- mongoose
- multer
- nodemon
- path

## **Feature List**

### **Client App Features**

- [ ] Login client
- [ ] Register client
- [ ] Logout client
- [ ] Home page postings
  - [ ] View all
  - [ ] View map markers
  - [ ] Search
  - [ ] Pagination
  - [ ] Public only
- [ ] View posting
  - [ ] Content
  - [ ] Link to journey and author
  - [ ] Map marker
  - [ ] Edit privilege to author
  - [ ] Private privilege to author
- [ ] Create posting
  - [ ] Input content
  - [ ] Get journeys
  - [ ] Upload image
  - [ ] Delete image
  - [ ] Add marker to map
- [ ] Edit posting
  - [ ] Load existing data to input
  - [ ] Update content
  - [ ] Delete posting
- [ ] Profile
  - [ ] View profile
  - [ ] View map markers
  - [ ] Edit privilege to author
  - [ ] Private privilege to author
- [ ] Edit Profile
  - [ ] Update content
  - [ ] Update avatar
- [ ] Journey
  - [ ] Create journey
    - [ ] Unique name under a user
  - [ ] View postings and markers
  - [ ] Private privilege to author
  - [ ] Edit privilege to author
  - [ ] Update title
  - [ ] Delete Journey
    - [ ] Safe move postings to default
    - [ ] Cannot delete defaultJourney

### **Admin Dashboard Features**

- [ ] Admin login
- [ ] Admin logout
- [ ] View all postings
  - [ ] View info
  - [ ] Search
  - [ ] Pagination
  - [ ] Delete posting
  - [ ] View content
- [ ] View all users
  - [ ] View info
  - [ ] Search
  - [ ] Pagination
  - [ ] Activate/Inactivate users
  - [ ] Change user role

## **Server API**

### **User**

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

### `PUT /api/user`

Modify the user information of the current user. This API is protected by session.

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

### **Posting**

### **Journey**

### **Admin**

### `GET /api/admin/user`

Get an array of users based on query. This API is protected by session and the user in session needs to be admin

query: `search: String`

return: Return an array of user objects without password field. Search will be apply to username name and id

### `PUT /api/admin/user/:_id`

Modify the given user's role or active. This API is protected by session and the user in session needs to be admin

body: data to modify. availiable fields are role and active

return updated user without password field