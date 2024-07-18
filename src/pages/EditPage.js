import "./EditPage.css";
import AddUpdateForm from "../components/AddUpdateForm";
import MenuItem from "../components/MenuItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../assets/Loading.gif"
// import api from "../api/menu";
import ApiService from "../service/ApiService";

const EditPage = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const [data, setData] = useState([]);
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
        setData(response);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch the Menu", error);
        setLoading(false)
      }
    };
    retrieveMenu();
  }, [userId, token]);

  const handleClick = () => {
    setOpenUpdate(!openUpdate);
  };

  const handleDeleteMenu = async (targetId) => {
    try {
      // await api.delete(`/menu/${targetId}`);
      // const response = await api.delete(`/deleteMenu/${targetId}`);
      // const response = await api.delete(`/mdb/deleteMenu/${targetId}`);
      setLoading(true)
      const response = await ApiService.deleteMenu(targetId, token);
      setLoading(false)
      alert(response);
      setData(data.filter((item) => item.id !== targetId));

    } catch (error) {
      alert("Error while deleting the record: ", error);
      console.error("Error while deleting the record: ", error);
    }
  };

  const handleRowToEdit = (idx) => {
    setRowToEdit(idx);
    setOpenUpdate(true);
  };

  return (
    <div>
      <div className={loading ? "loading-container" : "inactive"}>
        {loading && <img src={Loading} alt="Loading.."/>}
      </div>
      <div className="menu-card">
        <h1>Edit Menu</h1>
        <div>
          {data.map((item, id) => (
            <MenuItem
              key={id}
              item={item}
              handleClick={handleClick}
              deleteMenu={handleDeleteMenu}
              editRow={handleRowToEdit}
            />
          ))}
          <button className="add" onClick={handleClick}>
            Add
          </button>
        </div>
        <Link to="/home">
          <button className="add">Return to Home</button>
        </Link>
      </div>
      {openUpdate && (
        <AddUpdateForm
          closeUpdatePage={() => {
            setOpenUpdate(!openUpdate);
            setRowToEdit(null);
          }}
          data={data}
          setData={setData}
          defaultValue={
            rowToEdit !== null && data.filter((item) => item.id === rowToEdit)
          }
          rowToEdit={rowToEdit}
        />
      )}
    </div>
  );
};

export default EditPage;