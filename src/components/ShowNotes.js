import { useState } from "react";
import BoxNote from "./BoxNote";
import "./ShowNotes.css";
import ModifyNotes from "./ModifyNotes";
// import api from "../api/menu";
import ApiService from "../service/ApiService";
import Loading from "../assets/Loading.gif"

const ShowNotes = ({notesList, setNotesList /*, isUpdated, setIsUpdated */}) => {
 
  const [modifyToggle, setModifyToggle] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try{
      setLoading(true);
      // const response = await api.delete(`/deleteNote/${id}`);
      // const response = await api.delete(`/mdb/deleteNote/${id}`);
      const response = await ApiService.deleteNote(id, token);

      setNotesList(notesList.filter((data) => data.id !== id));
      setLoading(false);
      alert(response);
    }catch (error){
      console.error("error whie deleting the note of id: "+ id, error);
      setLoading(false);
      alert("Error: "+ error)
    }
    
  };

  const handleNoteEdit = (idx) => {
    setNoteToEdit(idx);
    setModifyToggle(!modifyToggle)
  }

  return (
    <div className="shownotes">
      <div className={loading ? "loading-container" : "inactive"}>
        {loading && <img src={Loading} alt="Loading.."/>}
      </div>
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
          // isUpdated={isUpdated}
          // setIsUpdated={setIsUpdated}
        />
      )}
      {/* {JSON.stringify(notesList)} */}
    </div>
  );
};

export default ShowNotes;
