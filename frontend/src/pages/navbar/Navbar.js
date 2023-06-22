import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/logo/YOGLABS-logo.png";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = (props) => {
  const [showMediaIcons, setShowMediaIcons] = useState(false); // Menu Hamburger menu
  const menuRef = useRef();

  //show menu!
  const handleMenuClick = () => {
    setShowMediaIcons(!showMediaIcons);
  };

  //  handleClickOutside function-> handles clicks that occur outside of a specific element(menu).
  // menuRef.current -> menuRef has a current value (existance in DOM)
  // !menuRef.current.contains(event.target) --> it checks if the clicked element is outside the menu.
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMediaIcons(false);
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the menu
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <NavLink to="/">
            <motion.img
              whileHover={{
                scale: 1.3,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="logo-img"
              src={logo}
              alt=""
            ></motion.img>{" "}
          </NavLink>
        </div>

        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
          ref={menuRef}
        >
          <ul>
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeclassname="active"
                onClick={() => {
                  props.onTopicChange("data");
                  props.onAcitiveTopicChange("Temporal Sales Insights");
                  handleMenuClick();
                }}
              >
                Temporal Sales Insights
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeclassname="active"
                onClick={() => {
                  props.onTopicChange("margin");
                  props.onAcitiveTopicChange("Popularity and Margin Analysis");
                  handleMenuClick();
                }}
              >
                Popularity and Margin Analysis
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeclassname="active"
                onClick={() => {
                  props.onTopicChange("maps");
                  props.onAcitiveTopicChange("Sales Distribution ");
                  handleMenuClick();
                }}
              >
                Sales Distribution
              </NavLink>
            </li>
            {/* future Route! -> Taxoniomic */}
            {/* <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeclassname="active"
                onClick={() => {
                  props.onTopicChange("taxonomic");
                  props.onAcitiveTopicChange("Taxonomic");
                  handleMenuClick();
                }}
              >
                Taxonomic
              </NavLink>
            </li> */}

            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeclassname="active"
                onClick={() => {
                  props.onTopicChange("mapstaxonomic");
                  props.onAcitiveTopicChange("Maps Taxonomic");
                  handleMenuClick();
                }}
              >
                Maps Taxonomic
              </NavLink>
            </li>
            {/* Future Route -> Data Taxonomic! */}
            {/* <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeClassName="active"
                onClick={() => {
                  props.onTopicChange("datataxonomic");
                  props.onAcitiveTopicChange("Data Taxonomic");
                  handleMenuClick();
                }}
              >
                Data Taxonomic
              </NavLink>
            </li> */}
          </ul>
        </div>

        <div className="social-media">
          <div className="hamburger-menu">
            <div onClick={handleMenuClick}>
              <GiHamburgerMenu style={{ color: "black" }} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
