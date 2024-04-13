import React, { useEffect, useState,useRef } from 'react'
import News from './News';
import TradingViewTicker from './TradingViewTicker';
import '../components/css/StockView.css';
import stock from '../components/img/stock.svg';
import stocksearch from '../components/img/stocksearch.png';
import stockfilter from '../components/img/stockfilter.png';

export default function StockView() {
  const [loading, setLoading] = useState(true);
  const [newsItems, setNewsItems] = useState([]);
  const [datas, setDatas] = useState([]);
  const [isAnimated, setIsAnimated] = useState(false);

  const stockdivRef = useRef(null);

  useEffect(() => {
    // Set loading to true when starting to fetch news
    setLoading(true);
    // Fetch news data
    fetchNews().then(() => {
      // Set loading to false when news data is fetched
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchNews, 1200000); // Fetch news every 20 minutes

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function animation() {
      if (!stockdivRef.current) return;

      setIsAnimated(true);

      const scrollinner = stockdivRef.current.querySelector('.Tradecontainer');
      if (!scrollinner) return;

      const scrollcontent = Array.from(scrollinner.children);

      scrollcontent.forEach((item) => {
        const duplicate = item.cloneNode(true);
        duplicate.setAttribute("aria-hidden", "true");
        scrollinner.appendChild(duplicate);
      });
    }

    animation();

    // Cleanup function to remove cloned elements when component unmounts
    return () => {
      if (!stockdivRef.current) return;

      setIsAnimated(false);

      const scrollinner = stockdivRef.current.querySelector('.Tradecontainer');
      if (!scrollinner) return;

      const clonedItems = scrollinner.querySelectorAll('[aria-hidden="true"]');
      clonedItems.forEach((item) => {
        scrollinner.removeChild(item);
      });
    };
  }, []);


  const fetchNews = async () => {
    try {
      const newsapi = process.env.REACT_APP_NEWS;
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapi}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news data');
      }

      const data = await response.json();
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
  const updateDatas = (newDatas) => {
    setDatas(newDatas);
  };

  let roundedNumber = (val) => {
    return val.toFixed(3);
  }

  const getChangeColor = (change) => {
    return change > 0 ? '#1AB032' : 'red';
  };

  // const stockdiv = document.querySelector('.stockdivcontainer');

  // const stockclickfunc = () => {
  //   const stocktableclick = document.querySelectorAll('.stocktableclick');
  //   stocktableclick.forEach((item) => {
  //     item.addEventListener('click', () => {
  //       // item.style.backgroundColor = "#1E6E76";
  //       // item.style.color = "#fff";
  //       if (item.style.backgroundColor !== "#1E6E76") {
  //         item.style.backgroundColor = "#1E6E76";
  //         item.style.color = "#fff";
  //       }

  //       if (item.style.backgroundColor === "#1E6E76") {
  //         item.style.backgroundColor = "#fff";
  //         item.style.color = "#000"
  //       }
  //       console.log("clicked")
  //     });
  //   });
  // }


  const pricerecomdate = 460;
  const totalinvestedtime = 12;
  // console.log((datas.c/{pricerecomdate})**(12/{totalinvestedtime})-1)
  // console.log(datas[0].data['c']);
  // const a = (datas[0].data['c'])/(pricerecomdate);
  // const b = 12/(totalinvestedtime);
  // const c = (a**b)-1;
  // console.log(c*100);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };


  return (
    <>
      <div style={{
        padding: "4rem 0rem 6rem",
        backgroundColor: "#1C656D",
      }}>
        <img src={stock} alt="stock" style={{ width: "100%", height: "auto", marginTop: "2rem", marginBottom: "4rem" }} />
        <div className='stockdivcontainer' style={{ justifyContent: datas.length === 0 && "center", color: datas.length === 0 && "#fff" }} ref={stockdivRef}>
          {
            // datas.length!==0?
              isAnimated ?
                <TradingViewTicker defaultSymbols={defaultSymbols} updateDatas={updateDatas} />
                : null
            // :
            // <p style={{fontSize:"2rem",textAlign:"center"}}>No Data</p>
          }
          {/* {console.log(datas)} */}
        </div>
        <h2 className='stocktitle' style={{ textAlign: "center", width: "100%", marginBottom: "1rem" }}>Stock Comparison</h2>
        {/*  */}
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'inline-flex', padding: "1rem", paddingInline: "5rem" }}>
          <div style={{ gap: 30, display: 'flex' }}>
            <div>
              <div style={{ color: '#FAFAFA', fontSize: 20, fontFamily: 'Roboto Serif', fontWeight: '700', textTransform: 'capitalize', wordWrap: 'break-word' }}>75% equity</div>
            </div>
            <div style={{ color: '#FAFAFA', fontSize: 20, fontFamily: 'Roboto Serif', fontWeight: '300', textTransform: 'capitalize', wordWrap: 'break-word' }}> 32%bonds</div>
            <div style={{ color: '#FAFAFA', fontSize: 20, fontFamily: 'Roboto Serif', fontWeight: '300', textTransform: 'capitalize', wordWrap: 'break-word' }}>Industry </div>
          </div>
          <div style={{ flex: '1 1 0', justifyContent: 'flex-end', gap: 20, display: 'flex' }}>
            <div style={{ height: 46, paddingLeft: 10, paddingRight: 10, paddingTop: 7, paddingBottom: 7, borderRadius: 10, border: '1px #F2DDC2 solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
              <img src={stocksearch} alt="" />
              <div style={{ color: '#F2DDC2', fontSize: 16, fontFamily: 'Roboto Serif', fontWeight: '500', textTransform: 'capitalize', wordWrap: 'break-word' }}>search</div>
            </div>

            <div style={{ height: 46, paddingLeft: 10, paddingRight: 10, paddingTop: 7, paddingBottom: 7, background: '#F2DDC2', borderRadius: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
              <img src={stockfilter} alt="" />
              <div style={{ color: '#242424', fontSize: 16, fontFamily: 'Roboto Serif', fontWeight: '500', textTransform: 'capitalize', wordWrap: 'break-word' }}>Filters</div>
            </div>
          </div>
        </div>
        {/*  */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: "column", height: "fit-content" }}>
          {/* div with fake stockticker content */}
          <div className='table-container' style={{ width: "100%", display: "flex", flexDirection: "column", height: "fit-content", marginBottom: "5rem", paddingInline: "5rem", borderRadius: "10px" }}>
            <table>
              <thead>
                <tr style={{ width: "100%" }}>
                  <th>S.No.</th>
                  <th>Company Name</th>
                  <th>Price on recommended date </th>
                  <th>Current Price</th>
                  <th>Date of posting</th>
                  <th>Today's date</th>
                  <th>Total invested time (in month(s))</th>
                  <th>CAGR</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr className='stocktableclick'
                    key={data.symbol}>
                    <td>{index + 1}</td>
                    <td>{data.symbol}</td>
                    <td style={{ textTransform: "uppercase" }}>{pricerecomdate}</td>
                    <td>
                      {data.data.c}
                    </td>
                    <td>{formatDate(data.data.t)}</td>
                    <td>{formatDate(Date.now())}</td>
                    <td>{totalinvestedtime}</td>
                    {/* <td>{data.data.o}</td> */}
                    <td style={{ color: getChangeColor(roundedNumber((data.data.c / pricerecomdate) ** (12 / totalinvestedtime) - 1)) }}>
                      {roundedNumber((((data.data.c / pricerecomdate) ** (12 / totalinvestedtime)) - 1) * 100)}%
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
            {datas.length === 0 && <p style={{ fontSize: "2rem", textAlign: "center" }}>No Data</p>}
          </div>

          <News newsItems={newsItems} loading={loading} />

        </div>
      </div>

    </>
  )
}
