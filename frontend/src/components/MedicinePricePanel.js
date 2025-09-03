// src/components/MedicinePricePanel.js

import React, { useState } from 'react';
import axios from 'axios';
import './MedicinePricePanel.css'; // Optional: for custom styling

const MedicinePricePanel = () => {
  const [medicineName, setMedicineName] = useState('');
  const [medicineData, setMedicineData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!medicineName) {
      setError('Please enter a medicine name.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // 🔥 Directly call Flask backend (skip proxy issues)
      const response = await axios.get(
        `http://127.0.0.1:5000/api/medicine_data?name=${medicineName}`
      );
      setMedicineData(response.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medicine-price-panel">
      <h2>Medicine Price Comparison</h2>
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

      {medicineData && medicineData.medicine && (
        <div className="medicine-details">
          {medicineData.medicine.map((med, idx) => (
            <div key={idx} className="medicine-card">
              <h3>Brand: {med.brand_name}</h3>
              <p>Generic: {med.generic_name}</p>
              <p>Brand Price: ₹{med.brand_price}</p>
              <p>Generic Price: ₹{med.generic_price}</p>
            </div>
          ))}

          <h4>Available Stores:</h4>
          <ul>
            {medicineData.stores.map((store, index) => (
              <li key={index}>
                <strong>{store.name}</strong> - {store.contact} 
                {store.delivery ? ' 🚚 Delivery Available' : ' ❌ No Delivery'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MedicinePricePanel;