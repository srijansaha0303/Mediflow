import React, { useState } from 'react';

export default function AppointmentForm({ addAppointment }) {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!doctor || !date || !time || !reason) {
      alert('Please fill all fields');
      return;
    }
    const appointment = { doctor, date, time, reason };
    addAppointment(appointment);
    setDoctor('');
    setDate('');
    setTime('');
    setReason('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '1rem auto', fontFamily: 'Poppins, sans-serif' }}>
      <h3>Add Appointment</h3>
      <div style={{ marginBottom: 10 }}>
        <label>Doctor's Name</label><br/>
        <input type="text" value={doctor} onChange={e => setDoctor(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Date</label><br/>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Time</label><br/>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Reason</label><br/>
        <input type="text" value={reason} onChange={e => setReason(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
      </div>
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#764ba2', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
        Add Appointment
      </button>
    </form>
  );
}