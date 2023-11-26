// Categories.js
import React, { useState } from 'react';
import '../components/css/Categories.css';

const Categories = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const categories = [
    'All',
    'Automobile & Ancillaries',
    'Aviation',
    'Capital Goods',
    'Chemicals',
    'FMCG',
    'Hospitality',
    'IT & Software',
    'Metals & Minerals',
  ];

  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={selectedCategory === category ? 'category_active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
