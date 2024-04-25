import React, { useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import Modal from "react-modal";
import styles from "../styles/Report.module.css";
import btnStyles from "../styles/Button.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Set the App element for react-modal
Modal.setAppElement("#root");

// Report functionality for the Note Id - Opens a Modal to report the Note that has been flagged, 1/3-Reasons + Description
const Report = ({ noteId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("spam");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  // Opens &/or closes the Modal according to Submit or Cancel
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Selects the Reason to Report the Note
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  // Submits the description for the Report of a Note
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Handles the Report functionality - Submits to the Report to the endpoint /reports/ (Note Id, Reason & Description)
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosReq.note("/reports/", {
        note: noteId,
        reason,
        description,
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error reporting note:", error);
    }
  };

  return (
    <span>
      <span className={btnStyles.Icon} onClick={openModal}>
        <i className="fa-regular fa-flag"></i>
      </span>
      {success ? (
        <p className="alert alert-secondary alert-secondary">
          This Note has been successfully reported!
        </p>
      ) : (
        <ReportModal
          isOpen={isOpen}
          onRequestClose={closeModal}
          onSubmit={handleSubmit}
          reason={reason}
          handleReasonChange={handleReasonChange}
          description={description}
          handleDescriptionChange={handleDescriptionChange}
        />
      )}
    </span>
  );
};

// Report Structure - Modal
const ReportModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  reason,
  handleReasonChange,
  description,
  handleDescriptionChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Report Note"
      className={styles["reportModal"]}
      overlayClassName={styles["reportOverlay"]}
    >
      <h5>
        <i className="fa-solid fa-triangle-exclamation"></i> You are about to
        make a report!
      </h5>
      <p>
        We highly encourage our community to participate and share notes.
        However, if the note falls under Spam, Inappropriate content or any
        other sort of inadequate submission, we will take action.
      </p>
      <p>
        Before you file a report against a fellow community user, make sure this
        Note goes against the Rules & Community guidelines of the "Code of
        Conduct" in the Terms of Service.
      </p>
      <Form onSubmit={onSubmit}>
        <div>
          <Form.Label htmlFor="reason">Reason:</Form.Label>
          <br />
          <select
            id="reason"
            className={styles["reasonInput"]}
            value={reason}
            onChange={handleReasonChange}
          >
            <option value="spam">Spam</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="other">Other...</option>
          </select>
        </div>
        <div>
          <br />
          <p>
            Please, give in a brief description as to why you are reporting this
            note.
          </p>
          <Form.Label htmlFor="description">Description (optional):</Form.Label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className={styles["descriptionInput"]}
          />
        </div>
        <div className={styles["buttonContainer"]}>
          <div style={{ textAlign: "center" }}>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright}`}
              type="submit"
            >
              Report
            </Button>{" "}
            {/* Submits the Report */}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright}`}
              type="button"
              onClick={onRequestClose}
            >
              Cancel
            </Button>{" "}
            {/* Cancels the Report */}
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default Report;