class Card extends HTMLElement {
  connectedCallback() {
    this.info = this.getAttribute('title');
    this.title = this.info.title;
    this.innerHTML = `
        <div class="card">
          ${this.title}
        </div>
      `;
  }
}

customElements.define("wc-card", Card);
