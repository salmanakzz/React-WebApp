import React from "react";
import MenuIcon from "../../assets/MenuIcon";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ user, userDetails }) {
  const navigate = useNavigate();

  // function used to trigger the side menu icon
  const toggleMenuOpen = () => document.body.classList.toggle("open");

  // function for redirecting to the user login page
  const userLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // function for redirecting to the admin login page
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };
  return (
    <>
      {user ? (
        <div>
          <div className="navbar-custom">
            <div className="navbar-overlay" onClick={toggleMenuOpen}></div>

            <button
              type="button"
              className="navbar-burger"
              onClick={toggleMenuOpen}
            >
              <span className="material-icons">
                <MenuIcon></MenuIcon>
              </span>
            </button>
            <h1 className="navbar-title">User Home</h1>
            <nav className="navbar-menu">
              <button type="button" className="active" onClick={userLogout}>
                Logout
              </button>
            </nav>
          </div>
        </div>
      ) : (
        <div>
          <div className="navbar-custom">
            <div className="navbar-overlay" onClick={toggleMenuOpen}></div>

            <button
              type="button"
              className="navbar-burger"
              onClick={toggleMenuOpen}
            >
              <span className="material-icons">
                <MenuIcon></MenuIcon>
              </span>
            </button>
            <h1 className="navbar-title">Admin Home</h1>
            <nav className="navbar-menu">
              {userDetails ? (
                <button
                  type="button"
                  className="active"
                  onClick={() => navigate("/admin_home")}
                >
                  Home
                </button>
              ) : (
                <button
                  type="button"
                  className="active"
                  onClick={() => navigate("/user_details")}
                >
                  User Details
                </button>
              )}
              <button type="button" className="active" onClick={adminLogout}>
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
