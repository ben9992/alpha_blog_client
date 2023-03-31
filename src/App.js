import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Login/Register";
import { AdminDashboard } from "./Components/Admin/AdminDashboard";
import AdminRoutes from "./Components/Auth/AdminRoutes";
import UserDashboard from "./Components/User/UserDashboard";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

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
	);
}

export default App;
