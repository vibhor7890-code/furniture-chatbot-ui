import React, { useState } from 'react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

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
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    alert(`You selected: ${subcategory}`);
    // Later we will send this to the backend as a query.
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>👋 Welcome to WoodenStreet Support</h2>
      {!selectedCategory && (
        <div>
          <h4>Select a Support Category:</h4>
          {Object.keys(supportOptions).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{ margin: 8, padding: 10 }}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {selectedCategory && (
        <div>
          <h4>{selectedCategory} Options:</h4>
          {supportOptions[selectedCategory].map((subcategory) => (
            <button
              key={subcategory}
              onClick={() => handleSubcategoryClick(subcategory)}
              style={{ margin: 8, padding: 10 }}
            >
              {subcategory}
            </button>
          ))}
          <div style={{ marginTop: 20 }}>
            <button onClick={() => setSelectedCategory(null)}>⬅ Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
