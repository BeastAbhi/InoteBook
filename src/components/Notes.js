import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  const [note, setNote] = useState({id: "",etitle: "", edescription:"",etag:""})
  useEffect(() => {
    getNote();
    // eslint-disable-next-line
  }, []);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
      setNote({id: currentNote._id, etitle: currentNote.title,edescription: currentNote.description, etag : currentNote.tag})
  }

  const onChange = (e) =>{
    setNote({
        ...note, [e.target.name]: e.target.value
    })
  }
  const handleClick = (e) => {
        refClose.current.click()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Note Updated","success");
  };

  return (
    <div>
      <AddNote showAlert={props.showAlert}/>

      <div
        className="modal fade none"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick} ref={refClose}>
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my3">
        <h2> Your notes</h2>
          {/* The && in the below line is becouse ther is no else condition in the line */}
          <div className="mx-3">
              {notes.length === 0 && 'No Notes to Display'}
          </div>
        {notes.map((notes) => {
          return <Noteitem key={notes._id} updateNote = {updateNote} note={notes} showAlert={props.showAlert}/>;
        })}
      </div>
    </div>
  );
}

export default Notes;
