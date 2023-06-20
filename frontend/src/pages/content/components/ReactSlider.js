import React, { useState } from "react";
import ReactCardSlider from "react-card-slider-component";
import img1 from "../../../assets/card-img/Barplot.png";
import img2 from "../../../assets/card-img/popularity.png";
import img3 from "../../../assets/card-img/facets.png";
import img4 from "../../../assets/card-img/sunbust.png";
import img5 from "../../../assets/card-img/103_brand_popularity.png";
import img6 from "../../../assets/card-img/106_sunburst.png";
import img7 from "../../../assets/card-img/105_maps_t.png";
import img8 from "../../../assets/card-img/102_payments.png";
import DialogGraph from "./DialogGraph";

import "../Content.css"

const Baz = (props) => {
  const [diagOpen, setDiagOpen] = useState(false);

  const [selectedOptionId, setselectedOptionId] = useState(false);
  const [valueStart, setvalueStart] = useState(0);
  const [valueEnd, setvalueEnd] = useState(0);
  const [topic, settopic] = useState("");
  const [description, setdescription] = useState("Hi");

  // selectedOptionId={2}
  // valueStart={2014}
  // valueEnd={2017}
  // topic={"data"}

  const slides = [
    {
      image: img1,
      title: "Bar Plot",
      description: "Margin, Sales, and Effcost",
      clickEvent: () => {
        settopic("data");
        setselectedOptionId(1);
        setvalueStart(2014);
        setvalueEnd(2022);
        setDiagOpen(true);
        setdescription("Margin, Sales, and Effcost");
      },
    },
    {
      image: img2,
      title: "Popularity And Margin",
      description: "Popularity Vs Margin for Brands",
      clickEvent: () => {
        settopic("margin");
        setselectedOptionId(1);
        setvalueStart(2014);
        setvalueEnd(2022);
        setDiagOpen(true);
        setdescription("Popularity Vs Margin for Brands");
      },
    },
    {
      image: img3,
      title: "Facets",
      description: "Facets: Bar Plot with months and year",
      clickEvent: () => {
        settopic("data");
        setselectedOptionId(2);
        setvalueStart(2014);
        setvalueEnd(2022);
        setDiagOpen(true);
        setdescription("Facets: Bar Plot with months and year");
      },
    },
    {
      image: img4,
      title: "Generalized Analysis",
      description: "Analysis for different brands, yearwise",
      clickEvent: () => {
        settopic("margin");
        setselectedOptionId(1);
        setvalueStart(2014);
        setvalueEnd(2022);
        setDiagOpen(true);
        setdescription("Analysis for different brands, yearwise");
      },
    },
    {
      image: img8,
      title: "Different Payments Methods",
      description: "Popularity & Margin analysis",
      clickEvent: () => {
        settopic("margin");
        setselectedOptionId(3);
        setvalueStart(2014);
        setvalueEnd(2022);
        setDiagOpen(true);
        setdescription("Different Payments Methods");
      },
    },
    {
      image: img5,
      title: "Tree Maps",
      description: "Popularity Analysis for Products upto Brand Level",
      clickEvent: () => {
        settopic("maps");
        setselectedOptionId(1);
        setvalueStart(2014);
        setvalueEnd(2022);
        setDiagOpen(true);
        setdescription("Tree Maps : Popularity Analysis for Products upto Brand Level");
      },
    },
    {
      image: img6,
      title: "Data Taxonomic",
      description: "Sunburst Charts",
      clickEvent: () => {
        settopic("datataxonomic");
        setselectedOptionId(1);
        setvalueStart(2014);
        setvalueEnd(2022);
        setDiagOpen(true);
        setdescription("Sunburst Charts");
      },
    },
    {
      image: img7,
      title: "Maps Taxonomic",
      description: "Brand -> Product -> Design -> Color",
      clickEvent: () => {
        settopic("mapstaxonomic");
        setselectedOptionId(5);
        setvalueStart(2014);
        setvalueEnd(2022);
        setDiagOpen(true);
        setdescription("Maps Taxonomic: Brand -> Product -> Design -> Color");
      },
    },
  ];

  return (
    <>
      <DialogGraph
        diagOpen={diagOpen}
        setDiagOpen={setDiagOpen}
        topic={topic}
        selectedOptionId={selectedOptionId}
        valueStart={valueStart}
        valueEnd={valueEnd}
        setselectedOptionId={setselectedOptionId}
        description={description}
        onClose={() => setDiagOpen(false)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10em",
          marginBottom: "7em",
        }}
      >
        <ReactCardSlider slides={slides} />
      </div>
      {/* {diagOpen && <DialogGraph  />} */}
    </>
  );
};

export default Baz;
