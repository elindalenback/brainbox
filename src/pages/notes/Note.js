import React from "react";
import styles from "../../styles/Note.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import Badge from "react-bootstrap/Badge";
import Report from "../../components/Report";

const Note = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    tags_data,
    updated_at,
    notePage,
    setNotes,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/notes/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/notes/${id}/`);
      history.goBack();
    } catch (err) {}
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { note: id });
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.map((note) => {
          return note.id === id
            ? { ...note, likes_count: note.likes_count + 1, like_id: data.id }
            : note;
        }),
      }));
    } catch (err) {}
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.map((note) => {
          return note.id === id
            ? { ...note, likes_count: note.likes_count - 1, like_id: null }
            : note;
        }),
      }));
    } catch (err) {}
  };

  return (
    <Card className={styles.Note}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && notePage && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />}
          </div>
        </Media>
      </Card.Body>
      <Card.Body>
        {notePage ? (
          <div>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            <Card.Text>{content}</Card.Text>
          </div>
        ) : (
          <Link to={`/notes/${id}`} className={styles.NotePageLink}>
            <div>
              {title && <Card.Title className="text-center">{title}</Card.Title>}
              {content.length > 250 ? (
                <div>
                  <Card.Text>{content.slice(0, 250)}...</Card.Text>
                  <Link to={`/notes/${id}`} className={styles.ReadeMoreLink}>Read more</Link>
                </div>
              ) : (
                <Card.Text>{content}</Card.Text>
              )}
            </div>
          </Link>
        )}
        <div className={styles.NoteBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own note!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like notes!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/notes/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
          {currentUser && <Report noteId={id} />}
        </div>
        <div className={styles.TagsContainer}>
          {tags_data && tags_data.length > 0 ? (
            <>
              <span>Tags: </span>
              {tags_data.map((tag) => (
                <Badge
                  key={tag.id}
                  pill
                  variant="secondary"
                  className="mr-2 mb-4"
                >
                  {tag.name}
                </Badge>
              ))}
            </>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Note;
