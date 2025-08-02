import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const supportOptions = {
    'Order Support': ['Track My Order', 'Cancel My Order', 'View My Order Details'],
    'Product Info': ['Material Details', 'Dimension Queries', 'Assembly Instructions'],
    'Returns & Refunds': ['Return Policy', 'Refund Status', 'Return A Product'],
    'Warranty': ['Claim Warranty', 'Warranty Terms'],
    'Installation': ['Schedule Installation', 'Reschedule', 'Installation Status'],
    'Other Queries': ['Store Locator', 'Chat with Agent']
  };

  const subcategoryQueryMap = {
    'Track My Order': 'Please tell me the status of my order. Order ID: ',
    'Cancel My Order': 'Cancel my order. Order ID: ',
    'View My Order Details': 'Show my order details. Order ID: ',
    'Material Details': 'Tell me about the product material',
    'Dimension Queries': 'What are the product dimensions?',
    'Assembly Instructions': 'How do I assemble this product?',
    'Return Policy': 'What is the return policy?',
    'Refund Status': 'What is the status of my refund?',
    'Return A Product': 'I want to return a product',
    'Claim Warranty': 'I want to claim warranty. Order ID: ',
    'Warranty Terms': 'What are the warranty terms?',
    'Schedule Installation': 'Schedule installation for my order. Order ID: ',
    'Reschedule': 'Reschedule my installation. Order ID: ',
    'Installation Status': 'Check installation status. Order ID: ',
    'Store Locator': 'Where is the nearest WoodenStreet store?',
    'Chat with Agent': 'Connect me with a human agent'
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
    setOrderId('');
    const requiresOrderId = subcategoryQueryMap[subcategory]?.includes('Order ID:');
    if (!requiresOrderId) {
      submitQuery(subcategoryQueryMap[subcategory]);
    }
  };

  const submitQuery = async (fullQuery) => {
    try {
      const res = await fetch('https://c2bda09f-cc56-4a84-8654-b9b4dd5877ae-00-2k3ax47d18h9f.sisko.replit.dev/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: fullQuery }) // ✅ MUST MATCH FASTAPI
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const data = await res.json();
      setBotResponse(data.response);
    } catch (err) {
      setBotResponse(err.message || 'Error fetching response.');
    }
  };

  const handleSubmit = () => {
    const baseQuery = subcategoryQueryMap[selectedSubcategory];
    if (baseQuery.includes('Order ID:')) {
      const fullQuery = `${baseQuery}${orderId}`;
      submitQuery(fullQuery);
    }
  };

  return (
    <div className="App">
      <h2>🪑 WoodenStreet Customer Support</h2>

      {!selectedCategory ? (
        <>
          <h3>Select a category:</h3>
          {Object.keys(supportOptions).map((category) => (
            <button key={category} onClick={() => handleCategoryClick(category)}>{category}</button>
          ))}
        </>
      ) : !selectedSubcategory ? (
        <>
          <h3>{selectedCategory} Options:</h3>
          {supportOptions[selectedCategory].map((subcategory) => (
            <button key={subcategory} onClick={() => handleSubcategoryClick(subcategory)}>{subcategory}</button>
          ))}
          <br />
          <button onClick={() => setSelectedCategory(null)}>🔙 Back</button>
        </>
      ) : (
        <>
          <h3>{selectedSubcategory}</h3>
          {subcategoryQueryMap[selectedSubcategory]?.includes('Order ID:') && (
            <>
              <input
                type="text"
                placeholder="Enter your Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
            </>
          )}
          <br />
          <button onClick={() => setSelectedSubcategory(null)}>🔙 Back</button>
        </>
      )}

      {botResponse && (
        <div className="response-box">
          <h4>🧠 Chatbot Response:</h4>
          <p>{botResponse}</p>
        </div>
      )}
    </div>
  );
};

export default App;
