import React, { useEffect, useState } from "react";

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
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import FormTagsField from "../../components/FormTagsField";
import Asset from "../../components/Asset";
import { useRedirect } from "../../hooks/useRedirect";

function NoteEditForm() {
  useRedirect('loggedOut');
  const [errors, setErrors] = useState({});

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });
  const { title, content, tags, } = noteData;

  const history = useHistory();
  const { id } = useParams();
  const [initialTags, setInitialTags] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/notes/${id}/`);
        const { title, content, tags_data, is_owner } = data;
 

        is_owner ? setNoteData({ title, content, }) : history.push("/");

        if (tags_data.length > 0) {
          const fetchedTags = [];
          for (let tag of tags_data) {
            fetchedTags.push(tag.name);
          }
          setInitialTags(fetchedTags);
        }

        setHasLoaded(true);

      } catch (err) {}
    };

    setHasLoaded(false);

    handleMount();
  }, [history, id]);

  const handleTagsChange = (newTags) => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      tags: newTags,
    }));
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

      await axiosReq.put(`/notes/${id}/`, formData);
      history.push(`/notes/${id}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {hasLoaded ? (
        <>
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
                    placeholder="Text"
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
                <FormTagsField
                  initialTags={initialTags}
                  handleTagsChange={handleTagsChange}
                />
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
                  update
                </Button>
              </div>
            </Col>
          </Container>
        </>
      ) : (
        <Asset spinner />
      )}
    </Form>
  );
}

export default NoteEditForm;