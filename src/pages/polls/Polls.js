import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Polls.module.css';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Polls = () => {
  const [questions, setQuestions] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (currentUser) {
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
            });
            if (voted){
              initialVotes[question.id] = currentChoice.id;
            } else {
              initialVotes[question.id] = null;
            }
          });
          setUserVotes(initialVotes);
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
      userList.push(currentId);
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
  
  return (
    <div className={styles['polls-container']}>
      {currentUser ? (
        <>
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
        </>
      ) : (
        <p><Link to="/signin" className={styles.signin}>Sign in</Link> to view polls</p>
        
      )}
    </div>
  );
};

export default Polls;
