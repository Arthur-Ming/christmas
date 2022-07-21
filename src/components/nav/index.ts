import Component from "../../core/component";
import { ComponentInterface } from "../../interfaces";
import { getSubElements } from "../../utils/domHelpers";
import Router from "../../router";

const router = Router.getInstance()

const template = (): string => `
<ul class="nav__list">
  <li class="nav__item nav__item_current" data-nav='start'>
     <svg class="nav__item_icon" viewBox="0 0 98 128">
       <use xlink:href='assets/svg/sprite.svg#tree' />
    </svg>
  </li>
  <li class="nav__item" data-nav='toys'>Игрушки</li>
  <li class="nav__item" data-nav='tree-page'>Ёлка</li>
</ul>
`;

export default class Nav extends Component implements ComponentInterface {

  onNavClick = (event: { target: { closest: Function }; }): void => {
    const target = event.target.closest('[data-nav]')
    if (target && !event.target.closest('.nav__item_current')) {
      router.route({
        to: target.dataset.nav
      })
    }
  }

  onRoute = (event: CustomEvent): void => {
    if (this.subElements) {
      Object.values(this.subElements).forEach((subElement: HTMLElement) => {
        subElement.classList.remove('nav__item_current')
      })
      this.subElements[event.detail.to].classList.add('nav__item_current')
    }
  }

  render(): Element | null {
    super.render(template())
    this.subElements = getSubElements(this.element, '[data-nav]', 'nav')

    this.initEventListeners()
    return this.element;
  }

  initEventListeners(): void {

    if (this.element)
      this.element.addEventListener('click', this.onNavClick as unknown as EventListener)

    document.addEventListener('route', this.onRoute as unknown as EventListener)
  }
}