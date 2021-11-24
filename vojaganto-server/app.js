const express = require("express");
const cors = require("cors");


require("dotenv").config({ path: "./config/.env" });

const app = express();

app.use(cors());
app.use(express.json());


const { mongoose } = require('./db')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`[${new Date().toISOString().substr(11, 8)}] Listening on port ${port}`)
});