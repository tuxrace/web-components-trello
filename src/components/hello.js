class Hello extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<h2>Welcome Board</h2>`;
    }
}
      
customElements.define('wc-hello', Hello);