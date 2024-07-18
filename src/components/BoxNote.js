import "./BoxNote.css";

const BoxNote = ({ notes, handleDelete, handleNoteEdit }) => {
  return (
    <div className="boxnote">
      <div className="title">
        <span>{notes.title}</span>
        <span className="buttons">
          <button className="update" onClick={()=> handleNoteEdit(notes.id) } >Edit</button>
          <button className="delete" onClick={(e)=> handleDelete(e, notes.id)}>Delete</button>
        </span>
      </div>
      <div>
        <p>
          {notes.content}
        </p>
      </div>
    </div>
  );
};

export default BoxNote;