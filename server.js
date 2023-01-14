// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
// Enable All CORS Requests
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Setup empty JS object to act as endpoint for all routes
const proData = {};
// Initialize the main project folder
app.use(express.static("./website"));
// Callback function to complete GET '/all'
// GET Route
app.get("/getAll", (request, response) => response.status(200).send(proData));
// GET Route
app.post("/addAll", (request, response) => {
    proData = request.body;
    console.log(proData);
    response.status(200).send(proData);
  });
const port = 4000;
const hostname = "localhost";
// function to test the server 
const list = () =>{
   console.log(`Server running at http://${hostname}:${port}/`);
}
// spin up the server
app.listen(port, list);