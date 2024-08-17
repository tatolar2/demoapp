//import express

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//configure mysql2 database
const mysql = require("mysql2");
// Create a connection parameter
const dbConfig = {
  host: "127.0.0.1",
  user: "demoapp",
  password: "123456",
  database: "demoapp",
  waitForConnections: true,
  queueLimit: 0,
};
//create the connection database
const connection = mysql.createConnection(dbConfig);
// connect to the database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

// Middleware used to prepair data as a json format and it should come/write before app.get or app.post request
app.use(express.json());

//create a simple get request handler to send a response back
app.get("/", (req, res) => {
  res.send(`testing`);
});
//post request handler to add a new employee to the database
app.post("/add-employee", (req, res) => {
  console.log(req.body);
  // Write the SQL query to add to the database table named employee_test
  const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES ('${req.body.first_name}', '${req.body.last_name} ', '${req.body.email} ', '${req.body.password} ')`;

  // Execute the query
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  //send a response back to the client
  const response = {
    status: "success",
    message: "employee added succesefully",
  };
  res.status(200).json(response);
});
//post request handler to login an employee to the database

app.post("/login", (req, res) => {
  console.log(req.body);
  // Write the SQL query to retrive employee email and password provided by the user and compare it with the data in the database
  const sql = `SELECT * FROM employee_test WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;

  // Execute the query
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    // Check if the result is empty or not
    if (result.length > 0) {
      // Send a response back to the client

      const response = {
        status: "success",
        message: "Login successful",
      };
      res.status(200).json(response);
    } else {
      // Send a response back to the client
      const response2 = {
        status: "failure",
        message: "Login failed",
      };

      res.status(200).json(response2);
    }
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
