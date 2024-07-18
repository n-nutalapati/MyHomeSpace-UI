import { useCallback, useEffect, useState } from "react";
import "./AdminPage.css";
import Loading from "../assets/Loading.gif";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const retriveAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await UserService.getAllUers(token);
      setLoading(false);
      setUsersList(response.myUsersList);
    } catch (error) {
      setLoading(false);
      console.error("error while fetching all users: ", error);
    }
  }, [token]);

  useEffect(() => {
    retriveAllUsers();
  }, [retriveAllUsers]);

  // const retriveAllUsers = async () => {
  //   try {
  //     console.log("inside all users")
  //     setLoading(true);
  //     const response = await UserService.getAllUers(token);
  //     console.log(response)
  //     setLoading(false);
  //     setUsersList(response.myUsersList);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("error while fetching all users: ", error);
  //   }
  // };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (confirmDelete) {
        setLoading(true);
        await UserService.deleteUser(userId, token);
        setLoading(false);
        retriveAllUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-page-container">
      <div className={loading ? "loading-container" : "inactive"}>
        {loading && <img src={Loading} alt="Loading.." />}
      </div>
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div className="buttons">
                  <Link to={`/update-user/${user.id}`}>
                    <button className="update">Update</button>
                  </Link>
                  {user.role === "USER" && (
                    <button
                      className="delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
