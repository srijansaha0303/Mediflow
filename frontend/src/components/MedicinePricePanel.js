// src/components/MedicinePricePanel.js

import React, { useState } from 'react';
import axios from 'axios';
import './MedicinePricePanel.css';

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
      // 🔥 Directly call Flask backend (skip proxy issues)
      const response = await axios.get(
        `http://127.0.0.1:5000/api/medicine_data?name=${medicineName}`
      );
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

      {medicineData.length > 0 && (
        <div className="medicine-results">
          {medicineData.map((med, idx) => (
            <div key={idx} className="medicine-details">
              <h3>Brand: {med.brand.name}</h3>
              <p>Price: ₹{med.brand.price}</p>
              <h4>Generic Alternatives:</h4>
              <ul>
                {med.generics.map((generic, index) => (
                  <li key={index}>
                    <strong>{generic.name}</strong> - ₹{generic.price}
                    <button onClick={() => handleContactStore(generic.storeId)}>
                      Contact Store
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const handleContactStore = (storeName) => {
  alert(`📞 Contacting ${storeName}...`);
};

export default MedicinePricePanel;