import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
const notesInitial = []
const  [notes, setNotes] = useState(notesInitial)

//Get all note
const getNote = async () =>{
  //Api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5OTYxYTE0MTUwMTBkYmRiZTllYWQzIn0sImlhdCI6MTY4Nzk0MDcwMX0.dhKJFGs0JRBQf1PFRl61Fsns6gZ2MDjhlxjpf-T59mM'
    },
  });
  const json = await response.json()
  //Logic to add notes

    setNotes(json)
}

//Add note
const addNote = async (title, description, tag) =>{
  //Api call
  const response = await fetch(`${host}/api/notes/addnote`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5OTYxYTE0MTUwMTBkYmRiZTllYWQzIn0sImlhdCI6MTY4Nzk0MDcwMX0.dhKJFGs0JRBQf1PFRl61Fsns6gZ2MDjhlxjpf-T59mM'
    },
    body: JSON.stringify({title, description, tag})
  });
  const json = await response.json();
  //Logic to add notes
  let note = json
  setNotes(notes.concat(note))
}
//Delete a note
const deleteNote = async (id) =>{
  //API call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5OTYxYTE0MTUwMTBkYmRiZTllYWQzIn0sImlhdCI6MTY4Nzk0MDcwMX0.dhKJFGs0JRBQf1PFRl61Fsns6gZ2MDjhlxjpf-T59mM'
    },
  });
  const json = await response.json();
  //Logic to delete note
  const newNotes = notes.filter((notes) => {return notes._id !== id})
  setNotes(newNotes)
}
//Edit a note
const editNote = async (id, title, description, tag) =>{
  //API call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5OTYxYTE0MTUwMTBkYmRiZTllYWQzIn0sImlhdCI6MTY4Nzk0MDcwMX0.dhKJFGs0JRBQf1PFRl61Fsns6gZ2MDjhlxjpf-T59mM'
    },
    body: JSON.stringify({title, description, tag})
  });
  const json = await response.json();
  //the below line is for making deep copy of notes which will display changes in the note imagetely
  let newNods = JSON.parse(JSON.stringify(notes))
  //Logic to edit notes
    for (let index = 0; index < newNods.length; index++) {
      const element = newNods[index];
      if(element._id === id)
      {
        newNods[index].title = title;
        newNods[index].description = description;
        newNods[index].tag = tag;
        break;
      } 
    }
    setNotes(newNods)
}
  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>{props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
