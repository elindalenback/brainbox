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
import { useRedirect } from "../../hooks/useRedirect";
import FormTagsField from "../../components/FormTagsField";

function NoteCreateForm() {
  useRedirect('loggedOut');
  const [errors, setErrors] = useState({});

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const { title, content, tags, } = noteData;

  const history = useHistory();

  const handleTagsChange = (newTags) => {
    setNoteData({
    ...noteData,
    tags: newTags,
    });
  };

  const handleChangeField = (event) => {
    setNoteData({
      ...noteData,
      [event.target.name]: event.target.value,
    });
  };

  const createTags = async (tags) => {
    const userAddedTags = [];

    for (let tag of tags) {
      try {
        // check if the tag already exists
        const response = await axiosReq.get(`/tags/?search=${tag}`);

        if (response.data.results && response.data.results.length > 0) {
          const exactMatch = response.data.results.find(
            (foundTag) => foundTag.name === tag
          );
          if (exactMatch) {
            userAddedTags.push(exactMatch);
          } else {
            const response = await axiosReq.post("/tags/", { name: tag });
            userAddedTags.push(response.data);
          }
        } else {
          const response = await axiosReq.post("/tags/", { name: tag });
          userAddedTags.push(response.data);
        }
      } catch (error) {}
    }
    return userAddedTags;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    try {
      if (tags) {
        const tagsResponse = await createTags(tags);
        tagsResponse.forEach((tag) => formData.append("tags", tag.id));
      }

      const { data } = await axiosReq.post("/notes/", formData);
      history.push(`/notes/${data.id}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={`${appStyles.Content}`}>
        <Col xs={12} md={8}>
          <div className={styles.Content}>
            <Form.Group controlId="title">
              <Form.Label className="d-none">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
              value={title}
              onChange={handleChangeField}
                aria-label="Title"
              />
            </Form.Group>
            {!title &&
              errors.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="content">
              <Form.Label className="d-none">Text</Form.Label>
              <Form.Control
                aria-label="Text"
                as="textarea"
                placeholder="Text (Optional)"
                name="content"
                value={content}
                rows={5}
                onChange={handleChangeField}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <FormTagsField handleTagsChange={handleTagsChange} />
            {errors.tags?.map((message, idx) => (
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
          </div>
        </Col>
      </Container>
    </Form>
  );
}

export default NoteCreateForm;