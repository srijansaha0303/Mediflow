import React from 'react';

export default function AppointmentList({ appointments }) {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Poppins, sans-serif' }}>
      <h3>Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8, textAlign: 'left' }}>Doctor</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8, textAlign: 'left' }}>Date</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8, textAlign: 'left' }}>Time</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8, textAlign: 'left' }}>Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 8 }}>{a.doctor}</td>
                <td style={{ padding: 8 }}>{a.date}</td>
                <td style={{ padding: 8 }}>{a.time}</td>
                <td style={{ padding: 8 }}>{a.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}