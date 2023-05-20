import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Container, Row } from "reactstrap";
import { axios } from "../Auth/Axios";
import { UsersTab } from "./Tabs/UsersTab";

const AdminDashboard = () => {
	const [analytics, setAnalytics] = useState(null);
	const getAnalytics = async () => {
		const usersData = await axios
			.get(`/users/analytics/all`)
			.then((user) => user)
			.catch((err) => {
				return false;
			});

		const postsData = await axios
			.get(`/posts/analytics/all`)
			.then((user) => user)
			.catch((err) => {
				return false;
			});

		setAnalytics({ usersData: usersData.data, postsData: postsData.data });
	};

	useEffect(() => {
		getAnalytics();
	}, []);

	return (
		<Container>
			<Row className="justify-content-center rtl">
				<Tabs
					defaultActiveKey="analytics"
					id="fill-tab-example"
					className="mb-3"
					fill
				>
					<Tab eventKey="analytics" title="אנליטיקה">
						<h6>
							מספר משתמשים: {analytics ? analytics.usersData.userCount : ""}
						</h6>
						<h6>
							מספר פוסטים: {analytics ? analytics.postsData.postCount : ""}
						</h6>
					</Tab>
					<Tab eventKey="users" title="משתמשים">
						<UsersTab></UsersTab>
					</Tab>
					{/* <Tab eventKey="posts" title="Posts"></Tab> */}
				</Tabs>
			</Row>
		</Container>
	);
};

export { AdminDashboard };
