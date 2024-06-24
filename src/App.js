import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import EditPage from "./pages/EditPage";
import Home from "./pages/Home";
import api from "./api/menu";
// import nav_data from "./data/nav_data.json";
import { useEffect, useState } from "react";
// import axios from 'axios'

function App() {
  // const data = nav_data;
  const [menuData, setMenuData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  
  useEffect(() => {
    // fetch("http://localhost:3030/menu")
    //   .then((response) => response.json())
    //   .then((data) => setMenuData(data));

    const retrieveMenu = async () => {
      try {
        const response = await api.get("/getMenus");
        setMenuData(response.data);
      } catch (error) {
        console.error("Failed to fetch the Menu", error);
      }
    };

    const retriveNotes = async () => {
      try{
        const response = await api.get("/getNotes")
        setNotesData(response.data);
      } catch (error) {
        console.error("Failed to load the Notes", error);
      }
    }

    retrieveMenu();
    retriveNotes();
  }, []);

  return (
    <div className="App">
      <Header data={menuData} />
      <div className="content-main">
        <Routes>
          <Route path="/" element={<Home data={notesData} setData={setNotesData} />} />
          <Route
            path="/edit-menu"
            element={<EditPage data={menuData} setData={setMenuData} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
