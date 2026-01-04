const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",        
  user: "root",            
  password: "Database123",  
  database: "placement_tracker"
});

db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err);
  } else {
    console.log("MySQL connected");
  }
});

module.exports = db;
