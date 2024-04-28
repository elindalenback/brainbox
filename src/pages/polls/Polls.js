import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Polls.module.css'; // Adjust the import path based on your project structure
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const Polls = () => {
  const [questions, setQuestions] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [needsLogin, setNeedsLogin] = useState(false); // State to track if login is needed
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (currentUser) {
          // Fetch questions only if currentUser exists (i.e., user is logged in)
          const response = await axios.get('/questions/');
          setQuestions(response.data);
          // Initialize userVotes with null for each question ID
          const initialVotes = {};
          response.data.forEach(question => {
            let voted = false;
            let currentChoice = null;
            question.choices.forEach((choice) => { 
              if (choice.users.includes(currentUser.pk)){
                voted = true;
                currentChoice = choice;
              }
            })
            if (voted){
              initialVotes[question.id] = currentChoice.id;
            }
            else{
              initialVotes[question.id] = null;
            }
          });
          setUserVotes(initialVotes);
        } else {
          // Set needsLogin to true if currentUser doesn't exist (user not logged in)
          setNeedsLogin(true);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [currentUser]);

  const handleVote = async (questionId, choiceId) => {
    try {
      // Check if the user is removing their vote
      const isRemovingVote = userVotes[questionId] === choiceId;
      
      // Set the user's vote for this question
      setUserVotes(prevUserVotes => ({
        ...prevUserVotes,
        [questionId]: isRemovingVote ? null : choiceId
      }));
      
      // Update the vote count for the selected choice
      const choiceResponse = await axios.get(`/questions/${questionId}/choices/${choiceId}/`);
      let userList = choiceResponse.data.users; 
      const currentId = currentUser.pk; // Fix it
      userList.push(currentId)
      let newVoteCount = parseInt(choiceResponse.data.votes) + 1;
      if (isRemovingVote){
        newVoteCount = parseInt(choiceResponse.data.votes) - 1;
      }
      const response = await axios.patch(`/questions/${questionId}/choices/${choiceId}/`, {votes: newVoteCount, users: userList});
      setQuestions(prevQuestions =>
        prevQuestions.map(question => {
          if (question.id === questionId) {
            return {
              ...question,
              choices: question.choices.map(choice => {
                if (choice.id === choiceId) {
                  return {
                    ...choice,
                    votes: response.data.votes
                  };
                }
                return choice;
              })
            };
          }
          return question;
        })
      );
    } catch (error) {
      console.error('Error voting:', error);
    }
  };
  
  if (needsLogin) {
    return (
      <div>
        Please <Link to="/signin" style={{ color: '#007bff', textDecoration: 'underline' }}>sign in </Link>
        to see the poll.
      </div>
    );
  }

  return (
    <div className={styles['polls-container']}>
      {questions && questions.length > 0 && questions.map(question => (
        <div className={styles['polls-question']} key={question.id}>
          <h3>{question.question_text}</h3>
          <div className={styles['polls-choices']}>
            {question.choices.map(choice => (
              <div className={styles['polls-choice']} key={choice.id}>
                <button 
                  onClick={() => handleVote(question.id, choice.id)}
                  disabled={userVotes[question.id] !== null && userVotes[question.id] !== choice.id}
                >
                  {choice.choice_text} ({choice.votes})
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Polls;
