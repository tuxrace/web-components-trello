class Card extends HTMLElement {
  constructor(){
    super();
    this.shadow = this.attachShadow({mode: "open"})
  }

  set data(data){
    this.info = data
  }

  set onDelete(del) {
    this.delete = del;
  }

  get onDelete() {
    return this.delete;
  }

  connectedCallback() {
    this.title = this.info.title;
    this.description = this.info.description;
    this.render();

    // Event Listeners
    const close = this.shadow.querySelector(".close");
    close.addEventListener("click", (e) => {
      this.onDelete(this.info.id);
    });
  }

  disconnectedCallback(){
    const close = this.shadow.querySelector(".close");
    this.shadow.removeEventListener("click", close);
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
          .close {
            float: right;
            cursor: pointer;
          }
        </style>

        <div class="card">
          <strong>${this.title}</strong> <div class="close"> x </div>
          <p>${this.description}</p>
        </div>
      `;
  }
}

customElements.define("wc-card", Card);
