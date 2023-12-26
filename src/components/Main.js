// Main.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Categories from './Categories';
import Card from './Card';
import './css/Main.css';
import Banner from './Banner';
import "../components/css/Aside.css";
// import Img from '../components/img/img1.webp'
// import indigo from '../components/img/indigo2.png';
// import ihcl from '../components/img/ihcl2.png';
// import vedanta from '../components/img/vedanta2.png';
// import mahindra from '../components/img/mahindra.png';
// import wipro from '../components/img/wipro2.png';
// import itc from '../components/img/itc.png';
// import diamines from '../components/img/diamines2.png';
// import allsec from '../components/img/allsec.png';
// import rubfila from '../components/img/rubfila.png';
// import gandhi from '../components/img/gandhi2.png';



const Main = ({getCarddata,carddata,reload}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsItems, setNewsItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(true);


  // console.log(carddata);
// ----------------------------------------------------------
const handleCategoryChange = (category, isSearchInput) => {
  if (!isSearchInput) {
    setSearchQuery('');
  }
  setSelectedCategory(category);

};



const filteredCards = selectedCategory === 'All'
  ? carddata
  : carddata.filter(card => card.category === selectedCategory);

const handleSearch = (query) => {
  setSearchQuery(query);
};

const searchFilteredCards = (cards) => {
  return cards.filter(
    (card) =>
      card.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

const combinedFilteredCards = searchFilteredCards(filteredCards);

useEffect(() => {
  // Update the length state based on the length of combinedFilteredCards
  setLength(combinedFilteredCards.length > 0)
}, [combinedFilteredCards]);

// useEffect(() => {
//   getCarddata();
// }, [reload]);
return (
  <main className='godmain'>
    <Banner />
    <div className="main-content">
      <div className="aside">
        <SearchBar onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
        <Categories onCategoryChange={handleCategoryChange} />
      </div>
      <div className="card-section" style={{ marginTop: "1rem" }}>
        {
          length?
        combinedFilteredCards.map((card, index) => (
          <Card 
          key={index} 
          company_name={card.company_name} 
          title={card.title} 
          images={card.logoimage} 
          images2={card.mainimage} 
          primarycolor={card.first_color} 
          secondarycolor={card.second_color}
          category={card.category}
          />
          ))
          :
          <div style={{display:"flex",justifyContent:"center"}}>
          <h1 style={{color:"white"}}>No Results Found</h1>
          </div>
          // <Card 
          // key={index} 
          
          // company_name={carddata.company_name="a"} 
          // title={carddata.title="b"} 
          // images={null} 
          // images2={null} 
          // primarycolor={carddata.first_color="red"} 
          // secondarycolor={carddata.second_color="#fff"}
          // category={carddata.category="Aviation"}
          // />
        }
      </div>
    </div>
  </main>
);
}

export default Main;