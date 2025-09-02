import React from 'react';
import styles from './Alert.module.css';

export function Alert({ time, medication }) {
  return (
    <li className={styles.alert}>
      <strong>{time}</strong>: {medication}
    </li>
  );
}