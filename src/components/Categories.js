// Categories.js
import React, { useState } from 'react';
import '../components/css/Categories.css';
import all from '../components/img/all.png'
import automobile from '../components/img/car_model.svg'
import aviation from '../components/img/aviation.png'
import capital from '../components/img/capital.png'
import chemicals from '../components/img/chemical_drop.svg'
import fmcg from '../components/img/fmcg.png'
import hospitality from '../components/img/user_love.svg'
import it from '../components/img/cloud.svg'
import metals from '../components/img/heavy_metal.svg'


const Categories = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const categories = [
    ['All', all],
    ['Automobile & Ancillaries', automobile],
    ['Aviation', aviation],
    ['Capital Goods', capital],
    ['Chemicals', chemicals],
    ['FMCG', fmcg],
    ['Hospitality', hospitality],
    ['IT & Software', it],
    ['Metals', metals]
  ];


  return (
    <div className="categories">
      <h2>Sectors</h2>
      <ul>
        {
          // console.log(categories[0][0])
        }
        {categories.map((category) => (
          // console.log(category[0]),
          <li
            key={category}
            className={selectedCategory === category[0] ? 'category_active' : ''}
            onClick={() => handleCategoryChange(category[0])}
            style={{ display: "flex", justifyContent: "flex-start", alignItems: "center",position:"relative",gap:"1.5rem" }}
            title={category[0]}
          >
            <img src={category[1]} alt="category" width="25px" />
            <span>
              {category[0]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
