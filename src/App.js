import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Login/Register";
import { AdminDashboard } from "./Components/Admin/AdminDashboard";
import AdminRoutes from "./Components/Auth/AdminRoutes";
import UserDashboard from "./Components/User/UserDashboard";
import UserProfile from "./Components/User/UserProfile";
import { ThemeProvider } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";
import { PrivacyPolicy } from "./Components/PrivacyPolicy";
import { Community } from "./Components/Community";
import { UpgradePro } from "./Components/UpgradePro";
import { Terms } from "./Components/Terms";

function App() {
	const theme = {
		// colors: {
		//   primary: '#007bff',
		//   secondary: '#28a745',
		// },
	};

	return (
		<ThemeProvider theme={theme}>
			<NavBar></NavBar>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
					<Route path="/Community" element={<Community />} />
					<Route path="/UpgradePro" element={<UpgradePro />} />
					<Route path="/Terms" element={<Terms />} />
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
		</ThemeProvider>
	);
}

export default App;
