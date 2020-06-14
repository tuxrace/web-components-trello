import "./components/wc-column";
import "./components/wc-card";

import "./index.css";

const root = document.getElementById("root");
const board = document.getElementById("board");

window.addEventListener("load", async () => {
  const columns = await fetchColumns();
  renderTop();
  renderColumns(columns);
});

const fetchColumns = async () => {
  const res = await fetch("http://localhost:3000/columns", {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((data) => []);
  return res;
};

const renderColumns = (columns) => {
  columns.forEach((i) => {
    const el = document.createElement("wc-column");
    el.data = i;
    board.appendChild(el);
  });
  return ``;
};

const renderTop = async () => {
  root.innerHTML = `
        <div>
            <div class="topBar"><h4>Web Components Trello Like</h4></div>
        </div>
    `;
};
