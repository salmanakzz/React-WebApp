import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import {
  adminAuth,
  adminLogin,
  userAuth,
  userDetails,
  userLogin,
  userRegister,
} from "./urls/urls";

import UserPrivateRoutes from "./private_routes/UserPrivateRoutes";

import AdminPrivateRoutes from "./private_routes/AdminPrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={<Login user={true} url={userLogin} />}
          />
          <Route
            path="/admin"
            element={<Login user={false} url={adminLogin} />}
          />
          <Route path="/register" element={<Signup url={userRegister} />} />

          <Route element={<UserPrivateRoutes authUrl={userAuth} />}>
            <Route element={<Home user={true} />} path="/home" exact />
          </Route>

          <Route element={<AdminPrivateRoutes authUrl={adminAuth} />}>
            <Route path="/admin_home" element={<Home user={false} />} />
            <Route
              path="/user_details"
              element={
                <UserDetails
                  user={false}
                  authUrl={adminAuth}
                  UserDetailsUrl={userDetails}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
