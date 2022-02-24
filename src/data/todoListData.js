const todoListData1 = [
  { status: true, text: "Create example an Omniscient playground! :D" },
  { status: true, text: "Make it support es6!" },
  { status: true, text: "And jsx!" },
  { status: false, text: "It should compile as you type!" },
  { status: false, text: "And give immediate feedback!" },
  { status: false, text: "Make more examples!!1" },
];

const todoListData2 = [];

function getData() {
  return todoListData1;
}

export default getData;
