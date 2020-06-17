import { fetchCards, addCard, deleteCard } from "../api";
import './wc-new';

class Column extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete= this.handleDelete.bind(this);
  }

  set data(data) {
    this.info = data;
    this.title = this.info.title;
  }

  connectedCallback() {
    this.render();
    this.renderCards();
    this.renderNewCard();
  }

  handleClick(data) {
    this.renderAddCards(data);
  }

  async handleDelete(id) {
    await deleteCard(id);
    this.renderCards();
  }

  async renderCards() {
    this.cards = await fetchCards(this.info.id);
    const col = this.shadow.querySelector("#cards");
    col.innerHTML = ``;
    this.cards.forEach((card) => {
      const el = document.createElement("wc-card");
      el.data = card;
      el.onDelete = this.handleDelete;
      col.appendChild(el);
    });
  }

  renderNewCard() {
    const newCard = this.shadow.querySelector("#newCard");
    const el = document.createElement("wc-new");
    el.data = this.info;
    el.onClick = this.handleClick;
    newCard.appendChild(el);
  }

  renderAddCards(data) {
    this.renderCards();
  }

  render() {
    this.shadow.innerHTML = `
        <style>
          .column {
            margin: 24px 16px;
            min-height: 200px;
            width: 288px;
            background-color: #e0ebf3;
            border-radius: 8px;
            color: #555;    
            padding: 8px;
          }
          
          @media only screen and (max-width : 640px) {
            .column {
              width: 88%;
            }
          }
        </style>
        
        <div class="column">
          <strong>${this.title}</strong>
          <div id="cards"></div>
          <div id="newCard"></div>
        </div>
      `;
  }
}

customElements.define("wc-column", Column);
