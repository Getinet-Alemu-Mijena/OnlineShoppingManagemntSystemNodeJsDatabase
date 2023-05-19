const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3050;
const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "payment",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL server");
  }
});
//This is my code