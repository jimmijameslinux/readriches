import React, { useEffect, useState } from 'react'
import News from './News';
import TradingViewTicker from './TradingViewTicker';
import '../components/css/StockView.css';

export default function StockView() {
  const [loading, setLoading] = useState(true);
  const [newsItems, setNewsItems] = useState([]);
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
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=a66821a1224a4fd6bd69189d8b74a4d6`
        // Replace 'YOUR_API_KEY' with your actual News API key
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news data');
      }

      const data = await response.json();
      console.log(data);
      // if any of the articles are missing an image, exclude them from the results
      const articles = data.articles
        .filter(article => article.title && article.description && article.url && article.urlToImage && article.source)
        .map(article => ({
          title: article.title,
          description: article.description,
          url: article.url,
          img: article.urlToImage,
          source: article.source.name,
        }));

      setNewsItems(articles);
    } catch (error) {
      console.error('Error fetching news data:', error.message);
    }
  };

  const defaultSymbols = ['AAPL', 'GOOGL', 'MSFT'];
  const [datas, setDatas] = useState([]);
  const updateDatas = (newDatas) => {
    setDatas(newDatas);
  };

  // 2 decimal place number formatter without rounding off

  let roundedNumber = (val) => {
    return val.toFixed(3);
  }

  const getChangeColor = (change) => {
    return change > 0 ? 'green' : 'red';
  };

  return (
    <>
    <div style={{
      padding: "6rem",
      backgroundColor: "#ececec",
      height: "100vh",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // color: "#fff",
        backgroundColor: "#fff",
        marginBottom: "5rem",
        position: "relative",
        top: "-1px",
        borderRadius: "2rem",
        filter: "drop-shadow(0px 0px 10px rgba(0,0,0,0.2))",
      }}>
        <TradingViewTicker defaultSymbols={defaultSymbols} updateDatas={updateDatas} />
        {/* {console.log(datas)} */}
      </div>
      <h2 style={{ textAlign: "center", width: "70%" }}>STOCKS</h2>
      <div style={{ display: "flex", justifyContent: "space-between",alignItems:"flex-start" }}>
        {/* div with fake stockticker content */}
        <div className='table-container' style={{ width: "75vw", display: "flex", flexDirection: "column", height: "fit-content" }}>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Company Name</th>
                <th>Industry</th>
                <th>Current Price</th>
                <th>Fair Price</th>
                <th>Undervalued/Overvalued</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={data.symbol}>
                  <td>{index + 1}</td>
                  <td>{data.symbol}</td>
                  <td>{"n/a"}</td>
                  <td>{data.data.c}</td>
                  <td>{data.data.o}</td>
                  <td style={{ color: getChangeColor(roundedNumber((data.data.o - data.data.c) / data.data.o)) }}>{roundedNumber((data.data.o - data.data.c) / data.data.o)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {datas.length === 0 && <p style={{ fontSize: "2rem", textAlign: "center" }}>No Data</p>}
        </div>

        <News newsItems={newsItems} loading={loading} />

      </div>
    </div>
      <div style={{padding:"6rem",backgroundColor:"#fff"}}>
        <h3 style={{ textAlign: "center", fontSize: "2rem",marginBottom:"2rem" }}>How do we pick companies?</h3>

        <p style={{ fontSize: "1.5rem",marginBottom:"2rem" }}>

          Unveiling Our In-House Algorithm
        </p>
        <p style={{ fontSize: "1.5rem", display:"flex",flexDirection:"column",rowGap:"2rem" }}>

          {/* <p> */}

          At Read Riches, our company selection process is powered by a proprietary algorithm developed in-house. This algorithm serves as our compass in the vast landscape of stocks, helping us pinpoint companies that fall into distinct categories.
          {/* </p> */}

          <h5>

            Spotting Market Leaders:
          </h5>

          Our algorithm is like a spotlight that identifies companies standing tall in their industries. These are the heavyweights, the names that echo throughout the market with their established dominance.

          <h5>

            Seeking Hidden Gems with Growth Potential:
          </h5>
          Going beyond the obvious, our algorithm uncovers companies flying under the radar but with huge growth potential. These hidden gems might be undervalued now, but our tool predicts a promising future with substantial upside.

          <br />
          So, when we talk about picking companies, it's not just about a random choice. It's about leveraging our smart algorithm to pinpoint both the established leaders and the promising underdogs. It's like having a strategic partner in the stock market game, helping us make informed decisions.
        </p>

      </div>
              </>
  )
}
