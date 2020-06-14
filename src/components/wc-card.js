class Card extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<div class="card"></div>`;
    }
}
      
customElements.define('wc-card', Card);