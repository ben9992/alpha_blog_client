import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Image,
	Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IsUserLoggedIn } from "../Auth/Auth";
import { axios, updateToken } from "../Auth/Axios";
import ImageUpload from "../Utils/ImageUpload";

const UserDashboard = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [successAction, setSuccessAction] = useState("");
	const [user, setUser] = useState(null);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const navigate = useNavigate();

	const getUser = async () => {
		const userId = localStorage.getItem("userId");
		const user = await axios
			.get(`/users/${userId}`)
			.then((user) => user)
			.catch((err) => {
				return false;
			});

		if (!user.data) return false;

		setUser(user.data);
	};

	useEffect(() => {
		const isUserFound = IsUserLoggedIn();
		if (!isUserFound) return navigate("/login");

		const token = localStorage.getItem("token");
		updateToken(token);
		getUser();
	}, []);

	const handleChangePassword = () => {
		// logic to change the user's password
		// this example just logs the values to the console
		console.log("Old Password:", oldPassword);
		console.log("New Password:", newPassword);
		console.log("Confirm Password:", confirmPassword);

		// check if new password and confirm password match
		if (newPassword !== confirmPassword) {
			setPasswordError("Passwords do not match");
		} else if (oldPassword !== user.password) {
			setPasswordError("Old password do not match");
		} else {
			setPasswordError("");
			axios
				.put(`/users/${user._id}`, { password: newPassword })
				.then((user) => user)
				.catch((err) => {});
			setSuccessAction("Password changed succsessfully");
		}
	};

	const handleDeleteUser = () => {
		axios
			.delete(`/users/${user._id}`)
			.then((user) => user)
			.catch((err) => {
				return false;
			});

		//TODO: LOGOUT USER

		setShowConfirmation(false);
	};

	const handleUploaded = () => {
		getUser();
	};

	return !user ? (
		<></>
	) : (
		<Container>
			<Row className="rtl">
				<Col>
					<h1>ברוך הבא, {user.username}!</h1>
					<Image
						style={{ width: "20%" }}
						src={process.env.REACT_APP_API_SERVER_URL + user.profileImage}
						roundedCircle
					/>

					<hr></hr>
					<Form.Label>עדכון תמונה:</Form.Label>
					<ImageUpload onUploaded={handleUploaded}></ImageUpload>

					<Form>
						<Form.Group controlId="oldPassword">
							<Form.Label>סיסמא ישנה:</Form.Label>
							<Form.Control
								type="password"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="newPassword">
							<Form.Label>סיסמא חדשה:</Form.Label>
							<Form.Control
								type="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="confirmPassword">
							<Form.Label>סיסמא שנית:</Form.Label>
							<Form.Control
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							{passwordError && (
								<Form.Text className="text-danger">{passwordError}</Form.Text>
							)}
							{successAction && (
								<Form.Text className="text-success">{successAction}</Form.Text>
							)}
						</Form.Group>
						<br></br>
						<Button onClick={handleChangePassword}>שנה סיסמא </Button> <br></br>
						<br></br>
						<br></br>
						<Button variant="danger" onClick={() => setShowConfirmation(true)}>
							מחיקת משתמש
						</Button>
					</Form>
				</Col>
			</Row>
			<Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
				<Modal.Header closeButton>
					<Modal.Title>מחיקת משתמש</Modal.Title>
				</Modal.Header>
				<Modal.Body className="rtl">
					האם אתה בטוח שברצונך למחוק את חשבונך? פעולה זו לא יכולה להתבטל.
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowConfirmation(false)}
					>
						בטל
					</Button>
					<Button variant="danger" onClick={handleDeleteUser}>
						מחיקה
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default UserDashboard;
