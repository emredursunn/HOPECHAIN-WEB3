// src/pages/About.js
import React from "react";
import "./About.css"; // CSS dosyasını içe aktarın

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <section>
        <h2>Vision</h2>
        <p>
          Hopechain is a platform which aims to make donate operations easier, safer and rewarding with using blockchain technology.
        </p>
      </section>
      <section>
        <h2>Why blockchain?</h2>
        <p>
          Blockchain provides to save transactions as unchangeable and transparent. So, donater can see the place where his/her coins. has transferred. Also with smart contrracts, transactions can be completed successfully.
        </p>
      </section>
      <section>
        <h2>Cross-Chain Transfers</h2>
        <p>
          Hopechain provides transactions between different blockchain networks. For example, donater can transfer coin from Ethereum to Polygon. This provides faster transactions.
        </p>
      </section>
      <section>
        <h2>Future Plans</h2>
        <p>
          Our future is support global help organizations and provide safer, faster transactions with new technologies. In future, we aims to add more blockchain network support to our system, improve user experience and reach more people.
        </p>
      </section>
    </div>
  );
};

export default About;
