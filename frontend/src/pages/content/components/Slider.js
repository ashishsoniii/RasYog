// Slider is component on DataAnalysis Page! 
// It sets value to set of start year

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import thumbImage from "./sunbust.png";


// 2014 - 2022 years option!
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

export default function DiscreteSlider({ onChange }) {

  const styles = {
    thumb: {
      height: 20,
      width: 20,
      marginTop: -8,
      marginLeft: -11,
      background: `url(${thumbImage})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      cursor: "pointer",
    },
  };
  // update
  const handleChange = ( value) => {
    onChange(value);
  };

  return (
    <Box sx={{ width: "65%" }}>
      <Slider
        sx={styles}

        aria-label="Temperature"
        defaultValue={2014}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={2014}
        max={2022}
        onChange={handleChange}
      />
    </Box>
  );
}
