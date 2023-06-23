// Reverse Slider -> design changes of  slider.js
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 2014,
    label: "2014",
  },
  {
    value: 2015,
    label: "2015",
  },
  {
    value: 2016,
    label: "2016",
  },
  {
    value: 2017,
    label: "2017",
  },
  {
    value: 2018,
    label: "2018",
  },
  {
    value: 2019,
    label: "2019",
  },
  {
    value: 2020,
    label: "2020",
  },
  {
    value: 2021,
    label: "2021",
  },
  {
    value: 2022,
    label: "2022",
  },
];

export default function DiscreteSlider({ onChange, valueStart }) {
  const handleChange = ( value) => {
    onChange(value);
  };

  return (
    <Box sx={{ width: "65%" }}>
      <Slider
        aria-label="Temperature"
        defaultValue={2022}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={valueStart}
        max={2022}
        onChange={handleChange}
      />
    </Box>
  );
}
