import express, { static } from "express";
import { urlencoded, json } from "body-parser";
import { connect } from "mongoose";
import { join } from 'path';
import * as db from './models'
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(static("public"));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
connect(process.env.MONGODB_URI || "mongodb://localhost/bittokaDB");

app.post('/api/users', (req, res) => {
  console.log(req.body)
  res.send('posted to /api/users')
})

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, './client/build/index.html'))
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
