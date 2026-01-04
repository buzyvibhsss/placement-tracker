console.log(">>> THIS backend/index.js IS RUNNING <<<");

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

/* Get all companies */
app.get("/companies", (req, res) => {
  db.query("SELECT * FROM companies", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

/* Add company */
app.post("/companies", (req, res) => {
  const { name, role, status } = req.body;

  if (!name || !role || !status) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql =
    "INSERT INTO companies (name, role, status) VALUES (?, ?, ?)";

  db.query(sql, [name, role, status], (err, result) => {
    if (err) {
      console.log("Insert error:", err);
      return res.status(500).send(err);
    }

    res.json({
      id: result.insertId,
      name,
      role,
      status
    });
  });
});

/* Update status */
app.put("/companies/:id", (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE companies SET status=? WHERE id=?",
    [status, id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.json({ message: "Updated" });
    }
  );
});

/* Delete company */
app.delete("/companies/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM companies WHERE id=?", [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ message: "Deleted" });
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
