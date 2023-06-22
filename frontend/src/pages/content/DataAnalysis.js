import React, { useEffect, useState } from "react";
import LiveSearch from "./components/LiveSearch";
import Slider from "./components/Slider";
import SliderReverse from "./components/SliderReverse";
import Graph from "./Graph";

// This page is landing page to display all plots (it takes props(sets from there) from navbar compnent )
// props
// props.topic  --> endpont and its short form
// props.activeTopic  -> gives heading onpage

function DataAnalysis(props) {
  const [selectedOption, setSelectedOption] = useState("Select your option"); // option Text of live search component
  const [selectedOptionId, setSelectedOptionId] = useState(0); // setting up if of selected option!

  const [valueStart, setValueStart] = React.useState(2014); // sets start year in slider (forward slider)
  const [valueEnd, setValueEnd] = React.useState(2022); // sets send year of slider (reverse Slider)
  // const [selectedCommonYear, setSelectedCommonYear] = useState(valueStart);

  const [displayStart, setDisplayStart] = useState(true); // SHOWS 1st slider only
  const [displayEnd, setDisplayEnd] = useState(false); // Shows 2nd slider tooo

  // slider value updation (start|fordward)
  const handleSliderChange = (newValueStart) => {
    setValueStart(newValueStart);
  };
  // slider value updation (Reverse | end year)
  const handleSliderEndChange = (newValueEnd) => {
    setValueEnd(newValueEnd);
  };

  //sets plot option seclected from liveSearch Component!
  const handleOptionClick = (item) => {
    setSelectedOption(item.plot);
    setSelectedOptionId(item.id);
  };
  // As topic change it resets all value (sets it to default setting)
  useEffect(() => {
    setSelectedOptionId(0);
    setDisplayStart(true);
    setDisplayEnd(false);
    setValueStart(2014);

    setValueEnd(2022);
  }, [props.topic]);

  return (
    <>
      <div className="on-home-bg">
        {/* Heading */}
        <div className="main-home-text">{props.activeTopic}</div>
        <div className="main-home-sub-text">
          {/* Setting its corresponding text to activeTopic via topic!  */}
          {/* there are 6 routes in total! */}
          {props.topic === "data" ? (
            <>
              <>
                Welcome to our Temporal Sales Analysis section! Here, we provide
                valuable insights into the performance of our products based on
                their sales, margin and cost to company data over different
                months and years.
              </>
              <br />
              <br />
              <>
                Explore various Barplots for Comprehensive Sales Analysis and
                Facet Section for Monthly Insights by Year - Customize Year
                Range for In-Depth Temporal Sales Analysis!
              </>
            </>
          ) : props.topic === "margin" ? (
            "Want to know what's hot and what's not? Our Popularity and Margin Analysis section offers a comprehensive look at the margins and profitability of our products. By exploring our categories for brands, products, and more, you'll be able to see which items are driving profits and which may need to be adjusted to improve your bottom line."
          ) : props.topic === "maps" ? (
            "Enter the captivating world of interactive Tree Maps! Analyze your data effortlessly with our taxonomic and margin analysis visualization tools. Discover hidden insights and patterns in a user-friendly interface. Explore your data like never before and unlock its full potential with us!"
          ) : props.topic === "mapstaxonomic" ? (
            "Welcome to our taxonomic maps, the aerial view of our product universe. Zoom in and explore the hidden connections between our categories, and discover new products along the way."
          ) : props.topic === "taxonomic" ? (
            "Welcome to our taxonomic section, where you'll discover an organized and easy-to-navigate world of products, neatly categorized by brand, design, size, and color. Whether you're looking for something specific or simply browsing, our intuitive hierarchy will help you find what you need with ease. Explore our vast collection and experience the convenience of shopping with us."
          ) : (
            "Welcome to our taxonomic data, the secret sauce of our store. With our detailed categorization system, you'll be able to navigate our collection with ease and discover new products that match your preferences. Whether you're a seasoned shopper or a first-time visitor, our taxonomic data makes your shopping experience hassle-free and enjoyable."
          )}{" "}
        </div>

        {/*  A component to select which graph to be displayed! */}
        {/* This sets up optionID! */}
        <LiveSearch
          topic={props.topic}
          handleOptionClick={handleOptionClick}
          setDisplayStart={setDisplayStart}
          setDisplayEnd={setDisplayEnd}
        />

        {/*  Fordward Sloder Logic HErE! */}
        {!(displayStart === false && displayEnd === false) && (
          <div>
            {!displayStart && (
              <>
                <div className="slider-label">Start Year: {valueStart}</div>
                <div className="slider-select">
                  <br />
                  <Slider onChange={handleSliderChange} />
                  {/* <div>Selected valueStart: {valueStart}</div> */}
                </div>
              </>
            )}

            {/* Reverse Slider Here! */}
            {displayEnd && (
              <>
                {!displayStart && (
                  <div className="slider-label">End Year: {valueEnd}</div>
                )}
                {displayStart && (
                  <div className="slider-label">Selected Year: {valueEnd}</div>
                )}
                <div className="slider-select">
                  <br />
                  <SliderReverse
                    onChange={handleSliderEndChange}
                    valueStart={valueStart}
                  />
                  {/* <p>Selected valueStart: {valueEnd}</p> */}
                </div>
                <br />

                {/* Display value of SLider!!!!! */}
                {!displayStart && displayEnd && (
                  <div className="main-home-sub-text year-text">
                    {valueStart} - {valueEnd}
                  </div>
                )}
                {/* {displayStart && (
                  <div className="main-home-sub-text year-text">{valueEnd}</div>
                )} */}
              </>
            )}
          </div>
        )}
        {/* MAIN COMPONENT ->  this component shows graph!!!! */}
        {/* MAIN COMPONENT ->  this component shows graph!!!! */}
        {/* Reminder -> Topic sets endpoint of routes! */}
        <Graph
          selectedOption={selectedOption}
          selectedOptionId={selectedOptionId}
          topic={props.topic}
          valueStart={valueStart}
          valueEnd={valueEnd}
        />
      </div>
    </>
  );
}

export default DataAnalysis;
