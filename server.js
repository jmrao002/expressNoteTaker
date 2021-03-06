// dependecies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static("./static/"));

// shorteners
const dirPub = path.join(__dirname, "/public");
const dbPath = "./db/db.json";
let notes = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// HTML Routes
// Displays notes page
app.get("/notes", (req, res) => res.sendFile(path.join(dirPub, "notes.html")));

// Displays all notes by returning all data in the database
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, dbPath));
});

// Basic route that sends user to the first page
app.get("*", (req, res) => res.sendFile(path.join(dirPub, "index.html")));

// API routes
// Create new notes and return
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uuidv4();
  notes.push(newNote);
  // pushes updated data to database
  fs.writeFileSync(dbPath, JSON.stringify(notes));
  res.json(notes);
});

// Deletes notes
app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter((note) => note.id !== req.params.id);
  fs.writeFileSync(path.join(__dirname, dbPath), JSON.stringify(notes));
  res.json(notes);
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
