import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/NoteCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function NoteEditForm() {
  const [errors, setErrors] = useState({});

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });
  const { title, content } = noteData;

  const history = useHistory();

  const handleChange = (event) => {
    setNoteData({
      ...noteData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const requestData = {
      title: title,
      content: content,
      tags: [], // Empty array as placeholder
      notebook: "", // Set to the appropriate notebook ID
    };
    
    console.log("Request Payload:", requestData); // Log the request payload
  
    try {
      const { data } = await axiosReq.post("/notes/", requestData);
  
      console.log("Successful response:", data);
      history.push(`/notes/${data.id}`);
    } catch (err) {
      console.log("Error:", err.response?.data);
      console.log("Status Code:", err.response?.status);
  
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={`${appStyles.Content}`}>
        <Col xs={12} md={8}>
          <div className={styles.Content}>
            <Form.Group className="text-center w-100">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
              {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Label className="mt-3">Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="content"
                value={content}
                onChange={handleChange}
                className={styles.Content} // Apply custom styling
              />
              {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue} mt-3`}
                onClick={() => history.goBack()}
              >
                cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue} mt-3`}
                type="submit"
              >
                create
              </Button>
            </Form.Group>
          </div>
        </Col>
      </Container>
    </Form>
  );
}

export default NoteEditForm;