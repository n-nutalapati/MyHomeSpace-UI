import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ShowNotes from "../components/ShowNotes";
import Loading from "../assets/Loading.gif";
// import api from "../api/menu";
import "./Home.css";
import ApiService from "../service/ApiService";

const Home = () => {

  const [menuData, setMenuData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {

    const retrieveMenu = async () => {
      try {
        // const response = await api.get("/getMenus");
        setLoading(true);
        // const response = await api.get("/mdb/getMenus");

        const response = await ApiService.getMenus(userId, token)

        setLoading(false);
        setMenuData(response);

        console.log(response)

      } catch (error) {
        // alert("Failed to fetch the Menu", error);
        setLoading(false)
        console.error("Failed to fetch the Menu", error);
      }
    };

    retrieveMenu();
  }, [userId, token]);



  useEffect(() => {

    const retriveNotes =  async () => {
      
      try{
        // const response = await api.get("/getNotes")
        setLoading(true);
        // const response = await api.get("/mdb/getNotes") //from db
        const response = await ApiService.getNotes(userId, token)
        setLoading(false)
        setNotesData(response);

      } catch (error) {
        // alert("Failed to load the Notes", error);
        setLoading(false)
        console.error("Failed to load the Notes", error);
      }
    }

    retriveNotes();
  }, [userId, token]);

  return (
    <div>
      <div className={loading ? "loading-container" : "inactive"}>
        {loading && <img src={Loading} alt="Loading.."/>}
      </div>
      <NavBar  data={menuData} />
      <ShowNotes notesList={notesData} setNotesList={setNotesData} /* isUpdated={isUpdated} setIsUpdated={setIsUpdated} */ />
    </div>
  )
}

export default Home
