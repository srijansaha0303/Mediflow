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
      const response = await axios.get(`/api/getMedicineData?name=${medicineName}`);
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

      {medicineData && (
        <div className="medicine-details">
          <h3>Brand: {medicineData.brand.name}</h3>
          <p>Price: ₹{medicineData.brand.price}</p>
          <h4>Generic Alternatives:</h4>
          <ul>
            {medicineData.generics.map((generic, index) => (
              <li key={index}>
                <strong>{generic.name}</strong> - ₹{generic.price}
                <button onClick={() => handleContactStore(generic.storeId)}>
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

const handleContactStore = (storeId) => {
  alert(`Contacting store with ID: ${storeId}`);
};

export default MedicinePricePanel;

