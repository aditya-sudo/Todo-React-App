import React, { useState } from "react";
import "./BtnFooter.css";

const btnfooter = (props) => {
  return (
    <footer>
      <button
        id="Button"
        onClick={() => {
          props.clicked();
        }}
      >
        +
      </button>
    </footer>
  );
};
export default btnfooter;
