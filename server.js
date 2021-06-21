// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let notes = [];

// Routes

// route that gets user to the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Displays all notes
// read file async
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "db/db.json"))
);

// saves new note to test database not JSON file
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  notes.push(newNote);
  writeFileAsync(path.join(__dirname, "db/db.json"), JSON.stringify(notes));
  res.json(newNote);
});

// delete route
app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter((note) => note.id !== req.params.id);
  writeFileAsync(path.join(__dirname, "db/db.json"), JSON.stringify(notes));
  res.sendStatus(200);
});

// route that gets user to homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
