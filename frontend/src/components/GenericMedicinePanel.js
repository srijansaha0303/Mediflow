import React, { useState, useEffect } from 'react';

export default function GenericMedicinePanel({ medicineName }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Example API call to fetch branded and generic medicine data
  useEffect(() => {
    if (!medicineName) return;

    setLoading(true);
    setError('');
    // Replace with your API endpoint or mock data
    fetch(`/api/getMedicineComparison?name=${medicineName}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response error');
        return res.json();
      })
      .then(json => {
        setData(json);
      })
      .catch(e => setError('Failed to load medicine comparison data.'))
      .finally(() => setLoading(false));

  }, [medicineName]);

  if (!medicineName) return <p>Please enter medicine name above to see comparison.</p>;

  if (loading) return <p>Loading comparison...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!data) return null;

  // Find lowest priced generic
  const lowestGeneric = data.generics.reduce((min, g) => (g.price < min.price ? g : min), data.generics[0]);

  return (
    <div style={{ padding: 20, maxWidth: 500, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3>Price Comparison for {data.brand.name}</h3>

      <p>
        Branded Price: <strong>₹{data.brand.price}</strong>
      </p>

      <h4>Generics:</h4>
      <ul>
        {data.generics.map((gen, idx) => (
          <li key={idx}>
            {gen.name} - ₹{gen.price}{' '}
            {gen.price === lowestGeneric.price && <strong>(Lowest Price)</strong>}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => alert(`Contacting store ${gen.storeName} at ${gen.storeContact}`)}
            >
              Contact Store
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}