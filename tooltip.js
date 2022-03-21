class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "dummy data default";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
    div {
      display:flex;
      background-color: black;
      color: white;
      position: absolute;
      top:220px;
      z-index:10;
      width:20vw;
      height:20vh;
      justify-content:center;
    }
    :host {
      display:flex;
      justify-content: center;
      flex-direction:column;
      align-items:center;
      width:20vw;
      height:38vh;
   }
      button {
        border-radius: 4px;
        padding: 0.15rem 0.5rem;
        font-size: larger;
      }
    </style>
    
    <slot>default</slot>
    <button>More</button>`;
  }
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    const tooltipIcon = this.shadowRoot.querySelector("button");
    tooltipIcon.addEventListener("mouseenter", this._showToolTip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideToolTip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  _showToolTip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }
  _hideToolTip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("gd-tooltip", Tooltip);
