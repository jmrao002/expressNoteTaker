// dependecies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
);

// Displays all notes by return all data in the database
app.get("/api/notes", (req, res) => res.json(notes));

// Gets a specific note from the notes database
app.get("/api/notes/:id", (req, res) => {
  let recordedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(recordedNotes[Number(req.params.id)]);
});

// Basic route that sends user to the first page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
);

// Create new notes
app.post("/api/notes", (req, res) => {
  let recordedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = savedNotes.length.toString();
  newNote.id = uniqueID;
  recordedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(recordedNotes));
  res.json(recordedNotes);
});

// Delete notes
app.delete("/api/notes/:id", function (req, res) {
  let recordedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  console.log(`Deleting note with ID ${noteID}`);
  recordedNotes = recordedNotes.filter((currNote) => {
    return currNote.id != noteID;
  });

  for (currNote of recordedNotes) {
    currNote.id = newID.toString();
    newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(recordedNotes));
  res.json(recordedNotes);
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
