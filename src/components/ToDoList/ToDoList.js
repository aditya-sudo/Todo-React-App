import React from "react";
//import components
import ListItem from "./ListItem/ListItem";

const toDoList = (props) => {
  const listItems = props.passlist.map((item, index) => {
    return (
      <ListItem
        key={index}
        todoText={item.text}
        status={item.status}
        checkBoxClicked={() => {
          props.checkboxChangeHappen(item, index);
        }}
      />
    );
  });

  return <ul style={{ overflowX: "hidden" }}>{listItems}</ul>;
};

export default toDoList;
