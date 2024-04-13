// Main.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Categories from './Categories';
import Card from './Card';
import './css/Main.css';
import Banner from './Banner';
// import cross_sign from './img/cross_sign.png';
import "../components/css/Aside.css";
import '../components/css/News.css';
import { useNavigate} from 'react-router-dom';
import financial from './img/smallgraph.png';

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



const Main = ({ getCarddata, carddata, reload, loading, loginStatus, setCardvideo,userid,cardcontentprogress,setCardcontentprogress }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  // const [newsItems, setNewsItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [length, setLength] = useState(true);
  const [creditscore, setCreditscore] = useState(4);
  const [alertlogin, setalertlogin] = useState(false);
  const [alertcreditscore, setalertcreditscore] = useState(false);

  const navigate = useNavigate();


 


  const [cardmouseeventdisable, setCardmouseeventdisable] = useState(false);

  useEffect(() => {
    // Update cardmouseeventdisable based on creditscore
    setCardmouseeventdisable(creditscore < 1);
  }, [creditscore]);


  // console.log(creditscore)
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

  // console.log(loginStatus.success)

  // useEffect(() => {
  //   getCarddata();
  // }, [reload]);
  return (
    <main className='godmain' style={{
      // display: alertlogin && 'flex',
      justifyContent: alertlogin && 'center'
      , alignItems: alertlogin && 'center',
    }}>
      {
        alertlogin &&
        <>
          <div className="alert" role="alert">
            <div>
              <h3>Alert</h3>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setalertlogin(false)}>
                {/* <img src={cross_sign} style={{color:"white"}} alt="cross_sign" /> */}
                &times;
              </button>
            </div>
            <p>
              Please login to continue.
            </p>

            <div className='btnoptions'>

              <button onClick={() => {
                navigate('/login');
              }}>
                yes
              </button>
              <button onClick={() => setalertlogin(false)}>
                no
              </button>
            </div>
          </div>
          <div className='alert-bg' onClick={() => setalertlogin(false)}>

          </div>
        </>
      }
      {
        alertcreditscore &&
        <>
          <div className="alert" role="alert">
            <div>
              <h3>Alert</h3>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setalertcreditscore(false)}>
                {/* <img src={cross_sign} style={{color:"white"}} alt="cross_sign" /> */}
                &times;
              </button>
            </div>
            <p>
              Please Buy premium.
            </p>

            <div className='btnoptions'>

              <button onClick={() => {
                navigate('/pricing');
              }}>
                yes
              </button>
              <button onClick={() => setalertcreditscore(false)}>
                no
              </button>
            </div>
          </div>
          <div className='alert-bg' onClick={() => setalertcreditscore(false)}>
          </div>
        </>
      }
      <Banner />
      <span className='invin1'></span>
      <span className='invin2'></span>
      <div className='financeinfo'>
        <img src={financial} alt='finance' />
        <div className='financeinfocontent'>
          <span >Financial Reports</span>
          <p>In this section, we delve into the financial performance of various companies, offering insightful analyses and summaries of their latest financial reports.</p>
          <hr />
          <span className='circle'></span>
        </div>
      </div>
      <div className="main-content">
        <div className="aside">
          <SearchBar onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
          <Categories onCategoryChange={handleCategoryChange} />
        </div>
        <div className="card-section" style={{ marginTop: "1rem" }}>
          {loading ? (
            // Loading animation while data is being fetched
            <div className='loading'>
              <div className='spinner'>

              </div>
              {/* <p style={{ color: "#fff" }}>Loading news...</p> */}
            </div>
          ) :
            length ?
              combinedFilteredCards.map((card, index) => (
                <Card
                  key={index}
                  index={index}
                  company_name={card.company_name}
                  title={card.title}
                  images={card.logoimage}
                  images2={card.mainimage}
                  primarycolor={card.first_color}
                  secondarycolor={card.second_color}
                  category={card.category}
                  creditscore={creditscore}
                  setCreditscore={setCreditscore}
                  cardmouseeventdisable={cardmouseeventdisable}
                  loginStatus={loginStatus}
                  setalertlogin={setalertlogin}
                  setalertcreditscore={setalertcreditscore}
                  video={card.video}
                  userid={userid}
                  cardcontentprogress={cardcontentprogress}
                  setCardcontentprogress={setCardcontentprogress}
                />
              ))
              :
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>No Data Available</h1>
              </div>
          }
        </div>
      </div>
    </main>
  );
}

export default Main;