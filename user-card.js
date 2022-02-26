const template = document.createElement('template');
template.innerHTML = `
  <style>
    h3 { color: coral;}
    div.user-card {
      max-width: 300px;
      border: 1px solid gray;
    }
    :host {
      margin: 10px;
    }
    :host * {
      box-sizing: border-box;
    }
    :host > div {
      padding: 10px;
      text-align: center;
      background: gray;

    }
    img {
      width: 250px;
      height: 250px;
    }
  </style>
  <div class="user-card">
    <img />
    <div>
      <h3 id="shadowH3"></h3>
      <p><strong id="email">email: </strong></p>
      <p><strong id="phone">phone: </strong></p>
      <p class="info"><slot></slot></p>
      <div><button id="toggle-info">Hide Info</button><div>
    </div>
  </div>
`

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true

    this.attachShadow({ mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.getElementById('shadowH3').innerText = `${this.getAttribute('name')}`
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar')
    this.shadowRoot.getElementById('email').innerText += this.getAttribute('email') || ''
    this.shadowRoot.getElementById('phone').innerText += this.getAttribute('phone') || ''
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo())
  }

  toggleInfo(){
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot.querySelector('.info');
    const toggleButton = this.shadowRoot.querySelector('#toggle-info');
    if(this.showInfo) {
      info.style.display = 'block';
      toggleButton.innerText = 'Hide Info'
    } else {
      info.style.display = 'none'
      toggleButton.innerText = 'Show Info'
    }
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggleInfo').removeEventListener('click')
  }
}

window.customElements.define('user-card', UserCard)