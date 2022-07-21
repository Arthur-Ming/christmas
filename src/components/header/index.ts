import Component from "../../core/component";
import { BasketInterface, ComponentInterface } from "../../interfaces";
import Basket from "../basket";
import Search from "../search";
import Portal from "../../core/portal";
import Nav from "../nav";
import Media from "../media";
import FilterButton from "../filter-button";

const template = (): string => `
<div class="header__content wrapper__box header_start">
  <div class="header__column">
     <nav class="header__nav nav" data-element='nav'></nav>
  </div>
   <div class="header__column">
    <div class="header__search" data-element='search'></div>
    <div class="header__basket" data-element='basket'></div>
  </div>
  <div class="header__column header__column_control" data-element='control'>
    <div class="header__dropdawn" data-element='dropdown'></div>
    <div class="header__filter-button" data-element='filterButton'>
      <h4>Фильтры</h4>
    </div>
  </div>
  <div class="header__media" data-element='media'></div>
</div>
`;

const portal = Portal.getInstance()

export default class Header extends Component implements ComponentInterface {

  private components!: {
    basket: BasketInterface
    search: ComponentInterface
    nav: ComponentInterface
    media: ComponentInterface
    filterButton: ComponentInterface
  };

  onRoute = (event: CustomEvent): void => {

    const elem: string = event.detail.to
    this.views[elem]()
  }

  onWindowResize = (): void => {
    this.moveDropdown(document.documentElement.clientWidth)
  }

  initComponents(): void {

    this.components = {
      basket: Basket.getInstance(),
      search: Search.getInstance(),
      nav: new Nav(),
      media: Media.getInstance(),
      filterButton: FilterButton.instance()
    }

    super.renderComponents(this.components)

  }

  views: {
    [key: string]: () => void
  } = {
      start: (): void => {
        this.fide(() => {
          /*   this.showAll()
            this.hideElement(['search', 'basket', 'media', 'filterButton', 'dropdown', 'control', 'nav']) */
          this.element && this.element.classList.add('header_start')
        })
      },

      toys: (): void => {
        this.fide(() => {
          this.showAll()
          this.hideElement(['media'])
          this.element && this.element.classList.remove('header_start')
          this.moveDropdown(document.documentElement.clientWidth)
        })

      },
      'tree-page': (): void => {
        this.fide(() => {
          this.showAll()
          this.hideElement(['search', 'basket', 'filterButton', 'dropdown', 'control'])
          this.element && this.element.classList.remove('header_start')
        })
      },
    }

  fide(func: () => void): void {
    setTimeout(func, 300)
  }

  showAll(): void {
    if (this.subElements) {
      Object.values(this.subElements).forEach((subElement: HTMLElement) => {
        subElement.classList.remove('_hidden')
      })
    }
  }

  hideElement(elems: string[]): void {
    if (this.subElements) {
      Object.entries(this.subElements).forEach(([name, subElement]: [string, HTMLElement]) => {
        if (elems.includes(name)) {
          subElement.classList.add('_hidden')
        }
      })
    }
  }

  moveDropdown(windowWidth: number): void {
    if (windowWidth <= 768 && this.subElements && !this.subElements.dropdown.innerHTML) {
      const dropdown: ComponentInterface | undefined = portal.getComponent('sidebarDropdown')
      if (dropdown && dropdown.element) {
        this.subElements.dropdown.append(dropdown.element)
      }
    }
  }

  render(): Element | null {
    super.render(template())
    this.hideElement(['search', 'basket', 'media'])
    this.initComponents();
    this.initEventListeners()
    return this.element;
  }

  initEventListeners(): void {
    document.addEventListener('route', this.onRoute as unknown as EventListener)
    window.addEventListener('resize', this.onWindowResize as unknown as EventListener)
  }
}