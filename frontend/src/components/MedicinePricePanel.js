// src/components/MedicinePricePanel.js

import React, { useState } from 'react';
import axios from 'axios';
import './MedicinePricePanel.css'; // Optional styling

const MedicinePricePanel = () => {
  const [medicineName, setMedicineName] = useState('');
  const [medicineData, setMedicineData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!medicineName.trim()) {
      setError('⚠️ Please enter a medicine name.');
      return;
    }

    setLoading(true);
    setError('');
    setMedicineData(null);

    try {
      const response = await axios.get(`/api/medicine_data?name=${medicineName}`);
      setMedicineData(response.data);
    } catch (err) {
      setError('❌ Failed to load medicine comparison data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medicine-price-panel">
      <h2>💊 Medicine Price Comparison</h2>
      <input
        type="text"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
        placeholder="Enter medicine name"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="error">{error}</p>}

      {medicineData && (
        <div className="medicine-details">
          <h3>Results for: <em>{medicineName}</em></h3>

          {/* Brand + Generic Info */}
          <div className="medicine-info">
            {medicineData.medicine.map((med, idx) => (
              <div key={idx} className="medicine-card">
                <h4>Brand: {med.brand_name}</h4>
                <p><strong>Generic:</strong> {med.generic_name}</p>
                <p>💰 Brand Price: ₹{med.brand_price}</p>
                <p>💰 Generic Price: ₹{med.generic_price}</p>
              </div>
            ))}
          </div>

          {/* Local Stores */}
          <h4>Available at Stores:</h4>
          <ul>
            {medicineData.stores.map((store, idx) => (
              <li key={idx}>
                <strong>{store.name}</strong> - {store.contact}{" "}
                {store.delivery ? "(🚚 Delivery Available)" : "(Pickup Only)"}
                <button
                  onClick={() => handleContactStore(store.name)}
                  className="contact-btn"
                >
                  Contact Store
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const handleContactStore = (storeName) => {
  alert(`📞 Contacting ${storeName}...`);
};

export default MedicinePricePanel;
