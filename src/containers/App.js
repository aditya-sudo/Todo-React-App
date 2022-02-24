import React, { Component } from "react";
import "./App.css";

/*import Component */
import Header from "../components/Header/Header";
import BtnFooter from "../components/Footer/BtnFooter";
import ToDoList from "../components/ToDoList/ToDoList";
import getData from "../data/todoListData";
class App extends Component {
  constructor(props) {
    super(props);
    //set data in state
    this.state = {
      listTodo: [],
      showBtn: true,
    };
  }

  componentDidMount() {
    console.log("[App.js] componetDidMount");

    const cookieList = getData();
  }

  buttonClickHandler() {
    this.setState({
      showBtn: !this.state.showBtn,
    });
  }

  render() {
    return (
      <div className="App">
        <Header />

        <div className="Listbox">
          <ToDoList passlist={getData()}></ToDoList>
        </div>

        {this.state.showBtn ? (
          <BtnFooter
            clicked={() => {
              this.buttonClickHandler();
            }}
          ></BtnFooter>
        ) : null}
      </div>
    );
  }
}

export default App;
