import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Container } from "reactstrap";
import { axios } from "../../Auth/Axios";
import { useNavigate } from "react-router-dom";

const UsersTab = () => {
	const [users, setUsers] = useState(null);
	const [deleteUserId, setDeleteUserId] = useState(null);
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const getUsers = async () => {
		const users = await axios
			.get(`/users`)
			.then((users) => users.data)
			.catch((err) => {
				return false;
			});

		if (!users) return false;

		setUsers(users);
	};

	useEffect(() => {
		getUsers();
	}, []);

	const handleClose = () => setShow(false);

	const handleViewUser = (userId) => {
		navigate(`/user/${userId}`);
	};
	const handleDeleteUser = async () => {
		await axios
			.delete(`/users/${deleteUserId}`)
			.then((user) => user)
			.catch((err) => {
				return false;
			});

		setDeleteUserId(null);
		getUsers();
		setShow(false);
	};

	return (
		<>
			<Container className="rtl">
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>Id</th>
							<th>שם משתמש</th>
							<th>אימייל</th>
							<th>נוצר ב</th>
							<th>עבור לפרופיל</th>
							<th>מחק</th>
						</tr>
					</thead>
					<tbody>
						{users
							? users.map((user) => (
									<tr>
										<td>{user._id}</td>
										<td>{user.username}</td>
										<td>{user.email}</td>
										<td>{user.createdAt}</td>
										<td>
											<Button
												variant="secondary"
												onClick={() => handleViewUser(user._id)}
											>
												עבור לפרופיל
											</Button>
										</td>
										<td>
											<Button
												variant="danger"
												onClick={() => {
													setShow(true);
													setDeleteUserId(user._id);
												}}
											>
												מחק
											</Button>
										</td>
									</tr>
							  ))
							: ""}
					</tbody>
				</Table>
			</Container>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className="modal-header">?האם ברצונך למחוק</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						בטל
					</Button>
					<Button className="btn btn-danger" onClick={handleDeleteUser}>
						מחק
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export { UsersTab };
