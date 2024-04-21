import React from 'react'
import NoResults from '../assets/no-results.png';
import styles from '../styles/NotFound.module.css';
import Asset from './Asset';

function NotFound() {
  return (
    <div className={styles.NotFoundPage}>
        <Asset src={NoResults} message="Sorry, the page you're looking for doesn't exist" />
    </div>
  )
}

export default NotFound