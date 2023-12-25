import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const {note, updateNote}= props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text"><small>Tag: {note.tag}</small></p>
          <i className="fa-regular fa-pen-to-square mx-2"  data-toggle="modal" data-target="#exampleModal"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => updateNote(note)}></i>
          <i className="fa-solid fa-trash-can mx-2" onClick={() =>{deleteNote(note._id);
          props.showAlert("Note Deleted","danger");}}></i>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
