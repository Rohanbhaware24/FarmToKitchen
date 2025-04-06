// src/page/About.js
import React from "react";
import "./About.css"; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Welcome to Direct Farmer to Customer Food Supply</h1>
        <p>Your connection to fresh, local produce straight from the farm.</p>
      </header>
      
      <section className="about-content">
        <h2>Why Choose Direct Food Supply?</h2>
        <p>
          Our platform connects local farmers directly to consumers, eliminating the middleman. This allows you to access fresh, organic produce at lower prices while supporting local agriculture.
        </p>

        <div className="about-benefits">
          <div className="benefit">
            <h3>Fresh Produce</h3>
            <p>Enjoy the freshest fruits, vegetables, and other farm products delivered right to your door.</p>
          </div>
          <div className="benefit">
            <h3>Support Local Farmers</h3>
            <p>Your purchase helps support small-scale local farms and ensures fair wages for farmers.</p>
          </div>
          <div className="benefit">
            <h3>Environmentally Friendly</h3>
            <p>By reducing the transportation distance, we help minimize the carbon footprint of your food.</p>
          </div>
        </div>

        <section className="about-process">
          <h2>How It Works</h2>
          <ul>
            <li>1. Sign up and browse available products from local farmers.</li>
            <li>2. Place your order online and select your preferred delivery options.</li>
            <li>3. Receive your fresh produce directly from the farm.</li>
          </ul>
        </section>
      </section>
      
      <footer className="about-footer">
        <p>Contact us for more information or if you have any questions.</p>
      </footer>
    </div>
  );
};

export default About;
