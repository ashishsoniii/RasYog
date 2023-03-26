import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import "./App.css";
import Footer from "./pages/footer/Footer";
import Home from "./pages/content/Home";
import DataAnalysis from "./pages/content/DataAnalysis.js";

const App = () => {
  const [topic, setTopic] = useState("data");
  const [activeTopic, setActiveTopic] = useState("Data Analysis");

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
  };
  const handleActiveTopicChange = (newTopic) => {
    setActiveTopic(newTopic);
  };
  return (
    <>
      <div className="bg">
        <Navbar
          onTopicChange={handleTopicChange}
          onAcitiveTopicChange={handleActiveTopicChange}
        />
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/dataAnalysis"
          element={<DataAnalysis topic={topic} activeTopic={activeTopic} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
