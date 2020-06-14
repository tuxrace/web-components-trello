class Column extends HTMLElement {
  
  async fetchCards(id){
    const res = await fetch(`http://localhost:3000/cards?columnId=${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((data) => []);
    return res;
  };

  set data(data){
    this.info = data;
    this.title = this.info.title
  }

  async connectedCallback() {
    this.cards = await this.fetchCards(this.info.id);

    this.innerHTML = `
        <div class="column">
          ${this.title}
        </div>
      `;
    
    const col = this.querySelector('.column');
    console.log(this.cards)
    this.cards.forEach(card => {
      const el = document.createElement('wc-card');
      el.data = card
      col.appendChild(el)
    })
    
  }

  

}

customElements.define("wc-column", Column);
