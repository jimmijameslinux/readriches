import React, { useState, useEffect } from 'react';
import '../components/css/Trading.css';

const TradingViewTicker = () => {
  const defaultSymbols = ['AAPL', 'GOOGL', 'MSFT'];
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const apiKey = 'clatb59r01qi1291dca0clatb59r01qi1291dcag';

        const promises = defaultSymbols.map(async (symbol) => {
          // const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
          // const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
          const response = await fetch();
          const data = await response.json();

          console.log(data['c']);

          if (data['c']) {
            return { symbol, data: data['c'] };
          } else if (data['Error Message']) {
            throw new Error(data['Error Message']);
          } else {
            throw new Error('Unexpected response format');
          }
        });
        const results = await Promise.all(promises);
        setStockData(results);
        setError(null);
      } catch (error) {
        setStockData([]);
        setError("Couldn't fetch stock data");
      }
    };

    fetchStockData();
  }, []);

  const getChangeColor = (change) => {
    return change >= 0 ? 'green' : 'red';
  };

  return (
    <div className='Tradecontainer'>
      {error && <p>{error}</p>}
      {stockData.map((stock) => (
        <div className='Stockele' key={stock.symbol} style={{ border: `2px solid ${getChangeColor(stock?.data['c'])}`, padding: '10px', margin: '10px' }}>
          <p>Symbol: {stock.symbol}</p>
          <p>Price: ${parseFloat(stock?.data['c']).toFixed(2)}</p>
          <p style={{ color: getChangeColor(stock?.data['09. change']) }}>Change: {stock?.data['09. change']}</p>
          <p style={{ color: getChangeColor(stock?.data['10. change percent']) }}>
            Percent Change: {stock?.data['10. change percent']}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TradingViewTicker;
