import React from "react";

const Footer = () => (
  <footer>
    Created by <span id="rajat">Zaid</span>
    <br />
    <span>
      <i
        className="fab fa-github"
        onClick={() => window.open("https://github.com", "_blank")}
      ></i>{" "}
      <i
        className="fab fa-hackerrank"
        onClick={() => window.open("https://www.hackerrank.com", "_blank")}
      ></i>{" "}
      <i
        className="fab fa-linkedin"
        onClick={() => window.open("https://www.linkedin.com", "_blank")}
      ></i>{" "}
      <i
        className="fab fa-stack-overflow"
        onClick={() => window.open("https://stackoverflow.com", "_blank")}
      ></i>{" "}
      <i
        className="fab fa-twitter"
        onClick={() => window.open("https://twitter.com", "_blank")}
      ></i>
    </span>
  </footer>
);

export default Footer;
