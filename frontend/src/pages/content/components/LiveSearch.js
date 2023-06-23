import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

//Component to select Selection of graph (sets up Selected option ID / Name)

function LiveSearch(props) {
  const [plotName, setPlotName] = useState([]);
  // eslint-disable-next-line
  const [displayOption, setDisplayOption] = useState(false);

  // show | hide option 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select your option");   
  // eslint-disable-next-line
  const [selectedOptionId, setSelectedOptionId] = useState(0);  // 

  // used to handle outside click!
  const selectMenuRef = useRef(null);

  const handleOptionClick = (item) => {
    setSelectedOption(item.plot);
    setSelectedOptionId(item.id);
    props.setDisplayStart(item.SingleYear);
    props.setDisplayEnd(item.YearChange);

    props.handleOptionClick(item);
    setIsOpen(false);
  };

  // resets options to default
  useEffect(() => {
    setSelectedOptionId(0);
    setSelectedOption("Select your option");
  }, [props.topic]); // reset the state variables when props.topic changes

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://yoglabs.pythonanywhere.com/store?id=${props.topic}`,     
          { cancelToken: source.token }
        );
        // localhost 

        // const response = await axios.get(
        //   `http://127.0.0.1:5000/store?id=${props.topic}`,
        // );
        const { plot_name, display_option } = response.data;
        setPlotName(plot_name);
        setDisplayOption(display_option);
      } catch (error) {
      }
    };
    fetchData();

    return () => {
      // Cancel the request when component unmounts or when topic prop changes
      source.cancel("LiveSearch component unmounted or topic prop changed");
    };
  }, [props.topic]);

  useEffect(() => {
    // Logic fir click outside to close menu!
    const handleClickOutside = (event) => {
      if (
        selectMenuRef.current &&
        !selectMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [selectMenuRef]);

  return (
    <div>
      <div className="select-container">
        <div
          className={`select-menu ${isOpen ? "active" : ""}`}    // open check active means -> yes show it!
          ref={selectMenuRef}
        >
          <button className="select-btn" onClick={() => setIsOpen(!isOpen)}>
            <span className="sBtn-text">{selectedOption}</span>
            <i className="bx bx-chevron-down"></i>
          </button>
          <ul className="options">
          {/* show plot option available from backend!!! */}
            {plotName.map((item) => (
              <li
                className="option"
                key={item.id}
                onClick={() => {
                  handleOptionClick(item);
                }}
              >
              {/* shows names of tile - plots  */}
                <span className="option-color"></span>
                <span className="option-text">{item.plot}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LiveSearch;
