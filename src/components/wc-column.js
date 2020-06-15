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
    this.boxVisible = false;

    this.render();
    this.renderCards();

    // Add listener
    const add = this.shadow.querySelector("#add");
    const addBox = this.shadow.querySelector("#addBox");
    console.log(addBox);

    add.addEventListener("click", function (e) {
      this.boxVisible = !this.boxVisible;

      if (this.boxVisible){
        addBox.classList.remove('hidden')
      } else {
        addBox.classList.add('hidden')
      }
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
          #add:hover {
            cursor: pointer;
          }
          #addBox {
            padding: 8px 0;
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
        
        <div class="column">
          ${this.title}
          <div class="cards"></div>
          <div href="#" id="add">Add a Card...</div>
          <div id="addBox" class="hidden">
            <label for="">Title</label>
            <input type="text" name="title"/>
            <label for="">Description</label>
            <input type="text" name="description"/>
          </div>
        </div>
      `;

  }
}

customElements.define("wc-column", Column);
