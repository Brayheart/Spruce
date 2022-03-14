const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./database');

const port = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
    let sql = "SELECT * FROM Customers";
    db.query(sql, function(err, results){
        if (err) throw err;
        res.send(results);
    });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const type = req.body.type;
  const date = req.body.date;
  const time = req.body.time;

  db.query(
    "INSERT INTO customers (name, email, address, city, state, zip, type, date, time) VALUES (?,?,?,?,?,?,?,?,?)",
    [name, email, address, city, state, zip, type, date, time],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/customers", (req, res) => {
  db.query("SELECT * FROM Customers ORDER BY date ASC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Yey, your server is running on port ${port}`);
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "DROP TABLE IF EXISTS customers";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");
    });

    var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), address VARCHAR(255), city VARCHAR(255), state VARCHAR(255), zip VARCHAR(255), type VARCHAR(255), date VARCHAR(255), time VARCHAR(255))";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

    var values = [
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/14/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/17/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/12/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/12/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/15/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/12/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/12/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/14/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/12/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/22/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/12/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/12/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/02/2022', '11:11PM'],
      ['Tyler', 'tylerhbray@gmail.com', '1234 Fake Dr', 'new york', 'NY', '90382', 'dog walker', '12/12/2022', '11:11PM'],
    ];

    var sql = "INSERT INTO customers (name, email, address, city, state, zip, type, date, time ) VALUES ?";
    db.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
});
