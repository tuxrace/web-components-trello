import { fetchCards, addCard } from "../api";
import './wc-new';

class Column extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  set data(data) {
    this.info = data;
    this.title = this.info.title;
  }

  attributeChangedCallback() {}

  async connectedCallback() {
    this.cards = await fetchCards(this.info.id);
    this.boxVisible = false;

    this.render();
    this.renderCards();

  }

  renderCards() {
    const col = this.shadow.querySelector(".cards");
    this.cards.forEach((card) => {
      const el = document.createElement("wc-card");
      el.data = card;
      col.appendChild(el);
    });
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
          <div class="cards"></div>
          <wc-new title=${this.info}></wc-new>
        </div>
      `;
  }
}

customElements.define("wc-column", Column);
