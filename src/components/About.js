import React, { useEffect, useRef, useState } from 'react';
import '../components/css/About.css'
import logo from '../components/img/logo.svg'
import logo2 from '../components/img/logo2.svg'
import logo3 from '../components/img/logo3.svg'
import wave from '../components/img/wave.svg'
import founder1 from '../components/img/Pranay.webp'
import founder2 from '../components/img/rudransh.webp'
// import { useInView } from 'react-intersection-observer';
const About = () => {
  // const [scrollY, setScrollY] = useState(0);
  // community

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
  const [rotation, setRotation] = useState(0);

  // const sectionARef = useRef(null);
  const sectionBRef = useRef(null);
  const sectionCRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionBOffset = sectionBRef.current.offsetTop + 380;
      const sectionCOffset = sectionCRef.current.offsetTop + 380;

      if (scrollPosition >= sectionBOffset && scrollPosition < sectionCOffset) {
        setRotation(120);
      } else if (scrollPosition >= sectionCOffset) {
        setRotation(135);
      } else {
        setRotation(0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionBRef, sectionCRef]);



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
        <h1 style={{ fontSize: "3.5rem", margintop: "10rem", textAlign: "center" }}>About Us</h1>
              <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>What is Read Riches?</h2>
              <p style={{ fontSize: "1.5rem", lineHeight: "1.6" }}>
                Read Riches is changing how everyone understands big businesses. We are making it super easy for everyone to see and understand what a company is all about. We're like wizards turning complicated stuff into fun pictures and stories so that everyone can get it, like turning a puzzle into a cool picture. We're like the leaders in making corporate jargon easy-peasy.
              </p>
              <p style={{ fontSize: "1.5rem", lineHeight: "1.6", marginTop: "1rem" }}>
                Our goal is crystal clear – we want to be the front-runners in making business analysis simple and fun. We're using our creative vibes to give you the full picture so you not only get what's going on with a company but actually enjoy it. It's like magic, turning all the boring numbers into something rad!
              </p>
            </section>
            {/* <img src={wave} alt='wave' style={{ width: "100%", height: "auto" }} /> */}

            <section id='sectionb' style={{display: "flex" }}>
              <div className='bruh' style={{ position: "relative", display: "flex" }}>
                {/* <div className='bruh1'>
                <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Our Vision</h2>

                <div style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                  We're Read Riches, and our vision is like painting a rad future where checking out company stuff isn't a snooze-fest but a crazy journey. Our main deal? Keep it simple, get wildly creative, and make it feel super exclusive.
                  Picture a masterpiece where every piece of info tells a dope story—that's us weaving insight into every nook. Our vision? To be the architects of an era where digging into a company isn't a chore but a mind-blowing revelation. And guess what? We're bringing that vision to life with our platform.
                </div> */}

                <div className='bruh1'>
                  <h2 style={{ fontSize: "2rem" }}>Our Vision</h2>
                  <div style={{
                    fontSize: "1.4rem",
                    lineHeight: "1.6", marginBlock: "5rem",
                    height: "80vh"
                  }}>
                    We're Read Riches, and our vision is like painting a rad future where checking out company stuff isn't a snooze-fest but a crazy journey. Our main deal? Keep it simple, get wildly creative, and make it feel super exclusive.
                    Picture a masterpiece where every piece of info tells a dope story—that's us weaving insight into every nook. Our vision? To be the architects of an era where digging into a company isn't a chore but a mind-blowing revelation. And guess what? We're bringing that vision to life with our platform.

                  </div>

                  <div style={{
                    marginBottom: "1rem",
                    height: "75vh"

                  }}>
                    <h3 style={{ fontSize: "1.5rem", }}>Simplicity</h3>
                    <p style={{ fontSize: "1.6rem", lineHeight: "1.6", marginTop: "1rem" }}>
                      We're all about keeping things easy to grasp, no brain acrobatics needed.
                    </p>
                  </div>

                  <div style={{
                    marginBottom: "1rem",
                    height: "75vh"

                  }}>
                    <h3 style={{ fontSize: "1.5rem", }}>Creativity</h3>
                    <p ref={sectionBRef} style={{ fontSize: "1.6rem", lineHeight: "1.6", marginTop: "1rem", }}>
                      Imagine us as the cool artists turning boring business info into a masterpiece you can vibe with.
                    </p>
                  </div>

                  <div style={{
                    marginBottom: "1rem",
                    height: "50vh"

                  }}>
                    <h3 style={{ fontSize: "1.5rem", }}>Exclusivity</h3>
                    <p ref={sectionCRef} style={{ fontSize: "1.6rem", lineHeight: "1.6", marginTop: "1rem", }}>
                      Yeah, we're like the VIP club of corporate knowledge, making sure you get that exclusive access to the coolest insights. 🚀💡
                    </p>
                  </div>

                </div>
                {/* {console.log(rotation)} */}
                <div className={`abouticons rotate-${rotation}`
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
                </div>
              </div>
            </section>

            <section id="community">
              <h2 style={{ fontFamily: "Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif", fontSize: "2rem", textAlign: "center" }}>What our community is saying</h2>
              <div className='communitycards' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button className='prev' onClick={handlePrevClick}>&lt;</button>

                <div className='cardone' style={{ display: 'flex', justifyContent: 'space-evenly', transform: `translateX(${currentCard === 1 ? '0%' : '100%'})` }}>

                  <div className='communityimg'>
                    <img src='https://placehold.jp/150x150.png' style={{ width: '350px' }} alt='placeholder' />
                  </div>
                  <p>
                    <p className='communitypara'>
                      "The work on the reports showcases meticulous research. In-depth industry analysis explores trends, and challenges, backed by solid assumptions in DCF and valuation models. Peer benchmarking adds depth, while clear communication and insights
                      offer a valuable resource for understanding the company's potential and industry trends."
                    </p>
                    <p className='communityname'>
                      Ashish Gandhi,
                    </p>
                    <p className='communityplace'>
                      Ambit Capital, IIM-C
                    </p>
                  </p>
                </div>

                <div className='cardtwo' style={{ display: 'flex', justifyContent: 'space-evenly', transform: `translateX(${currentCard === 2 ? '0%' : '200%'})` }}>

                  <div className='communityimg'>
                    <img src='https://placehold.jp/150x150.png' style={{ width: '350px' }} alt='placeholder' />
                  </div>
                  <p>
                    <p className='communitypara'>
                      "Personally, I rely on their insightful research reports for my investment strategy.
                      They delve deep into market trends and fundamental analysis to give unbiased insights.
                      Indeed, a trustworthy resource for both novice and seasoned investors."
                    </p>
                    <p className='communityname'>
                      Karan Galhotra,
                    </p>
                    <p className='communityplace'>
                      iVentures Capital
                    </p>

                  </p>
                </div>

                <div className='cardthree' style={{ display: 'flex', justifyContent: 'space-evenly', transform: `translateX(${currentCard === 3 ? '0%' : '300%'})` }}>

                  <div className='communityimg'>
                    <img src='https://placehold.jp/150x150.png' style={{ width: '350px' }} alt='placeholder' />
                  </div>
                  <p>
                    <p className='communitypara'>
                      "I've gotta give a big shoutout to Read Riches – their reports are like my secret weapon for understanding companies.
                      The way they dive into industry stuff with solid assumptions in DCF and valuation models is on another level.
                      It's like having a cheat code for decoding the business world – super helpful!".
                    </p>
                    <p className='communityname'>
                      Sanket Ahuja
                    </p>
                    <p className='communityplace'>

                    </p>
                  </p>
                </div>

                <div className='cardfour' style={{ display: 'flex', justifyContent: 'space-evenly', transform: `translateX(${currentCard === 4 ? '0%' : '400%'})` }}>

                  <div className='communityimg'>
                    <img src='https://placehold.jp/150x150.png' style={{ width: '350px' }} alt='placeholder' />
                  </div>
                  <p>
                    <p className='communitypara'>

                      "Using Read Riches is a game-changer for me. Their reports break down industry trends and challenges in a way that just makes sense.
                      The clear insights, backed by DCF and valuation models, are like a roadmap for understanding a company's potential.
                      Seriously, they make the complex stuff feel like a breeze!"
                    </p>
                    <p className='communityname'>
                      Garima Gupta
                    </p>
                    <p className='communityplace'>

                    </p>
                  </p>
                </div>

                <div className='cardfive' style={{ display: 'flex', justifyContent: 'space-evenly', transform: `translateX(${currentCard === 5 ? '0%' : '500%'})` }}>

                  <div className='communityimg'>
                    <img src='https://placehold.jp/150x150.png' style={{ width: '350px' }} alt='placeholder' />
                  </div>
                  <p>
                    <p className='communitypara'>
                      "Read Riches is my go-to for company insights, no doubt. Their reports are like a friend explaining the business scene – simple, yet spot-on.
                      The industry analysis, combined with clear insights and smart assumptions in DCF and valuation models, is pure gold. They just get it!".
                    </p>
                    <p className='communityname'>
                      Shubhangi Mishra
                    </p>
                    <p className='communityplace'>
                    </p>
                  </p>
                </div>

                {/* Previous and Next Arrows */}
                <button className='after' onClick={handleNextClick}>&gt;</button>
              </div>
              {/* small bar indicating the above timeinterval for handleclick */}
              {/* <div className='progress-bar'>
              <div className='progress' style={{ width: `${(progress / timeinterval) * 100}%`, backgroundColor:"white",height:"10px" }}></div>
            </div> */}
            </section>

            <section id='sectionc'>
              <h2 style={{ fontSize: "2rem", marginBottom: "3rem" }}>About Founders</h2>
              <div style={{ display: "flex", columnGap: "1rem" }}>

                <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", rowGap: "1rem" }}>
                  <img src={founder2} style={{ width: "200px", borderRadius: "10%", filter: "drop-shadow(2px 4px 6px black)" }} alt='Rudransh Singhal' />
                  <strong style={{ fontSize: "1.5rem" }}>Founder - Rudransh Singhal</strong>
                  <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                    Rudransh is like a financial superhero. A constant learner and our big brain, he's always diving into the coolest money stuff. He's really good at understanding stocks, companies, and all the money stuff. He is the wizard behind unraveling the complexities of the financial world. His expertise not only makes understanding companies a breeze but also adds that extra touch of magic to our mission of making it super easy and fun!
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
                  <img src={founder1} style={{ width: "200px", borderRadius: "10%", filter: "drop-shadow(2px 4px 6px black)" }} alt='Pranay Agarwal' />
                  <strong style={{ fontSize: "1.5rem" }}>Co-Founder - Pranay Agarwal</strong>
                  <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                    Pranay wears a double hat at Read Riches! He's not just an explorer in finance but also our maestro in marketing and sales. Picture him as the guy who not only dives deep into the money world but also makes sure everyone knows how cool Read Riches is. He's not just steering the ship in finance but also leading the charge to make Read Riches known far and wide. A true captain in both the finance and marketing seas!
                  </p>
                </div>
              </div>
            </section>
          </div>


        </div>
      </main>
    </>
  );
};

export default About;
