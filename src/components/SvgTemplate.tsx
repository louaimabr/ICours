import React from "react";

const SvgTemplate = ({ children }) => {
  return (
    <>
      {children}
      <img className="clouds" style={{
        position : "absolute",
        top : "20%",
        left : "5%",
        width : "10%"
      }} src={require('../img/cloud.svg')}/>
      <img className="clouds" style={{
        position : "absolute",
        top : "25%",
        right : "5%",
        width : "10%"
      }}src={require('../img/cloud.svg')}/>
    </>
  );
};

export default SvgTemplate;
