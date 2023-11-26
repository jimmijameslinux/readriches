// Main.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Categories from './Categories';
import Card from './Card';
import './css/Main.css';
import Banner from './Banner';
import News from './News';
import "../components/css/Aside.css";
import Img from '../components/img/img1.webp'
import indigo from '../components/img/indigo2.png';
import ihcl from '../components/img/ihcl2.png';
import vedanta from '../components/img/vedanta2.png';
import mahindra from '../components/img/mahindra.png';
import wipro from '../components/img/wipro2.png';
import itc from '../components/img/itc.png';
import diamines from '../components/img/diamines2.png';
import allsec from '../components/img/allsec.png';
import rubfila from '../components/img/rubfila.png';
import gandhi from '../components/img/gandhi2.png';



const Main = ({getCarddata,carddata}) => {
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


useEffect(() => {
  // Set loading to true when starting to fetch news
  setLoading(true);

  // Fetch news data
  fetchNews().then(() => {
    // Set loading to false when news data is fetched
    setLoading(false);
  });
}, []);

const fetchNews = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_SECRET}`
      // Replace 'YOUR_API_KEY' with your actual News API key
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news data');
    }

    const data = await response.json();
    // if any of the articles are missing an image, exclude them from the results
    const articles = data.articles
      .filter(article => article.title && article.description && article.url && article.urlToImage)
      .map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        img: article.urlToImage,
      }));

    setNewsItems(articles);
  } catch (error) {
    console.error('Error fetching news data:', error.message);
  }
};

const cardData = [
  { company_name: 'Indigo Airlines', title: 'Unmasking the Risks', category: 'Aviation', img: Img, img2: indigo,cardcolorprimary:'#009BFF', cardcolorsecondary:'#8300FF'},
  { company_name: 'Taj Hotels', title:'Decoding the market position',category: 'Hospitality', img: Img, img2: ihcl,cardcolorprimary:'white', cardcolorsecondary:'grey' },
  { company_name: 'Vedanta',title:'Debt Overload & Unlocking the Value', category: 'Metals & Minerals', img: Img, img2: vedanta,cardcolorprimary:'white', cardcolorsecondary:'green' },
  { company_name: 'Mahindra',title: 'Navigating Market Turbulence', category: 'Automobile & Ancillaries', img: Img, img2: mahindra,cardcolorprimary:'pink', cardcolorsecondary:'red' },
  { company_name: 'Wipro',title: 'From Data to Dollars', category: 'IT & Software', img: Img, img2: wipro,cardcolorprimary:'purple', cardcolorsecondary:'orange' },
  { company_name: 'ITC',title: 'From Strategy to Execution', category: 'FMCG', img: Img, img2: itc,cardcolorprimary:'yellow', cardcolorsecondary:'orange' },
  { company_name: 'Diamines',title: 'Behind the scenes', category: 'Chemicals', img: Img, img2: diamines,cardcolorprimary:'cyan', cardcolorsecondary:'lime' },
  { company_name: 'Allsec',title: 'Understanding the operations', category: 'IT & Software', img: Img, img2: allsec,cardcolorprimary:'red', cardcolorsecondary:'brown' },
  { company_name: 'Rubfila',title: 'Dissecting the strengths & weakness', category: 'Automobile & Ancillaries', img: Img, img2: rubfila,cardcolorprimary:'cyan', cardcolorsecondary:'orange' },
  { company_name: 'Gandhi Special tubes',title: 'Uncovering the hidden gems', category: 'Capital Goods', img: Img, img2: gandhi,cardcolorprimary:'white', cardcolorsecondary:'blue' },
];

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
  setLength(combinedFilteredCards.length > 0);
}, [combinedFilteredCards]);

useEffect(() => {
  getCarddata();
}, []);
return (
  <main>
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
          />
          ))
          :
          <div style={{display:"flex",justifyContent:"center"}}>
          <h1>No Results Found</h1>
          </div>
        }
      </div>
      <News newsItems={newsItems} loading={loading} />
    </div>
  </main>
);
}

export default Main;