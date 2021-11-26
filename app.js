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
app.use(express.static(path.join(__dirname, "/vojaganto/build")));

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