// dependecies
const express = require("express");
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Notes (DATA)

const notes = [
  {
    routeName: "note",
    title: "Sample Title",
    text: "Sample Text",
  },
];

// Routes
// Basic route that sends user to the first page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
);

// Displays all notes by return all data in the database
app.get("/api/notes", (req, res) => res.json(notes));

// Gets a specific note from the notes database
app.get("/api/notes/:note", (req, res) => {
  // assign route parameter to variable
  const recorded = req.params.note;
  // find note in our array of notes
  const recordedNote =
    notes.find((note) => note.routeName === recorded) || false;
  // return the found object in the array
  return res.json(recordedNote);
});

// Create new notes
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  // newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  notes.push(newNote);
  res.json(newNote);
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));