import ShowNotes from "../components/ShowNotes";
import "./Home.css";

const Home = ({data, setData}) => {
  return (
    <div>
      <ShowNotes notesList={data} setNotesList={setData} />
    </div>
  )
}

export default Home
