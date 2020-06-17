import { addCard } from '../api';

class New extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  set data(data) {
    this.info = data;
  }

  set onClick(onClick) {
      this.click = onClick;
  }

  get onClick() {
    return this.click;
  }

  connectedCallback() {
    this.render();

    // Add listener
    const newCard = this.shadow.querySelector("#newCard");
    const newCardBox = this.shadow.querySelector("#newCardBox");
    const addButton = this.shadow.querySelector("#addButton");
    const cancelButton = this.shadow.querySelector("#cancelButton");
    const column = this.shadow.querySelector(".column");
    newCardBox.style.display = 'none';

    newCard.addEventListener("click", (e) => {
      this.boxVisible = !this.boxVisible;
      if (this.boxVisible) {
        newCardBox.style.display = 'flex';
        newCard.classList.add("hidden");
      } else {
        newCardBox.style.display = 'none';
      }
    });

    addButton.addEventListener("click", () => {
      newCardBox.style.display = 'none';
      newCard.classList.remove("hidden");
      this.clickAddCard();
    });

    cancelButton.addEventListener("click", () => {
        newCardBox.style.display = 'none';
        newCard.classList.remove("hidden");
     });
  }

  async clickAddCard() {
    const newTitle = this.shadow.querySelector("#newTitle");
    const newDescription = this.shadow.querySelector("#newDescription");
    const data = {
        title: newTitle.value, 
        description: newDescription.value, 
        columnId: this.info.id,
      }
    await addCard(data);
    this.onClick(data);
    newTitle.value = '';
    newDescription.value = '';
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        button {
            height: 32px;
        }
        textarea {
            height: 64px;
        }
        #addButton{
            background: green;
        }
        #add{
            background: green;
            color: #fff;
        }
        #newCard {
            cursor: pointer;
        }
        #newCard:hover {
            background-color: #ccc;
            
        }
        #newCardBox {
            margin-top: -32px;
            padding: 8px;
            display: flex;
            flex-direction: column;
        }
        .visible {
            visibility: visible;
        }
        .hidden {
            visibility: hidden;
        } 
      </style>

      <div href="#" id="newCard">Add a Card...</div>
      <div id="newCardBox">
        Title <input type="text" id="newTitle"></input>
        Description <textarea id="newDescription"></textarea>
        <button id="addButton">Add</button>
        <button id="cancelButton">Cancel</button>
      </div>
        `;
  }
}

customElements.define("wc-new", New);
