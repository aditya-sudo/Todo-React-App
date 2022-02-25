import React, { Component } from "react";
import "./App.css";

import Header from "../components/Header/Header";
import BtnFooter from "../components/Footer/BtnFooter";
import ToDoList from "../components/ToDoList/ToDoList";

const list1 = [];

function setCookie(cookieName, cookieValue, exdays) {
  const cdate = new Date();
  cdate.setUTCHours(0, 0, 0, 0);

  cdate.setTime(cdate.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + cdate.toUTCString();
  localStorage.setItem("extTime", cdate.getTime());

  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookieValue(cookieName) {
  const name = cookieName + "=";
  const decodedCookies = decodeURIComponent(document.cookie);

  const cookiesArr = decodedCookies.split(";");

  for (let i = 0; i < cookiesArr.length; i++) {
    let currentC = cookiesArr[i];

    if (currentC.charAt(0) == " ") {
      currentC = currentC.substring(1);
    }

    if (currentC.indexOf(cookieName) == "0") {
      return currentC.substring(name.length, currentC.length);
    }
  }
  //otherwise return empty string
  return "";
}

function removeCookie(cookieName) {
  const cdate = new Date();
  cdate.setTime(+localStorage.getItem("extTime"));

  document.cookie =
    cookieName + "=;" + "expires=" + cdate.toUTCString() + ";path=/";
}

function updateCookie(cookieName, cookieValue) {
  const cdate = new Date();
  cdate.setTime(+localStorage.getItem("extTime"));

  document.cookie =
    cookieName +
    "=" +
    cookieValue +
    ";" +
    "expires=" +
    cdate.toUTCString() +
    ";path=/";
}

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

    //at first check for cookie list is available or not
    //if not then set cookie with emptylist
    const cookieList = getCookieValue("todo-list");
    if (cookieList === "") {
      setCookie("todo-list", JSON.stringify(list1), 1);
    }

    //if cookie not there or expire then remove the cookie and
    //set new cookie with empty list
    if (
      localStorage.getItem("extTime") != null &&
      localStorage.getItem("extTime") < new Date().getTime()
    ) {
      removeCookie("todo-list");
      setCookie("todo-list", JSON.stringify(list1), 1);
    }

    console.log("[App.js] current time", new Date().toUTCString());
    const exdate = new Date();
    exdate.setTime(+localStorage.getItem("extTime"));
    console.log("[App.js] expire time", exdate.toUTCString());

    this.setState({
      listTodo: JSON.parse(getCookieValue("todo-list")),
    });
  }

  buttonClickHandler() {
    this.setState({
      showBtn: !this.state.showBtn,
    });
  }
  someHandler = () => {};
  inputKeyHandler(event) {
    let evt = event || window.event;

    switch (evt.key) {
      case "Enter":
        {
          // add task in list
          const copyList = [...this.state.listTodo];
          // push the input value to copy list if value is not empty
          if (evt.target.value) {
            copyList.push({ status: false, text: evt.target.value });
          }

          // set this copylist in state also
          //on enter input should disappear]
          this.setState({
            showBtn: !this.state.showBtn,
            listTodo: copyList,
          });
          //and also store it in local storage or cookie
          updateCookie("todo-list", JSON.stringify(copyList));

          evt.target.value = "";
        }
        break;
      case "Esc":
      case "Escape":
        {
          this.setState({ showBtn: true });
          evt.target.value = "";
        }
        break;
    }
  }

  //meaning list_checkbox_ChangeHanler
  list_c_ChangeHandler(item, itemIndex) {
    //on value of checkbox change this handler fire and now update the state.
    //copy previous state list
    console.log("before the change", this.state.listTodo);
    const copyList = [...this.state.listTodo];
    copyList[itemIndex].status = !item.status;
    console.log("after the change", copyList);

    //set the state
    this.setState({
      listTodo: copyList,
    });

    //set it to localstorage or cookie
    updateCookie("todo-list", JSON.stringify(copyList));
  }

  render() {
    return (
      <div className="App">
        <Header></Header>

        <div className="Listbox">
          <ToDoList
            passlist={this.state.listTodo}
            checkboxChangeHappen={(citem, cindex) => {
              console.log("[App.js] checkbox changeHappen!!", cindex, citem);
              this.list_c_ChangeHandler(citem, cindex);
            }}
          ></ToDoList>
        </div>

        {this.state.showBtn ? (
          <BtnFooter
            clicked={() => {
              this.buttonClickHandler();
            }}
          ></BtnFooter>
        ) : (
          <input
            id="Input"
            type="text"
            width="100%"
            onKeyDown={(event) => {
              this.inputKeyHandler(event);
            }}
            autoFocus
          />
        )}
      </div>
    );
  }
}

export default App;
