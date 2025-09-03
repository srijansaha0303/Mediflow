import React, { useState } from 'react';

export default function MedicineDay({ medicines, addMedicine }) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [dose, setDose] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    if (!name || !time || !dose) {
      alert('Fill all fields.');
      return;
    }
    addMedicine({ name, time, dose });
    setName('');
    setTime('');
    setDose('');
  }

  return (
    <div>
      <h3>Medicines for Today</h3>
      {medicines.length === 0 ? (
        <p>No medicines scheduled for today.</p>
      ) : (
        <ul>
          {medicines.map((m, idx) => (
            <li key={idx}>
              {m.name} at {m.time} - {m.dose} mg
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Medicine Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="time"
          placeholder="Time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Dose (mg)"
          value={dose}
          onChange={e => setDose(e.target.value)}
        />
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
}