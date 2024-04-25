import React, { useState, useEffect } from "react";
import axios from "axios";

const PollsCreateForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState([]);
  const [newChoice, setNewChoice] = useState("");
  const [polls, setPolls] = useState([]);

  // Function to fetch all polls from the backend
  const fetchPolls = async () => {
    try {
      const response = await axios.get("/questions/");
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  // Fetch all polls when the component mounts
  useEffect(() => {
    fetchPolls();
  }, []);

  const handleAddChoice = () => {
    if (newChoice.trim() !== "") {
      setChoices([...choices, newChoice]);
      setNewChoice("");
    }
  };

  const handleRemoveChoice = (index) => {
    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    setChoices(updatedChoices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        question_text: questionText,
        choices: choices.map((choice) => ({ choice_text: choice })),
      };

      await axios.post("/questions/", payload);

      setQuestionText("");
      setChoices([]);
      setNewChoice("");

      // Fetch all polls again to update the list
      fetchPolls();
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  const handleRemovePoll = async (pollId) => {
    try {
      await axios.delete(`/questions/${pollId}/`);
      // Fetch all polls again to update the list
      fetchPolls();
    } catch (error) {
      console.error("Error deleting poll:", error);
    }
  };

  return (
    <div>
      <h2>Create a Poll</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <input
          id="question"
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        <label htmlFor="choices">Choices:</label>
        <ul>
          {choices.map((choice, index) => (
            <li key={index}>
              {choice}
              <button type="button" onClick={() => handleRemoveChoice(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <input
          id="choices"
          type="text"
          value={newChoice}
          onChange={(e) => setNewChoice(e.target.value)}
        />
        <button type="button" onClick={handleAddChoice}>
          Add Choice
        </button>

        <button type="submit">Create Poll</button>
      </form>

      <div>
        <h3>Preview:</h3>
        <p><strong>Question:</strong> {questionText}</p>
        <ul>
          {choices.map((choice, index) => (
            <li key={index}>{choice}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Created Polls:</h3>
        {polls.map((poll) => (
          <div key={poll.id}>
            <p><strong>Question:</strong> {poll.question_text}</p>
            <ul>
              {poll.choices.map((choice, index) => (
                <li key={index}>{choice.choice_text}</li>
              ))}
            </ul>
            <button onClick={() => handleRemovePoll(poll.id)}>Remove Poll</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollsCreateForm;