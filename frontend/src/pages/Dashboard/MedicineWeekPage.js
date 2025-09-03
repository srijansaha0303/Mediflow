import React, { useContext } from 'react';
import MedicineWeek from '../../components/MedicineWeek';
import { UserContext } from '../../context/UserContext';

export default function MedicineWeekPage() {
  const { medications } = useContext(UserContext);

  // Assuming medications is an array with all medicine entries for the week
  // If you have a different structure, adjust accordingly
  
  // Example grouping meds by day for display (mock, adapt as necessary)
  const medsByDay = {
    Monday: medications,
    Tuesday: medications,
    Wednesday: medications,
    Thursday: medications,
    Friday: medications,
    Saturday: medications,
    Sunday: medications,
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Medicines for the Week</h1>
      <MedicineWeek weeklyMeds={medsByDay} />
    </div>
  );
}
