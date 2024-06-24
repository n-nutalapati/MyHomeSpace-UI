import { useState } from "react";
import BoxNote from "./BoxNote";
import "./ShowNotes.css";
import ModifyNotes from "./ModifyNotes";
import api from "../api/menu";

const ShowNotes = ({notesList, setNotesList}) => {
 
  const [modifyToggle, setModifyToggle] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [search, setSearch] = useState("")

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try{
      const response = await api.delete(`/deleteNote/${id}`);
      setNotesList(notesList.filter((data) => data.id !== id));
      console.log(response.data);
    }catch (error){
      console.error("error whie deleting the note of id: "+ id, error);
    }
    
  };

  const handleNoteEdit = (idx) => {
    setNoteToEdit(idx);
    setModifyToggle(!modifyToggle)
  }

  return (
    <div className="shownotes">
      <div className="top">
      <form>
              <input
                name="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                autoFocus
                autoComplete="off"
              />
      </form>
      <button onClick={() => setModifyToggle(!modifyToggle)}>Add Note</button>
      </div>
      <div>
        {notesList && notesList.filter((note) => {
          return search.toLowerCase() === '' ? note : note.title.toLowerCase().includes(search);
        }).map((note, i) => (
          <BoxNote key={i} notes={note} handleDelete={handleDelete} handleNoteEdit={handleNoteEdit} />
        ))}
      </div>
      {modifyToggle && (
        <ModifyNotes
          closeForm={() => {
            setModifyToggle(!modifyToggle);
          }}
          notesList={notesList}
          setNotesList={setNotesList}
          editDefaultValue={ noteToEdit !== null && notesList.filter((note)=>note.id === noteToEdit)}
          noteToEdit={noteToEdit}
          setNoteToEdit={setNoteToEdit}
        />
      )}
      {/* {JSON.stringify(notesList)} */}
    </div>
  );
};

export default ShowNotes;
