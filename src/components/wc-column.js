class Column extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<div class="column">Tesst data</div>`;
    }
}
      
customElements.define('wc-column', Column);