import React, { useState } from 'react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const supportOptions: Record<string, string[]> = {
    'Order Support': ['Track My Order', 'Cancel My Order', 'View My Order Details'],
    'Product Info': ['Material Details', 'Dimension Queries', 'Assembly Instructions'],
    'Returns & Refunds': ['Return Policy', 'Refund Status', 'Return A Product'],
    'Warranty': ['Claim Warranty', 'Warranty Terms'],
    'Installation': ['Schedule Installation', 'Reschedule', 'Installation Status'],
    'Other Queries': ['Store Locator', 'Chat with Agent']
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    // Here you can trigger an API call or chatbot backend query
    console.log('Selected:', selectedCategory, '>', subcategory);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>👋 Welcome to WoodenStreet Support</h2>

      {!selectedCategory ? (
        <>
          <h4>Please select a support category:</h4>
          {Object.keys(supportOptions).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{
                margin: 8,
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '10px',
                border: '1px solid #aaa'
              }}
            >
              {category}
            </button>
          ))}
        </>
      ) : !selectedSubcategory ? (
        <>
          <h4>{selectedCategory} options:</h4>
          {supportOptions[selectedCategory].map((option) => (
            <button
              key={option}
              onClick={() => handleSubcategoryClick(option)}
              style={{
                margin: 8,
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '10px',
                border: '1px solid #aaa'
              }}
            >
              {option}
            </button>
          ))}
          <br />
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              marginTop: 20,
              background: '#eee',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            ⬅ Back
          </button>
        </>
      ) : (
        <>
          <h4>✅ You selected:</h4>
          <p>
            <strong>{selectedCategory} → {selectedSubcategory}</strong>
          </p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubcategory(null);
            }}
            style={{
              marginTop: 20,
              background: '#eee',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          >
            🔄 Start Over
          </button>
        </>
      )}
    </div>
  );
};

export default App;
