import { useState } from "react";
import "./AddUpdateForm.css";
// import api from "../api/menu";
import ApiService from "../service/ApiService";

const AddUpdateForm = ({
  closeUpdatePage,
  data,
  setData,
  defaultValue,
  rowToEdit,
}) => {
  // const date = new Date();

  const [child, setChild] = useState( (rowToEdit && defaultValue[0].children) || []);
  const [enteredMenu, setEnteredMenu] = useState(defaultValue[0] || []);
  
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const handleMenuChange = (e) => {
    setEnteredMenu({
      // id: "M" + date.getTime(),
      userId: userId,
      name: e.target.value,
      children: [...child],
    });
  };

  const handleChildChange = (e, i) => {
    let newChildren = [...child];
    // newChildren[i].id = "C" + date.getTime();
    newChildren[i][e.target.name] = e.target.value;
    setChild(newChildren);

    setEnteredMenu((prev) => ({
      ...prev,
      children: [...child],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rowToEdit === null) {
      if (!validateForm()) return;
      try{
      // const response = await api.post('/menu', enteredMenu)
      // const response = await api.post('/createMenu', enteredMenu);
      // const response = await api.post('/mdb/createMenu', enteredMenu);

      const response = await ApiService.createMenu(enteredMenu, token);

      setData((prev) => [...prev, response]);
      // console.log( response.data);
      } catch(error){
        console.error("Error while submitting the row", error);
      }
    } else {
      try{
      // const response = await api.put(`/menu/${rowToEdit}`, enteredMenu);
      // const response = await api.put(`/updateMenu/${rowToEdit}`, enteredMenu);
      // const response = await api.put(`/mdb/updateMenu/${rowToEdit}`, enteredMenu);

      const response = await ApiService.updateMenu(rowToEdit, enteredMenu, token);
      
      setData(
        data.map((currRow) => {
          if (currRow.id !== rowToEdit) return currRow;
          return response;
        })
      );
      } catch(error){
        console.error("Error while editing the row", error)
      }
    }
    closeUpdatePage();
  };

  const validateForm = () => {
    if (enteredMenu.name) return true;
    else return false;
  };

  const handlePlus = (e) => {
    e.preventDefault();
    setChild([...child, {}]);
  };

  const handleChildDelete = (e, i, id) => {
    e.preventDefault();
    let newChild = child.filter((data, idx) => idx !== i);
    setChild(newChild);

    setEnteredMenu((prev) => ({
      ...prev,
      children: [...newChild],
    }));
  };

  return (
    <div
      className="upd-container"
      onClick={(e) => {
        if (e.target.className === "upd-container") closeUpdatePage();
      }}
    >
      <div className="upd-page">
        <form>
          <div className="title-form-input">
            <div className="input-area">
              <input
                name="name"
                type="text"
                value={enteredMenu.name || ""}
                onChange={(e) => handleMenuChange(e)}
                autoFocus
                autoComplete="off"
              />
              <div className="label">Menu Name</div>
            </div>
          </div>

          {child &&
            child.map((data, i) => {
              return (
                <div className="child-container" key={i}>
                  <div className="input-area">
                    <input
                      className="url-name"
                      name="name"
                      type="text"
                      value={data.name || ""}
                      onChange={(e) => handleChildChange(e, i)}
                      autoFocus
                      autoComplete="off"
                    />
                    <div className="label">Url Name</div>
                  </div>
                  <div className="input-area url-box">
                    <input
                      className="url"
                      name="url"
                      type="text"
                      value={data.url || ""}
                      onChange={(e) => handleChildChange(e, i)}
                      autoComplete="off"
                    />
                    <div className="label">Url</div>
                  </div>
                  <div>
                    <button
                      className="del-btn"
                      onClick={(e) => handleChildDelete(e, i, data.id)}
                    >
                      x
                    </button>
                  </div>
                </div>
              );
            })}
          <button className="plus-btn" onClick={(e) => handlePlus(e)}>
            +
          </button>

          <button
            className="sub-btn"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>
        {/* {JSON.stringify(enteredMenu)} */}
      </div>
    </div>
  );
};

export default AddUpdateForm;
