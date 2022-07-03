import React from 'react'
import styles from './Error.module.css';

export const Error = ({message}) => {
  return (
    <>
        <p className={styles.error}> {message}</p>
    </>
  )
}
