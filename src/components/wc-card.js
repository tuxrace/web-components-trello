class Card extends HTMLElement {
  constructor(){
    super();
    this.shadow = this.attachShadow({mode: "open"})
  }

  set data(data){
    this.info = data
  }

  connectedCallback() {
    this.title = this.info.title;
    this.description = this.info.description;
    this.render();
  }

  render(){
    this.shadow.innerHTML = `
        <style>
          .card {
            margin: 16px 8px;
            height: 100px;
            background-color: #fff;
            border-radius: 8px;
            padding: 8px;
            color: #555; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        </style>

        <div class="card">
          <strong>${this.title}</strong>
          <p>${this.description}</p>
        </div>
      `;
  }
}

customElements.define("wc-card", Card);
