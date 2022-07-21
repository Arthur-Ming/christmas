import Component from './core/component';
import Header from './components/header';
import Start from './pages/start';
import Footer from './components/footer';
import storage from './storage';
import { ComponentInterface } from './interfaces';

const template = (): string => `
<div class="wrapper">
  <header class="header" data-element="header"></header>
  <main class="main" data-element="main" id='content'></main>
  <footer class="footer" data-element="footer"></footer>
</div>
`;



export default class App extends Component implements ComponentInterface {

  private components!: {
    [key: string]: ComponentInterface
  };

  async initComponents() {

    await storage.getLocalStorage()

    this.components = {
      header: new Header(),
      main: new Start(),
      footer: new Footer()

    }

    super.renderComponents(this.components)
    this.initEventListeners()
  }

  render() {
    super.render(template())
    this.initComponents();
    return this.element;
  }

  initEventListeners() {

    document.addEventListener('route', () => {

      setTimeout(() => {
        if (this.subElements) {
          this.subElements.header.classList.remove('_hidden')
        }
      }, 300)
    })
  }
}
