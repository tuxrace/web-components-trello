class Column extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  async fetchCards(id) {
    return await fetch(`http://localhost:3000/cards?columnId=${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((data) => []);
  }

  set data(data) {
    this.info = data;
    this.title = this.info.title;
  }

  renderCards() {
    const col = this.shadow.querySelector(".column");
    this.cards.forEach((card) => {
      const el = document.createElement("wc-card");
      el.data = card;
      col.appendChild(el);
    });
  }

  async connectedCallback() {
    this.cards = await this.fetchCards(this.info.id);

    this.shadow.innerHTML = `
        <style>
          .column {
            margin: 24px 16px;
            min-height: 300px;
            width: 300px;
            background-color: #e0ebf3;
            border-radius: 8px;
            padding: 8px;
            color: #555;    
          }
        </style>
        <div class="column">
          ${this.title}
        </div>
      `;

    this.renderCards();
  }
}

customElements.define("wc-column", Column);
