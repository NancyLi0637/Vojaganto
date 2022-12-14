const express = require("express");
const cors = require("cors");


require("dotenv").config({ path: "./config/.env" });

const app = express();

app.use(cors());
app.use(express.json());


const { mongoose } = require('./db')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.


// Serve the build
const path = require('path')
app.use(express.static(path.join(__dirname, "vojaganto/build")));

// session
const session = require("express-session")
const MongoStore = require('connect-mongo')
app.use(
  session({
      secret: process.env.SESSION_SECRET || "our hardcoded secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 1800000,
          httpOnly: true
      },
      // store the sessions on the database
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/csc309-project' })
  })
);

// set up image upload
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const userRoute = require('./api/user')
const adminRoute = require('./api/admin')
const journeyRoute = require('./api/journey')
const postingRoute = require('./api/posting')

app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/journey', journeyRoute)
app.use('/api/posting', postingRoute)


// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    // const goodPageRoutes = ["/", "/login", "/dashboard"];
    // if (!goodPageRoutes.includes(req.url)) {
    //     // if url not in expected page routes, set status to 404.
    //     res.status(404);
    // }

    // send index.html
    res.sendFile(path.join(__dirname, "/vojaganto/build/index.html"));
});




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`[${new Date().toISOString().substr(11, 8)}] Listening on port ${port}`)
});