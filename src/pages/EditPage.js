import "./EditPage.css";
import AddUpdateForm from "../components/AddUpdateForm";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/menu";

const EditPage = ({ data, setData }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleClick = () => {
    setOpenUpdate(!openUpdate);
  };

  const handleDeleteMenu = async (targetId) => {
    try {
      // await api.delete(`/menu/${targetId}`);
      console.log(targetId)
      const response = await api.delete(`/deleteMenu/${targetId}`);
      console.log(response);
      setData(data.filter((item) => item.id !== targetId));
    } catch (error) {
      console.error("Error while deleting the record: ", error);
    }
  };

  const handleRowToEdit = (idx) => {
    setRowToEdit(idx);
    setOpenUpdate(true);
  };

  return (
    <div>
      <div className="menu-card">
        <h2>Edit Menu</h2>
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
        <Link to="/">
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
