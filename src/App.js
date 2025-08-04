import React, { useState } from 'react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const supportOptions = {
    'Order Support': ['Track My Order', 'Cancel My Order', 'View My Order Details'],
    'Product Info': ['Material Details', 'Dimension Queries', 'Assembly Instructions'],
    'Returns & Refunds': ['Return Policy', 'Refund Status', 'Return A Product'],
    'Warranty': ['Claim Warranty', 'Warranty Terms'],
    'Installation': ['Schedule Installation', 'Reschedule', 'Installation Status'],
    'Other Queries': ['Store Locator', 'Chat with Agent']
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setBotResponse('');
    setOrderId('');
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setBotResponse('');

    // If it’s an order-related query, wait for order ID input
    if (subcategory.toLowerCase().includes('order')) return;

    submitQuery(subcategory);
  };

  const submitQuery = async (subcategoryQuery) => {
    let fullQuery = subcategoryQuery;
    if (subcategoryQuery.toLowerCase().includes('order') && orderId) {
      fullQuery += ` for Order ID: ${orderId}`;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://c2bda09f-cc56-4a84-8654-b9b4dd5877ae-00-2k3ax47d18h9f.sisko.replit.dev/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: fullQuery })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const data = await res.json();
      setBotResponse(data.response);
    } catch (err) {
      setBotResponse(err.message || 'Error fetching response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>🪑 WoodenStreet Customer Support</h2>

      {!selectedCategory && (
        <>
          <h4>Select a support category:</h4>
          {Object.keys(supportOptions).map((cat) => (
            <button key={cat} onClick={() => handleCategoryClick(cat)} style={{ margin: 5 }}>
              {cat}
            </button>
          ))}
        </>
      )}

      {selectedCategory && !selectedSubcategory && (
        <>
          <h4>{selectedCategory}</h4>
          {supportOptions[selectedCategory].map((sub) => (
            <button key={sub} onClick={() => handleSubcategoryClick(sub)} style={{ margin: 5 }}>
              {sub}
            </button>
          ))}
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setSelectedCategory(null)}>⬅ Back</button>
          </div>
        </>
      )}

      {selectedSubcategory && selectedSubcategory.toLowerCase().includes('order') && (
        <div style={{ marginTop: 20 }}>
          <label>Enter Order ID:</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g., WS123456"
            style={{ marginLeft: 10 }}
          />
          <button
            onClick={() => submitQuery(selectedSubcategory)}
            style={{ marginLeft: 10 }}
            disabled={!orderId}
          >
            Submit
          </button>
        </div>
      )}

      {isLoading && <p>⏳ Loading chatbot response...</p>}
      {botResponse && (
        <div style={{ marginTop: 20, background: '#f9f9f9', padding: 15, borderRadius: 5 }}>
          <strong>🧠 Chatbot Response:</strong>
          <p>{botResponse}</p>
        </div>
      )}
    </div>
  );
};

export default App;
