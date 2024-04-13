import React, { useEffect, useState } from 'react';
import '../components/css/About.css'
// import logo from '../components/img/logo.svg'
// import logo2 from '../components/img/logo2.svg'
// import logo3 from '../components/img/logo3.svg'
// import wave from '../components/img/wave.svg'
import founder1 from '../components/img/Pranay.jpg'
import founder2 from '../components/img/rudransh.jpg'
import community1 from '../components/img/community1.jpg'
import community2 from '../components/img/community2.jpg'
import community3 from '../components/img/community3.jpg'
import community4 from '../components/img/community4.jpg'
import community5 from '../components/img/community5.jpg'
import bull from '../components/img/new.jpg'
import binocular from '../components/img/invertbinocular.svg'
// import pillartop from '../components/img/pillartop.svg'
// import pillartoppart from '../components/img/pillartoppart.svg'
// import pickcmpy from '../components/img/pickcmpy.png'
// import arrow from '../components/img/arrow.png'
// import founderarrow from '../components/img/founderarrow.png'
import creativity from '../components/img/creativity.svg'
import eclipse from '../components/img/eclipse.svg'
import communityarrow from '../components/img/communityarrow.svg'
import communitystar from '../components/img/communitystar.svg'
import foundertwitter from '../components/img/foundertwitter.svg'
import founderlinkedin from '../components/img/founderlinkedin.svg'
import founderinstagram from '../components/img/founderinstagram.svg'
import founderfacebook from '../components/img/founderfacebook.svg'
import simply from '../components/img/simply.jpg'
import exclusive from '../components/img/exclusive.webp'
import create from '../components/img/create.webp'
// import { useInView } from 'react-intersection-observer';
const About = () => {
  // const [scrollY, setScrollY] = useState(0);
  // community
  // STYLE BG : #1E6E76
  const [currentCard, setCurrentCard] = useState(1); // Initial card index
  const timeinterval = 5000; // Time interval for automatic sliding

  const handlePrevClick = () => {
    setCurrentCard((prev) => (prev === 1 ? 5 : prev - 1)); // Updated to handle five cards
    // setProgress(0);
  };

  const handleNextClick = () => {
    setCurrentCard((prev) => (prev === 5 ? 1 : prev + 1)); // Updated to handle five cards
    // setProgress(0);
  };

  // const scrollup = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth"
  //   });
  // }

  // const [progress, setProgress] = useState(0);

  // set timeinterval for next
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, timeinterval);

    // Update progress every second
    // const progressInterval = setInterval(() => {
    //   setProgress((prev) => (prev + 1000) % timeinterval); // Increment progress every second
    // }, 1000);

    return () => {
      clearInterval(interval);
      // clearInterval(progressInterval);
    };
  }, []);
  // const [rotation, setRotation] = useState(0);

  // // const sectionARef = useRef(null);
  // const sectionBRef = useRef(null);
  // const sectionCRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const sectionBOffset = sectionBRef.current.offsetTop + 380;
  //     const sectionCOffset = sectionCRef.current.offsetTop + 380;

  //     if (scrollPosition >= sectionBOffset && scrollPosition < sectionCOffset) {
  //       setRotation(120);
  //     } else if (scrollPosition >= sectionCOffset) {
  //       setRotation(135);
  //     } else {
  //       setRotation(0);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [sectionBRef, sectionCRef]);



  return (
    <>
      <div className='scrollprogress'>
      </div>
      <main className='aboutmain' style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100vw",
        // padding: "2rem",
        // color: "#fff"
      }}>


        <div className='allabout' style={{ display: "flex" }}>
          <div className='aboutsections' style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>

            <section id='sectiona'>
              <div className='read'>
                Read
              </div>
              {/* <h1 style={{ fontSize: "3.5rem", margintop: "10rem", textAlign: "center" }}>About Us</h1> */}
              <div className='sectionadiv' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div id='aboutimgcontainer'>
                  <img src={bull} alt='placeholder' />
                  <div className='lines'>
                    <div id='line1' className='line'></div>
                    <div id='line2' className='line'></div>
                    <div id='line3' className='line'></div>
                    <div id='line4' className='line'></div>
                    <div id='line5' className='line'></div>
                    <div id='line6' className='line'></div>
                    <div id='line7' className='line'></div>
                    <div id='line8' className='line'></div>
                    <div id='line9' className='line'></div>
                    <div id='line10' className='line'></div>
                    <div id='line11' className='line'></div>
                  </div>
                </div>
                <div className='crazynestingsectiona' >
                  {/* <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>What is Read Riches?</h2> */}
                  <div className='aboutusheading'>
                    <span>
                      {/* about the firm */}
                    </span>
                    <p>
                      what is read riches?
                    </p>
                  </div>
                  <div className='paragraph_abt'>
                    <p>
                      Read Riches is changing how everyone understands big businesses. We are making it super easy for everyone to see and understand what a company is all about. We're like wizards turning complicated stuff into fun pictures and stories so that everyone can get it, like turning a puzzle into a cool picture.
                      {/* We're like the leaders in making corporate jargon easy-peasy. */}
                    </p>
                    <p style={{
                      color: "rgba(28, 101, 109, 1)",
                      fontWeight: "700"
                    }}>
                      {/* <u>
                        Learn More
                      </u> */}
                    </p>
                  </div>
                  {/* <p>
                    Our goal is crystal clear – we want to be the front-runners in making business analysis simple and fun. We're using our creative vibes to give you the full picture so you not only get what's going on with a company but actually enjoy it. It's like magic, turning all the boring numbers into something rad!
                  </p> */}
                </div>
                <div className='crazystuffbg'></div>
                {/* <span className='aboutimgbef'></span> */}
              </div>
              <div className='riches'>
                Riches
              </div>
            </section>
            {/* <img src={wave} alt='wave' style={{ width: "100%", height: "auto" }} /> */}

            <section id='sectionb' style={{ display: "flex" }}>
              <div className='binocular'>
                <img src={binocular} alt='binocular' />
              </div>
              <div className='bruh' style={{ position: "relative" }}>
                {/* <div className='bruh1'>
                <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Our Vision</h2>

                <div style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                  We're Read Riches, and our vision is like painting a rad future where checking out company stuff isn't a snooze-fest but a crazy journey. Our main deal? Keep it simple, get wildly creative, and make it feel super exclusive.
                  Picture a masterpiece where every piece of info tells a dope story—that's us weaving insight into every nook. Our vision? To be the architects of an era where digging into a company isn't a chore but a mind-blowing revelation. And guess what? We're bringing that vision to life with our platform.
                </div> */}
                <div className='binocularvision'>
                  <p className='v'>
                    Our Vision
                  </p>
                  <p>
                    Empowering informed decisions through clear financial insights.
                  </p>
                </div>
                {/* <h2>Our Vision</h2> */}
                <p>
                  We're Read Riches, and our vision is like painting a rad future where checking out company stuff isn't a snooze-fest but a crazy journey. Our main deal? Keep it simple, get wildly creative, and make it feel super exclusive.
                  Picture a masterpiece where every piece of info tells a dope story—that's us weaving insight into every nook. Our vision? To be the architects of an era where digging into a company isn't a chore but a mind-blowing revelation. And guess what? We're bringing that vision to life with our platform.

                </p>
              </div>
              {/* <span className='bruhbef'></span> */}
              {/* <span className='bruhcircleglow'></span> */}
              <span className='linevision'></span>
              <span className='circle'></span>
            </section>

            <section id='pickstock'>
              <div>
                <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                  <h3 style={{ textAlign: "left", fontSize: "2rem", marginBottom: "2rem", textTransform: "capitalize", color: "#000", width: "40%", lineHeight: "3rem" }}>How do we pick companies?
                  </h3>
                  <div className='linecircle'>
                    <div className='linevision'></div>
                    <div className='circle'></div>
                  </div>
                </div>
                <div className='pickstockcontent'>
                  {/* <div style={{ paddingRight: "10rem" }}> */}
                  <div className='pickstockcontent1'>
                    {/* <span className='picktopcolor'>
                    <img className='pickcmpy' src={pickcmpy} alt="error" />
                  </span> */}
                    <span className="circle2">
                      <span className="num">2</span>
                    </span>
                    <span className='pickonlytext'>
                      <span className='title_one'>
                        Spotting the market leaders
                      </span>
                      <span className='pickpara'>
                        Our algorithm is like a spotlight that identifies the companies standing tall in their industries. These are the heavyweights, the names that echo throughout the market with their established dominance                  </span>
                    </span>
                  </div>
                  {/* <span className='polygonbottom1'></span> */}

                  {/*//////////////////////////  */}
                  {/* <span className='pickstockcircleglow'></span> */}

                  <div className='pickstockcontent2'>
                    {/* <span className='picktopcolor'>
                    <img className='pickcmpy' src={pickcmpy} alt="error" />
                  </span> */}
                    <span className="circle2" id='circle2'>
                      <span className="num">1</span>
                    </span>
                    <span className='pickonlytext'>
                      <span className='title_one'>
                        Unveiling Our In-House Algorithm
                      </span>
                      <span className='pickpara'>
                        At Read Riches, our company selection process is powered by a proprietary algorithm developed in-house. This algorithm serves as our compass in the vast landscape of stocks, helping us pinpoint companies that fall into distinct categories.
                      </span>
                    </span>
                  </div>
                  {/* <span className='polygonbottom2'></span> */}

                  {/* //////////////////////////// */}

                  <div className='pickstockcontent3'>
                    {/* <span className='picktopcolor'>
                    <img className='pickcmpy' src={pickcmpy} alt="error" />
                  </span> */}
                    <span className="circle2">
                      <span className="num">3</span>
                    </span>
                    <span className='pickonlytext'>
                      <span className='title_one'>
                        Seeking hidden gems with growth potential
                      </span>
                      <span className='pickpara'>
                        Going beyond the obvious, our algorithm uncovers companies flying under the radar but with huge growth potential. These hidden gems might be undervalued now, but our tool predicts a promising future with substantial upside                 </span>
                    </span>
                  </div>
                  {/* <span className='polygonbottom3'></span> */}
                </div>
                <div className='pickstockbtns'>
                  <button className='pickstockbtn'>
                    <span>
                      2
                    </span>
                  </button>
                  <button className='pickstockbtn' id='pickstockbtn1'>
                    <span>
                      1
                    </span>
                  </button>
                  <button className='pickstockbtn'>
                    <span>
                      3
                    </span>
                  </button>
                </div>
              </div>
              <div className='pickimage'>
                <img src={bull} alt='bull' />
              </div>
              <div className='pickimgbgblue'>
              </div>
            </section>

            <div className='bruh1'>
              <div>
                <h2>
                  Three pillars that made us
                </h2>
                {/* <p>
                  This emphasizes the differentiating factors that make you stand out.
                </p> */}
                <div className='linecircle'>
                  <div className='linevision'></div>
                  <div className='circle'></div>
                </div>
              </div>
              {/* <div> */}
              <img src={eclipse} alt='eclipse' />
              {/* </div> */}
              <div className='elements'>
                <div className='pillarcontainer' id='pillar1' >
                  {/* <div className='pillar'>
                    <img src={pillartop} className='pillartopimg' alt='pillar' />
                    <img src={pillartoppart} className='pillartoppartimg' alt='pillar' />
                    <div className="pillarrectangle"></div>
                    <div className="pillarrectangle2"></div>
                    <div className="pillarrectangle3"></div>
                  </div> */}
                  <div className='eleimg'>
                    <img src={create} alt='creativity' />
                  </div>
                  <div className='elecontent'>
                    <h3 style={{ fontSize: "1.5rem", }}>Creativity</h3>
                    <p>
                    We're not just number-crunchers; we're the artists of business analysis. We transform dull data into engaging stories and visuals. Imagine your financial data as a cool graphic novel – that's the level of creativity we bring to the table.
                    </p>
                  </div>
                </div>

                <div className='pillarcontainer' id='pillar2'>
                  {/* <div className='pillar'>
                    <img src={pillartop} className='pillartopimg' alt='pillar' />
                    <img src={pillartoppart} className='pillartoppartimg' alt='pillar' />
                    <div className="pillarrectangle"></div>
                    <div className="pillarrectangle2"></div>
                    <div className="pillarrectangle3"></div>
                  </div> */}
                  <div className='eleimg'>
                    <img src={simply} alt='Simplicity' />
                  </div>
                  <div className='elecontent'>
                    <h3 style={{ fontSize: "1.5rem", }}>Simplicity</h3>
                    <p>
                    We're the ones simplifying the business maze. No complicated jargon – we break down info on public companies so that everyone can understand. It's like turning a financial report into a plain, easy story that even your neighbor could follow.
                    </p>
                  </div>
                </div>

                <div className='pillarcontainer' id='pillar3'>
                  {/* <div className='pillar'>
                    <img src={pillartop} className='pillartopimg' alt='pillar' />
                    <img src={pillartoppart} className='pillartoppartimg' alt='pillar' />
                    <div className="pillarrectangle"></div>
                    <div className="pillarrectangle2"></div>
                    <div className="pillarrectangle3"></div>
                  </div> */}
                  <div className='eleimg'>
                    <img src={exclusive} alt='Exclusivity' />
                  </div>
                  <div className='elecontent'>
                    <h3 style={{ fontSize: "1.5rem", }}>Exclusivity</h3>
                    <p>
                    Picture us as your access card to a more profound understanding of businesses. We go beyond the surface, offering insights that set you apart. It's not just information; it's a curated experience that positions you as an informed player in the business world.
                    </p>
                  </div>
                </div>

              </div>
              <img src={eclipse} alt='eclipse' />


              {/* {console.log(rotation)} */}
              {/* <div className={`abouticons rotate-${rotation}`
                }>
                  <img src={logo} width={"200px"} style={{
                    backgroundColor: "#da726b",
                    borderRadius: "50%", transform: "translate(62%, 2%)",
                  }} alt='logo' />
                  <img src={logo2} style={{
                    backgroundColor: "#f2d0b8",
                    borderRadius: "50%", transform: "translate(-92%, 89%)"
                  }} width={"200px"} alt='logo' />
                  <img src={logo3} style={{
                    backgroundColor: "#f56400",
                    borderRadius: "50%", transform: "translate(118%, -13%)"
                  }} width={"200px"} alt='logo' />
                </div> */}
            </div>
            <div className="bruh1bef"></div>



            {/* <span style={{ width: "100%", display: "flex", justifyContent: "center", position: "relative", scale: "0.85", marginBottom: "6rem" }}>
              <span className='hrcircle'></span>
              <hr />
            </span> */}

            <section id="community">
              {/* <h2 style={{ fontSize: "2rem", textAlign: "center", textTransform: "capitalize", color: "var(--Rectangle-78, #1C656D)" }}>What our community is saying?</h2> */}
              <div>
                <h2>
                  What our community is saying?
                </h2>
                {/* <p>
                  This emphasizes the differentiating factors that make you stand out.
                </p> */}
                <div className='linecircle'>
                  <div className='linevision'></div>
                  <div className='circle'></div>
                </div>
              </div>
              <div className='communitycards' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button className='prev' onClick={handlePrevClick}>
                  <img src={communityarrow} alt="error" />
                </button>

                <div className='cardone' style={{
                  display: 'flex', justifyContent: 'space-evenly',
                  transform: `translateX(${currentCard === 1 ? '0%' : '100%'})`
                }}>

                  <div className='cardinfo'>
                    <div className='bluetriangle'>

                    </div>
                    <div className='communityimg'>
                      <img src={community1} alt='placeholder' />
                    </div>
                    <div className='cardinfocontent'>
                      <p className='communityname'>
                        Ashish Gandhi
                      </p>
                      <p className='communityplace'>
                        Ambit Capital, IIM-C
                      </p>
                      <p className='communitypara'>
                        "The work on the reports showcases meticulous research. In-depth industry analysis explores trends, and challenges, backed by solid assumptions in DCF and valuation models. Peer benchmarking adds depth, while clear communication and insights
                        offer a valuable resource for understanding the company's potential and industry trends."
                      </p>
                      {/* <div className='rating'>
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />

                      </div> */}
                    </div>
                  </div>
                </div>

                <div className='cardtwo' style={{ display: 'flex', justifyContent: 'space-evenly', transform: `translateX(${currentCard === 2 ? '0%' : '200%'})` }}>

                  <div className='cardinfo'>
                    <div className='bluetriangle'>

                    </div>
                    <div className='communityimg'>
                      <img src={community2} alt='placeholder' />
                    </div>
                    <div className='cardinfocontent'>
                      <p className='communityname'>
                        Karan Galhotra,
                      </p>
                      <p className='communityplace'>
                        iVentures Capital
                      </p>
                      <p className='communitypara'>
                        "Personally, I rely on their insightful research reports for my investment strategy.
                        They delve deep into market trends and fundamental analysis to give unbiased insights.
                        Indeed, a trustworthy resource for both novice and seasoned investors."
                      </p>
                      {/* <div className='rating'>
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />

                      </div> */}
                    </div>
                  </div>
                </div>

                <div className='cardthree' style={{ display: 'flex', justifyContent: 'space-evenly', transform: `translateX(${currentCard === 3 ? '0%' : '300%'})` }}>

                  <div className='cardinfo'>
                    <div className='bluetriangle'>

                    </div>
                    <div className='communityimg'>
                      <img src={community3} alt='placeholder' />
                    </div>
                    <div className='cardinfocontent'>
                      <p className='communityname'>
                        Sanket Ahuja
                      </p>
                      <p className='communityplace'>
                        Ambit Capital, IIM-C
                      </p>
                      <p className='communitypara'>
                        "I've gotta give a big shoutout to Read Riches – their reports are like my secret weapon for understanding companies.
                        The way they dive into industry stuff with solid assumptions in DCF and valuation models is on another level.
                        It's like having a cheat code for decoding the business world – super helpful!".
                      </p>
                      {/* <div className='rating'>
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />

                      </div> */}
                    </div>
                  </div>
                </div>

                <div className='cardfour' style={{ display: 'flex', justifyContent: 'space-evenly', transform: `translateX(${currentCard === 4 ? '0%' : '400%'})` }}>

                  <div className='cardinfo'>
                    <div className='bluetriangle'>

                    </div>
                    <div className='communityimg'>
                      <img src={community4} alt='placeholder' />
                    </div>
                    <div className='cardinfocontent'>
                      <p className='communityname'>
                        Garima Gupta
                      </p>
                      <p className='communityplace'>
                        Ambit Capital, IIM-C
                      </p>
                      <p className='communitypara'>

                        "Using Read Riches is a game-changer for me. Their reports break down industry trends and challenges in a way that just makes sense.
                        The clear insights, backed by DCF and valuation models, are like a roadmap for understanding a company's potential.
                        Seriously, they make the complex stuff feel like a breeze!"
                      </p>
                      {/* <div className='rating'>
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />

                      </div> */}
                    </div>
                  </div>
                </div>

                <div className='cardfive' style={{ display: 'flex', justifyContent: 'space-evenly', transform: `translateX(${currentCard === 5 ? '0%' : '500%'})` }}>

                  <div className='cardinfo'>
                    <div className='bluetriangle'>

                    </div>
                    <div className='communityimg'>
                      <img src={community5} alt='placeholder' />
                    </div>
                    <div className='cardinfocontent'>
                      <p className='communityname'>
                        Shubhangi Mishra
                      </p>
                      <p className='communityplace'>
                        Ambit Capital, IIM-C
                      </p>
                      <p className='communitypara'>
                        "Read Riches is my go-to for company insights, no doubt. Their reports are like a friend explaining the business scene – simple, yet spot-on.
                        The industry analysis, combined with clear insights and smart assumptions in DCF and valuation models, is pure gold. They just get it!".
                      </p>
                      {/* <div className='rating'>
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />
                        <img src={communitystar} alt='communitystar' />

                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Previous and Next Arrows */}
                <button className='after' onClick={handleNextClick}>
                  <img src={communityarrow} style={{ rotate: "180deg" }} alt="error" />
                </button>
              </div>
              {/* small bar indicating the above timeinterval for handleclick */}
              {/* <div className='progress-bar'>
              <div className='progress' style={{ width: `${(progress / timeinterval) * 100}%`, backgroundColor:"white",height:"10px" }}></div>
            </div> */}
            </section>

            <section id='sectionc'>
              {/* <h2 style={{ fontSize: "2rem", marginBottom: "3rem" }}>About Founders</h2> */}
              {/* <button className='leftarrow' onClick={() => {
                document.querySelector('.founder1').style.transform = "translateX(0%)";
                document.querySelector('.founder2').style.transform = "translateX(150%)";
              }}><img src={founderarrow} alt="" /></button> */}
              <div className='founders'>
                <div className='founder1' style={{ marginBottom: "1rem", display: "flex", rowGap: "1rem", columnGap: "4rem", position: "absolute" }}>
                  <div style={{ position: "relative", left: "5rem", top: "6.5rem" }}>
                    <span className='linevision'></span>
                    <span className='circle'></span>
                  </div>
                  <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex', position: "relative", top: "6rem" }}>

                    <div style={{ textAlign: 'justify', color: 'white', fontSize: 36, fontFamily: 'Roboto Serif', fontWeight: '400', wordWrap: 'break-word' }}>
                      Meet the Architects of Insight </div>
                    <div style={{ width: 405, textAlign: 'justify', color: '#FAFAFA', fontSize: 14, fontFamily: 'Roboto Serif', fontWeight: '400', wordWrap: 'break-word', lineHeight: "20px" }}>Behind Read Riches lies a team of visionaries dedicated to transforming how financial wisdom is perceived and pursued. Spearheaded by industry pioneers with a knack for simplifying the complex and a flair for innovative communication, our team is the backbone of a platform where finance meets creativity. Together, we're on a mission to illuminate the financial landscape, making it accessible and engaging for everyone.

                      Our approach is unique — we blend deep financial insights with storytelling and visual creativity, making each exploration into the world of finance as enlightening as it is enjoyable. This synergy between financial acumen and creative delivery sets us apart, fostering a learning environment where curiosity meets clarity
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
                    <img className='founderpray' src={founder1} alt='Pranay Agarwal' />
                    <div className='foundercontent' id='foundercontent1'>
                      {/* <strong style={{ fontSize: "1.5rem" }}>Rudransh Singhal</strong> */}
                      <div style={{ gap: "4px" }}>
                        <p className='foundername'>
                          Co-Founder - Pranay Agarwal
                        </p>
                        <p className='founderplace' style={{ width: "140px", height: "22px", marginTop: "5px" }}>
                          Ambit Capital, IIM-C
                        </p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", width: "303px", gap: "1rem" }}>
                        <p className='founderpara'>
                          "Pranay wears a double hat at Read Riches! He's not just an explorer in finance but also our maestro in marketing and sales. Picture him as the guy who not only dives deep into the money world but also makes sure everyone knows how cool Read Riches is. He's not just steering the ship in finance but also leading the charge to make Read Riches known far and wide. A true captain in both the finance and marketing seas! "
                        </p>
                        <div style={{ display: "flex", gap: "25px", width: "171px", height: "25px" }}>
                          <a href="https://www.facebook.com/readriches?mibextid=rS40aB7S9Ucbxw6v" target='_blank'><img src={foundertwitter} width={"20px"} height={"20px"} alt='foundertwitter' /></a>
                          <a href="https://www.facebook.com/readriches?mibextid=rS40aB7S9Ucbxw6v" target='_blank'><img src={founderfacebook} width={"20px"} height={"20px"} alt='founderfacebook' /></a>
                          <a href="https://www.facebook.com/readriches?mibextid=rS40aB7S9Ucbxw6v" target='_blank'><img src={founderlinkedin} width={"20px"} height={"20px"} alt='founderlinkedin' /></a>
                          <a href="https://www.facebook.com/readriches?mibextid=rS40aB7S9Ucbxw6v" target='_blank'><img src={founderinstagram} width={"20px"} height={"20px"} alt='founderinstagram' /></a>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
                    <img className='founderrud' src={founder2} alt='Rudransh Singhal' />
                    <div className='foundercontent' id='foundercontent2'>
                      {/* <strong style={{ fontSize: "1.5rem" }}>Rudransh Singhal</strong> */}
                      <div style={{ gap: "4px" }}>
                        <p className='foundername'>
                          Co-Founder - Rudransh Singhal
                        </p>
                        <p className='founderplace' style={{ width: "140px", height: "22px", marginTop: "5px" }}>
                          Ambit Capital, IIM-C
                        </p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", width: "303px", gap: "1rem" }}>
                        <p className='founderpara'>
                          "Rudransh is like a financial superhero. A constant learner and our big brain, he's always diving into the coolest money stuff. He's really good at understanding stocks, companies, and all the money stuff. He is the wizard behind unraveling the complexities of the financial world. His expertise not only makes understanding companies a breeze but also adds that extra touch of magic to our mission of making it super easy and fun!"
                        </p>
                        <div style={{ display: "flex", gap: "25px", width: "171px", height: "25px" }}>
                          <a href="https://www.facebook.com/readriches?mibextid=rS40aB7S9Ucbxw6v" target='_blank'><img src={foundertwitter} width={"20px"} height={"20px"} alt='foundertwitter' /></a>
                          <a href="https://www.facebook.com/readriches?mibextid=rS40aB7S9Ucbxw6v" target='_blank'><img src={founderfacebook} width={"20px"} height={"20px"} alt='founderfacebook' /></a>
                          <a href="https://www.facebook.com/readriches?mibextid=rS40aB7S9Ucbxw6v" target='_blank'><img src={founderlinkedin} width={"20px"} height={"20px"} alt='founderlinkedin' /></a>
                          <a href="https://www.facebook.com/readriches?mibextid=rS40aB7S9Ucbxw6v" target='_blank'><img src={founderinstagram} width={"20px"} height={"20px"} alt='founderinstagram' /></a>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
                {/* ------------------------------------------ */}
                {/* <div className='founder2' style={{ marginBottom: "1rem", display: "flex", rowGap: "1rem", columnGap: "4rem", transform: "translateX(150%)" }}>
                  <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
                    <img className='founderrud' src={founder1} alt='Pranay Agarwal' />
                    <strong style={{ fontSize: "1.5rem" }}>Pranay Agarwal</strong>
                  </div>
                  <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex' }}>
                    <div style={{ textAlign: 'justify', color: 'white', fontSize: 36, fontFamily: 'Roboto Serif', fontWeight: '400', wordWrap: 'break-word' }}>Meet out founders</div>
                    <div style={{ width: 405, textAlign: 'justify', color: '#FAFAFA', fontSize: 14, fontFamily: 'Roboto Serif', fontWeight: '400', wordWrap: 'break-word', lineHeight: "20px" }}>
                      Pranay wears a double hat at Read Riches! He's not just an explorer in finance but also our maestro in marketing and sales. Picture him as the guy who not only dives deep into the money world but also makes sure everyone knows how cool Read Riches is. He's not just steering the ship in finance but also leading the charge to make Read Riches known far and wide. A true captain in both the finance and marketing seas!
                    </div>
                  </div>
                </div> */}

                {/* <div style={{ display: "flex", rowGap: "1rem" }}>
                  <div style={{display:"flex",flexDirection:"column"}}>
                    <img src={founder1} style={{ width: "200px", borderRadius: "10%", filter: "drop-shadow(2px 4px 6px black)" }} alt='Pranay Agarwal' />
                    <strong style={{ fontSize: "1.5rem" }}>Co-Founder - Pranay Agarwal</strong>
                  </div>
                  <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                    Pranay wears a double hat at Read Riches! He's not just an explorer in finance but also our maestro in marketing and sales. Picture him as the guy who not only dives deep into the money world but also makes sure everyone knows how cool Read Riches is. He's not just steering the ship in finance but also leading the charge to make Read Riches known far and wide. A true captain in both the finance and marketing seas!
                  </p>
                </div> */}
              </div>
              {/* <button className='rightarrow' onClick={() => {
                document.querySelector('.founder1').style.transform = "translateX(-150%)";
                document.querySelector('.founder2').style.transform = "translateX(0%)";
              }}><img src={founderarrow} alt="" /></button> */}
            </section>
          </div>


        </div>
      </main>
    </>
  );
};

export default About;
