// ImageUpload.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Container, Row, Col, Button } from "react-bootstrap";
import { axios } from "../Auth/Axios";

const ImageUpload = (props) => {
	const [previewSrc, setPreviewSrc] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		console.log("Accepted file:", file);
		const fileUrl = URL.createObjectURL(file);
		setPreviewSrc(fileUrl);
		setSelectedFile(file);
	}, []);

	const onUpload = async () => {
		if (!selectedFile) return;

		const formData = new FormData();
		formData.append("image", selectedFile);

		try {
			await axios.put("/users/profile-image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			props.onUploaded();
			setPreviewSrc(null);
			setSelectedFile(null);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<Container>
			<Row>
				<Col md="auto">
					<div {...getRootProps()} style={getStyle(isDragActive)}>
						<input {...getInputProps()} />
						{isDragActive ? (
							<p>שחרר את התמונה כאן...</p>
						) : (
							<p>גרור ושחרר תמונה או לחץ כדי לבחור קובץ</p>
						)}
					</div>
					{previewSrc && (
						<div>
							<h4>תצוגת מקדימה:</h4>
							<img
								src={previewSrc}
								alt="File preview"
								style={{ maxWidth: "300px" }}
							/>
						</div>
					)}
					<Button onClick={onUpload} disabled={!selectedFile} className="mt-3">
						בחר
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

const getStyle = (isDragActive) => ({
	border: "2px dashed #333",
	padding: "20px",
	textAlign: "center",
	borderRadius: "10px",
	cursor: "pointer",
	background: isDragActive ? "#efefef" : "#fff",
});

export default ImageUpload;
