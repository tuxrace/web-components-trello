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
    const add = this.shadow.querySelector("#newCard");
    const addBox = this.shadow.querySelector("#newCardBox");
    const button = this.shadow.querySelector("button");
    const column = this.shadow.querySelector(".column");
    addBox.style.display = 'none';

    add.addEventListener("click", (e) => {
      this.boxVisible = !this.boxVisible;
      if (this.boxVisible) {
        addBox.style.display = 'block';
        add.classList.add("hidden");
      } else {
        addBox.style.display = 'none';
      }
    });

    button.addEventListener("click", () => {
      addBox.style.display = 'none';
      add.classList.remove("hidden");
      this.clickAddCard();
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
    this.onClick(data);
    await addCard(data);
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
        .addButton{
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
        <button class="addButton">Add</button>
        <button name="cancelButton">Cancel</button>
      </div>
        `;
  }
}

customElements.define("wc-new", New);
