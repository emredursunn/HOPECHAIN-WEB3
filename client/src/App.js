import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home/Home";
import About from "./screens/About/About";
import TransactionHistory from "./screens/TransactionHistory/TransactionHistory";
import Balance from "./screens/Balance/Balance";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/transactionHistory"
              element={<TransactionHistory />}
            />
            <Route path="/balance" element={<Balance />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
