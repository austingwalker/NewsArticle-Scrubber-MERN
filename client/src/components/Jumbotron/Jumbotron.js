import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({ children }) => (
  <div className="mt-2 jumbotron">
    {children}
  </div>
);

export default Jumbotron;
