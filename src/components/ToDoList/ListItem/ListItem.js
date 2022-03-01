import React, { useState } from "react";
import "./ListItem.css";

const listItem = (props) => {
  const [isChecked, setChecked] = useState(props.status);

  const [todoTxtStyleClasses, todoCheckBoxStyleClasses] = [
    ["todo-text"],
    ["todo-checkbox"],
  ];

  if (isChecked === true) {
    todoTxtStyleClasses.push("done");
    todoCheckBoxStyleClasses.push("done");
  }

  return (
    <li>
      <label className="Label">
        <p className={todoTxtStyleClasses.join(" ")}>{props.todoText}</p>
        <input
          className={todoCheckBoxStyleClasses.join(" ")}
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            setChecked(!isChecked);
            props.checkBoxClicked();
          }}
        />
      </label>
    </li>
  );
};

export default listItem;
