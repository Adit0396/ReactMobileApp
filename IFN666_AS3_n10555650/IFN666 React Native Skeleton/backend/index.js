const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "aditya123",
  database: "stock",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  db.query(
    "INSERT INTO users (username,password,name) VALUES (?,?,?)",
    [username, password, name],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        res.send({ message: "Success" });
      } else {
        res.send({ message: "Unsuccessful" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * from users WHERE username = ? AND password  =?",
    [username, password],
    (err, result) => {
      console.log("Success");
      if (err) {
        console.log(err);
      }

      if (result) {
        if (Object.keys(result).length == 0) {
          res.send({ message: "Details not Valid" });
        } else {
          res.send(result);
        }
      } else {
        res.send({ message: "Details not Valid" });
      }

      console.log("Success");
    }
  );
});

app.listen(3001, () => {
  console.log("Starting server");
});