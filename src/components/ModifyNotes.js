import { useState } from "react";
import api from "../api/menu";
import "./ModifyNotes.css";

const ModifyNotes = ({
  closeForm,
  notesList,
  setNotesList,
  editDefaultValue,
  noteToEdit,
  setNoteToEdit,
}) => {
  // const date = new Date();
  const [enteredNote, setEnteredNote] = useState(editDefaultValue[0] || {});

  const handleChange = (e) => {
    setEnteredNote((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noteToEdit === null) {
      if (enteredNote.title != null || enteredNote.content != null) {
        const response = await api.post("/createNote", enteredNote);
        let tempNote = enteredNote;
        tempNote.id = response.data;
        setNotesList((prev) => [...prev, tempNote]);
      }
    } else {
      try {
        const response = await api.put(
          `/updateNote/${noteToEdit}`,
          enteredNote
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error while editing: ", error);
      }

      setNotesList(
        notesList.map((curNote) => {
          if (curNote.id !== noteToEdit) return curNote;
          else return enteredNote;
        })
      );
      setNoteToEdit(null);
    }
    closeForm();
  };

  return (
    <div
      className="upd-container"
      onClick={(e) => {
        if (e.target.className === "upd-container") closeForm();
      }}
    >
      <div className="upd-page">
        <form>
          <div className="title-form-input">
            <div className="input-area">
              <input
                name="title"
                type="text"
                value={enteredNote.title || ""}
                onChange={(e) => handleChange(e)}
                autoFocus
                autoComplete="off"
              />
              <div className="label">Title</div>
            </div>
          </div>

          <div className="title-form-input">
            <div className="input-area">
              <textarea
                name="content"
                onChange={(e) => handleChange(e)}
                value={enteredNote.content || ""}
                autoComplete="off"
              />
              <div className="label">Content</div>
            </div>
          </div>
          <div className="button-container">
            <button onClick={(e) => handleSubmit(e)}>Save</button>
          </div>
        </form>
        {/* {JSON.stringify(enteredNote)} */}
      </div>
    </div>
  );
};

export default ModifyNotes;
