/*************************** Pilar 1 - Custom Elements: Extend HTML Element  **************************/
class PopUpInfo extends HTMLElement {
  /*************************** Pilar 1 - Custom Elements: Lifecycle constructor method  **************************/
  constructor() {
    // Always call super first in constructor
    super();

    /*************************** Pilar 2 - Shadow DOM: Provides access to the Shadow DOM **************************/
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    // Take attribute content and put it inside the info span
    const text = this.getAttribute('data-text');
    info.textContent = text;

    // Insert icon
    let imgUrl;
    if (this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'img/default.png';
    }

    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
        .wrapper {
          position: relative;
        }
       
        .info {
          font-size: 0.8rem;
          width: 200px;
          display: inline-block;
          border: 1px solid black;
          padding: 10px;
          /*************************** Pilar 2 - Shadow DOM: CSS Properties (CSS Variables) allow styling from outside the DOM **************************/
          background: var(--info-color-background, blue);
          border-radius: 10px;
          opacity: 0;
          transition: 0.6s all;
          position: absolute;
          bottom: 20px;
          left: 10px;
          z-index: 3;
        }
        img {
          width: 1.2rem;
        }
        .icon:hover + .info, .icon:focus + .info {
          opacity: 1;
        }
      `;

    /*************************** Pilar 2 - Shadow DOM: Attach the created element to the Shadow DOM (Display in Chrome) **************************/
    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}

/*************************** Pilar 1 - Custom Elements: Defined with customElements.define('my-component', MyComponent);​  **************************/
/*************************** Pilar 1 - Custom Elements: Always have a dash in the custom element name **************************/
customElements.define('popup-info', PopUpInfo);
