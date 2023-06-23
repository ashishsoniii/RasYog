// This componwnt -> section-3 Maps Taxonomic | Data Taxonomic! button

import React, { useState } from "react";
import styled from "styled-components";
const Button = styled.button`
  /* Same as above */
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 30px; /* reduce horizontal padding for mobile */
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }

  /* media query for mobile */
  @media (max-width:600px) {
    padding: 10px 20px; /* further reduce horizontal padding for smaller screens */
    white-space: nowrap; /* prevent text from wrapping to next line */
  }
`;
const ButtonToggle = styled(Button)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: block;
  justify-content: centre;
`;
const types = ["Maps Taxonomic", "Data Taxonomic"];

function ToggleGroup(props) {
  const [active, setActive] = useState(types[0]);
  return (
    <ButtonGroup className="column col-home-r ">
      {types.map((type) => (
        <ButtonToggle
          className="row col-inside"
          key={type}
          active={active === type}
          onClick={() => {
            setActive(type);
            props.setActiveState(type);
          }}
        >
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
  );
}

export default ToggleGroup;
