import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import "./App.css";
import Footer from "./pages/footer/Footer";
import Home from "./pages/content/Home";
import DataAnalysis from "./pages/content/DataAnalysis.js"; // page for analysis (Access through Navbar!) // route -> /dataAnalysis
import Team from "./pages/content/components/Team"; // team detial here!
import UploadFile from "./pages/content/UploadFile"; // Component to upload file to backend! --> route -> /upload!

const App = () => {
  const [topic, setTopic] = useState("data"); // Sets(short form) heading on dataAnalysis Page
  const [activeTopic, setActiveTopic] = useState("Data Analysis"); // Sets heading on dataAnalysis

  // updates Headeding | endpoint sfor axios request for graph fetching!
  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
  };
  // sets heading! on dataAnalysis!
  const handleActiveTopicChange = (newTopic) => {
    setActiveTopic(newTopic);
  };

  // Structure
  return (
    <>
      <div className="bg">
        {/* Props sets from navbar (intialy!) */}
        <Navbar
          onTopicChange={handleTopicChange}
          onAcitiveTopicChange={handleActiveTopicChange}
        />
      </div>
      {/* Landing Page Route - Displays all info for project! */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/dataAnalysis"
          element={<DataAnalysis topic={topic} activeTopic={activeTopic} />}
        />

        {/* Team Route! :)*/}
        <Route
          exact
          path="/team"
          element={<Team topic={topic} activeTopic={activeTopic} />}
        />
        {/* Upload File Route! :) */}
        <Route exact path="/upload" element={<UploadFile />} />
      </Routes>

      {/* Page Ending | Footer */}
      <Footer />
    </>
  );
};

export default App;
