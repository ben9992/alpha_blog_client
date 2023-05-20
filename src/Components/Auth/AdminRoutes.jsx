import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IsAdminLoggedIn } from "./Auth";
const AdminRoutes = (props) => {
	const navigate = useNavigate();
	const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const checkUserToken = async () => {
		const res = await IsAdminLoggedIn();
		if (!res) return navigate("/login");
		setIsAdminLoggedIn(res);
		setIsLoading(false);
	};
	useEffect(() => {
		checkUserToken();
	}, [isAdminLoggedIn]);

	if (isLoading) {
		return <div>טוען...</div>;
	}

	return (
		<React.Fragment>{isAdminLoggedIn ? props.children : null}</React.Fragment>
	);
};
export default AdminRoutes;
