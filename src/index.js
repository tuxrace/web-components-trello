import "./components/hello";
import "./components/wc-column";
import "./components/wc-card";

import "./index.css";

const root = document.getElementById("root");

const fetchColumns = async () => {
  const res = await fetch("http://localhost:3000/columns", {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((data) => []);
  return res;
};

const fetchCards = async () => {
  const res = await fetch("http://localhost:3000/cards", {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((data) => []);
  return res;
};


const renderColumns = (columns) => {
    const data = []
    const container = document.querySelector(".container")
    console.log(container);
    columns.forEach(i => {
        const ele = document.createElement('wc-column')
        container.appendChild(ele)
    });
   
}

const render = async() => {
    const columns = await fetchColumns();

  root.innerHTML = `
<div>
    <div class="topBar"><h4>Web Components Trello Like</h4></div>
    <div class="container">
        ${renderColumns(columns)}
    </div>
</div>
`;
};

render();
