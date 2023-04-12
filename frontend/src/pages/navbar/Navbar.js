import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/logo/logo-no-background.png";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const UserContext = React.createContext();

const Navbar = (props) => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const menuRef = useRef();

  const handleMenuClick = () => {
    setShowMediaIcons(!showMediaIcons);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMediaIcons(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
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
                scale: 1.2,
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
                activeClassName="active"
                onClick={() => {
                  props.onTopicChange("data");
                  props.onAcitiveTopicChange("Data Analysis");
                  handleMenuClick();
                }}
              >
                Data Analysis
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeClassName="active"
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
                activeClassName="active"
                onClick={() => {
                  props.onTopicChange("maps");
                  props.onAcitiveTopicChange("Tree Maps");
                  handleMenuClick();
                }}
              >
                Tree Maps
              </NavLink>
            </li>

            {/* new routes */}
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeClassName="active"
                onClick={() => {
                  props.onTopicChange("mapstaxonomic");
                  props.onAcitiveTopicChange("mapstaxonomic");
                  handleMenuClick();
                }}
              >
                Maps Taxonomic
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeClassName="active"
                onClick={() => {
                  props.onTopicChange("taxonomic");
                  props.onAcitiveTopicChange("taxonomic");
                  handleMenuClick();
                }}
              >
                Taxonomic
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/dataAnalysis"
                activeClassName="active"
                onClick={() => {
                  props.onTopicChange("datataxonomic");
                  props.onAcitiveTopicChange("datataxonomic");
                  handleMenuClick();
                }}
              >
                Data Taxonomic
              </NavLink>
            </li>
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
