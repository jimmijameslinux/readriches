import React, { useState, useEffect } from 'react';
import '../components/css/Trading.css';

const TradingViewTicker = ({defaultSymbols,updateDatas}) => {
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const apiKey = process.env.REACT_APP_STOCK;


        const promises = defaultSymbols.map(async (symbol) => {
          const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data['c']) {
            return { symbol, data };
          }
          else {
            return { symbol, data: { 'c': 0, 'd': 0, 'dp': 0 } };
          }
        });
        const results = await Promise.all(promises);
        setStockData(results);
        updateDatas(results);
        setError(null);
      } catch (error) {
        setStockData([]);
        setError("Couldn't fetch stock data");
      }
    };

    
    // Set up interval for periodic fetch
    const intervalId = setInterval(fetchStockData, 1200000); // Fetch every 60 seconds
    fetchStockData();


  // Cleanup the interval on component unmount
   return () => clearInterval(intervalId);


  },[]);



  const getChangeColor = (change) => {
    return change > 0 ? 'green': 'red';
  };

  return (
    <div className='Tradecontainer'>
      
      {!error?stockData.map((stock) => (
        <div className='Stockele' key={stock.symbol} style={{ margin: '10px' }}>
          <p>{stock.symbol}</p>
          <p>${parseFloat(stock?.data['c']).toFixed(2)}</p>
          <p style={{ color: getChangeColor(stock?.data['d']) }}>
           
            {
              getChangeColor(stock?.data['d']) === 'green' ? (
                // +
                <>
                <svg width="15px" class="svg-inline--fa fa-caret-up fa-w-10" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
                <span>
                  &#43;
                </span>
                </>

              ) : (
                // -
                <>
                <svg width="15px" class="svg-inline--fa fa-caret-down fa-w-10" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
                </>
              )
            }
            {stock?.data['d']}
          </p>
            &#40;
          <p style={{ color: getChangeColor(stock?.data['dp']) }}>
            {
              getChangeColor(stock?.data['dp']) === 'green' ? (
                <>
                 <span>
                  &#43;
                </span>
                </>
              ) : (
                <>
                </>
              )
            }
            {stock?.data['dp'] + "%"}
          </p>
            &#41;
        </div>
      )):<p style={{color: "#fff",textAlign:"center",width:"100%",fontSize:"2.1rem"}}>No Stock data</p>}
    </div>
  );
};

export default TradingViewTicker;
