import React, { useState, useEffect } from 'react';

export default function Notifications({ notifications }) {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);

    const timer = setTimeout(() => {
      setVisibleNotifications([]);
    }, 5000); // clear notifications after 5 seconds

    return () => clearTimeout(timer);
  }, [notifications]);

  if (visibleNotifications.length === 0) return null;

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 999 }}>
      {visibleNotifications.map((msg, idx) => (
        <div key={idx} style={{
          background: '#764ba2', color: 'white', marginBottom: '10px',
          padding: '10px 15px', borderRadius: '8px', boxShadow: '0 3px 6px rgba(0,0,0,0.2)'
        }}>
          {msg}
        </div>
      ))}
    </div>
  );
}