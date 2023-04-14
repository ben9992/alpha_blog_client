import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Login/Register";
import { AdminDashboard } from "./Components/Admin/AdminDashboard";
import AdminRoutes from "./Components/Auth/AdminRoutes";
import UserDashboard from "./Components/User/UserDashboard";
import UserProfile from "./Components/User/UserProfile";

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";

function App() {
	return (
		<>
			<NavBar></NavBar>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="user/:userId" element={<UserProfile />} />
					<Route
						path="/admin-dashboard"
						element={
							<AdminRoutes>
								<AdminDashboard />
							</AdminRoutes>
						}
					/>
					<Route path="/user-dashboard" element={<UserDashboard />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
