class Card extends HTMLElement {
  set data(data){
    this.info = data
  }
  connectedCallback() {
    this.title = this.info.title;
    this.description = this.info.description;

    this.innerHTML = `
        <div class="card">
          <strong>${this.title}</strong>
          <p>${this.description}</p>
        </div>
      `;
  }
}

customElements.define("wc-card", Card);
