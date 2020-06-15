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

  attributeChangedCallback(){

  }

  async connectedCallback() {
    this.cards = await this.fetchCards(this.info.id);

    this.render();
    this.renderCards();

    // Add listener
    const add = this.shadowRoot.querySelector("#add");
    add.addEventListener("click", function (e) {
      console.log('listend to check event');
      console.log(e);
  });
  }


  renderCards() {
    const col = this.shadow.querySelector(".cards");
    this.cards.forEach((card) => {
      const el = document.createElement("wc-card");
      el.data = card;
      col.appendChild(el);
    });
  }

  render(){
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
          #add {
            cursor: pointer;
          }
        </style>
        
        <div class="column">
          ${this.title}
          <div class="cards"></div>
          <div id="add">Add a Card...</div>
        </div>
      `;

  }
}

customElements.define("wc-column", Column);
