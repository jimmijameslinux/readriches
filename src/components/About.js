import React from 'react';

const About = () => {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "100vw",
      padding: "2rem",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      margin: "2rem",
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#333", textAlign: "center" }}>About Us</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>What is Read Riches</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}>
          Read Riches is changing how everyone understands big businesses. We are making it super easy for everyone to see and understand what a company is all about. We're like wizards turning complicated stuff into fun pictures and stories so that everyone can get it, like turning a puzzle into a cool picture. We're like the leaders in making corporate jargon easy-peasy.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "1rem", color: "#555" }}>
          Our goal is crystal clear – we want to be the front-runners in making business analysis simple and fun. We're using our creative vibes to give you the full picture so you not only get what's going on with a company but actually enjoy it. It's like magic, turning all the boring numbers into something rad!
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>Our Vision</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}>
          We're Read Riches, and our vision is like painting a rad future where checking out company stuff isn't a snooze-fest but a crazy journey. Our main deal? Keep it simple, get wildly creative, and make it feel super exclusive.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "1rem", color: "#555" }}>
          Picture a masterpiece where every piece of info tells a dope story—that's us weaving insight into every nook. Our vision? To be the architects of an era where digging into a company isn't a chore but a mind-blowing revelation. And guess what? We're bringing that vision to life with our platform.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "1rem", color: "#555" }}>
          Now, let's break it down into three pillars that make us stand tall. First up, simplicity – we're all about keeping things easy to grasp, no brain acrobatics needed. Next, it's all about creativity – imagine us as the cool artists turning boring business info into a masterpiece you can vibe with. Lastly, the big one – exclusivity. Yeah, we're like the VIP club of corporate knowledge, making sure you get that exclusive access to the coolest insights. 🚀💡
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>About Founders</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "1rem" }}>
            <strong style={{ fontSize: "1.5rem", color: "#333" }}>Founder - Rudransh Singhal</strong>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}>
              Rudransh is like a financial superhero. A constant learner and our big brain, he's always diving into the coolest money stuff. He's really good at understanding stocks, companies, and all the money stuff. He is the wizard behind unraveling the complexities of the financial world. His expertise not only makes understanding companies a breeze but also adds that extra touch of magic to our mission of making it super easy and fun!
            </p>
          </div>

          <div>
            <strong style={{ fontSize: "1.5rem", color: "#333" }}>Co-Founder - Pranay Agarwal</strong>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}>
              Pranay wears a double hat at Read Riches! He's not just an explorer in finance but also our maestro in marketing and sales. Picture him as the guy who not only dives deep into the money world but also makes sure everyone knows how cool Read Riches is. He's not just steering the ship in finance but also leading the charge to make Read Riches known far and wide. A true captain in both the finance and marketing seas!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
