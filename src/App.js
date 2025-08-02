import React, { useState } from 'react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [loading, setLoading] = useState(false);

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
    setOrderId('');
    setChatbotResponse('');
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setOrderId('');
    setChatbotResponse('');
  };

  const handleAskQuery = async () => {
    const prompt = `${selectedSubcategory}. Order ID: ${orderId}`;
    setLoading(true);
    try {
      const response = await fetch('https://c2bda09f-cc56-4a84-8654-b9b4dd5877ae-00-2k3ax47d18h9f.sisko.replit.dev/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error from backend:', errorText);
        throw new Error('Response not OK');
      }

      const data = await response.json();
      setChatbotResponse(data.answer || 'No answer returned.');
    } catch (error) {
      console.error('Fetch Error:', error);
      setChatbotResponse('❌ Error fetching response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🪑 WoodenStreet Customer Support</h2>

      {!selectedCategory && (
        <>
          <h3>Select a Support Category:</h3>
          {Object.keys(supportOptions).map((category) => (
            <button key={category} onClick={() => handleCategoryClick(category)} style={{ margin: '5px' }}>
              {category}
            </button>
          ))}
        </>
      )}

      {selectedCategory && !selectedSubcategory && (
        <>
          <h3>{selectedCategory}</h3>
          {supportOptions[selectedCategory].map((subcategory) => (
            <button key={subcategory} onClick={() => handleSubcategoryClick(subcategory)} style={{ margin: '5px' }}>
              {subcategory}
            </button>
          ))}
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => setSelectedCategory(null)}>⬅️ Back</button>
          </div>
        </>
      )}

      {selectedSubcategory && (
        <>
          <h4>🔍 {selectedCategory} > {selectedSubcategory}</h4>

          {(selectedSubcategory.toLowerCase().includes('order') ||
            selectedSubcategory.toLowerCase().includes('refund') ||
            selectedSubcategory.toLowerCase().includes('status')) && (
            <div style={{ marginTop: '10px' }}>
              <label>Enter Order ID: </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD57413"
              />
            </div>
          )}

          <div style={{ marginTop: '10px' }}>
            <button onClick={handleAskQuery} disabled={loading || (orderId === '' && selectedSubcategory.toLowerCase().includes('order'))}>
              {loading ? 'Asking...' : 'Ask Support Bot'}
            </button>
            <button onClick={() => setSelectedSubcategory(null)} style={{ marginLeft: '10px' }}>
              ⬅️ Back
            </button>
          </div>

          {chatbotResponse && (
            <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
              <h4>🧠 Chatbot Response:</h4>
              <p>{chatbotResponse}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
