// This componwnt -> section-2 Sales Insight | Popularity & margin | Sales Distribution -  button

import React, { useState } from "react";
import styled from "styled-components";
const Button = styled.button`
  /* Same as above */
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
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
const types = ["Sales Insights", "Popularity & Margin", "Sales Distribution"]; // button names i.e. 3 btn to diplay!

function ToggleGroup(props) {
  const [active, setActive] = useState(types[0]);
  return (
    <ButtonGroup className="column col-home-l ">
      {/* types cpntain 3 btn name so mapping it and creating map! */}
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
