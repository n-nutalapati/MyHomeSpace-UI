import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import EditPage from "./pages/EditPage";
import Home from "./pages/Home";

import LoginPage from "./pages/LoginPage";
import UserService from "./service/UserService";
import UserProfile from "./pages/UserProfile";
import PublicHome from "./pages/PublicHome";
import RegistrationPage from "./pages/RegistrationPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";
import UserUpdatePage from "./pages/UserUpdatePage";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-main">
        <Routes>
          <Route exact path="/" element={<PublicHome />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegistrationPage />} />
          <Route exact path="/not-found" element={<NotFoundPage />} />
          {
            UserService.isAuthenticated() &&
            <>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/edit-menu" element={<EditPage />} />
              <Route exact path="/profile" element={<UserProfile />} />
            </>
          }
          {
            UserService.adminOnly() && 
            <>
              <Route exact path="/admin/users" element={<AdminPage />} />
              <Route path="/update-user/:userId" element={<UserUpdatePage />} />
            </>
          }
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;