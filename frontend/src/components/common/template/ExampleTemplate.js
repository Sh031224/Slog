import React from "react";
import PropTypes from "prop-types";

const ExampleTemplate = ({ children }) => {
  return <>{children}</>;
};

ExampleTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.node
  ]).isRequired
};

export default ExampleTemplate;
