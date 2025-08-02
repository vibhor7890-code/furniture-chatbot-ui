import React, { useState } from 'react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [orderInputRequired, setOrderInputRequired] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');

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
    setOrderInputRequired(false);
    setChatbotResponse('');
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    const needsOrderId = ['Track My Order', 'Cancel My Order', 'View My Order Details'];
    if (needsOrderId.includes(subcategory)) {
      setOrderInputRequired(true);
    } else {
      fetchBotResponse(subcategory);
    }
  };

  const fetchBotResponse = async (query) => {
    setChatbotResponse("Fetching response...");

    try {
      const response = await fetch("https://c2bda09f-cc56-4a84-8654-b9b4dd5877ae-00-2k3ax47d18h9f.sisko.replit.dev/docs#/default/query_docs_query_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend Error:", errorText);
        throw new Error("Response not ok");
      }
      const data = await response.json();
      setChatbotResponse(data.answer || "No response received.");
    } catch (error) {
      console.error("Error:", error);
      setChatbotResponse("Error fetching response.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🪑 WoodenStreet Customer Support</h2>

      {!selectedCategory ? (
        <>
          <h4>Select a support category:</h4>
          {Object.keys(supportOptions).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{ margin: '5px', padding: '10px' }}
            >
              {category}
            </button>
          ))}
        </>
      ) : !selectedSubcategory ? (
        <>
          <h4>{selectedCategory} Options:</h4>
          {supportOptions[selectedCategory].map((sub) => (
            <button
              key={sub}
              onClick={() => handleSubcategoryClick(sub)}
              style={{ margin: '5px', padding: '10px' }}
            >
              {sub}
            </button>
          ))}
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setSelectedCategory(null)}>⬅️ Back</button>
          </div>
        </>
      ) : null}

      {orderInputRequired && (
        <div style={{ marginTop: 20 }}>
          <input
            type="text"
            placeholder="Enter your Order ID"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ padding: '8px', width: '200px' }}
          />
          <button
            onClick={() => {
              const combinedQuery = `${selectedSubcategory}? Order ID: ${userInput}`;
              fetchBotResponse(combinedQuery);
              setOrderInputRequired(false);
              setUserInput('');
            }}
            style={{ marginLeft: '10px', padding: '8px' }}
          >
            Submit
          </button>
        </div>
      )}

      {chatbotResponse && (
        <div style={{ marginTop: '30px', backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '10px' }}>
          <strong>🧠 Chatbot Response:</strong>
          <p>{chatbotResponse}</p>
        </div>
      )}
    </div>
  );
};

export default App;
