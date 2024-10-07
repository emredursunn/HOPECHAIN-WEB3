import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Contact me:</p>
        <div className="footer-contact">
          <p>
            <a href="mailto:emredursun908@gmail.com">Mail</a>
          </p>
          <p>
            <a
              href="https://www.linkedin.com/in/emredursunn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
          </p>
          <p>
            <a
              href="https://www.github.com/emredursunn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
