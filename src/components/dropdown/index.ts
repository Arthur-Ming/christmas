import Component from '../../core/component';
import { ComponentInterface } from '../../interfaces';
import { DropDownParams } from '../../types';
import emit from '../../utils/emit';

const template = (title: string, items: string): string => `
<div class="dropdown">
  <button type="button" class="dropdown__toggle" data-element='toggle'>
  <span class="dropdown__current" data-element='current'>${title}</span>
  <svg class="dropdown__icon" viewBox="0 0 10 6">
      <use xlink:href='assets/svg/sprite.svg#arrow-dawn' />
  </svg>
  </button>
  <div class="dropdown__menu" data-element='menu'>${items}</div>
</div>
`;

export default class Dropdown extends Component implements ComponentInterface {

  params: DropDownParams[]
  defaultTitle: string

  onToggleClick = (event: { target: { closest: (arg0: string) => HTMLElement; }; }): void => {

    const target: HTMLElement | null = event.target.closest('[data-element]')

    if (!target || !this.element) return

    this.element.classList.toggle('dropdown_show-menu')

  }

  onMenuClick = (event: { target: { closest: (arg0: string) => HTMLElement; }; }): void => {

    const target: HTMLElement | null = event.target.closest('[data-value]')

    if (!target || !this.element || !this.subElements) return

    this.element.classList.toggle('dropdown_show-menu')
    this.subElements.current.textContent = target.innerHTML
    emit({
      event: 'option-selected',
      elem: this.element,
      payload: target.dataset.value
    })

  }
  onWindowClick = (event: { target: { closest: (arg0: string) => HTMLElement; }; }): void => {

    const target: HTMLElement | null = event.target.closest('.dropdown')

    if (!target && this.element) {
      this.element.classList.remove('dropdown_show-menu')
    }
  }

  constructor(params: DropDownParams[], defaultTitle = '') {
    super()
    this.params = params
    this.defaultTitle = defaultTitle
  }

  render(): Element | null {
    super.render(template(this.getTitle(), this.getItems()))
    this.initEventListeners()
    return this.element;
  }

  getItems(): string {
    return this.params.map(({ title, value }: { title: string, value: string }) =>
      `<button class="dropdown__item" type="button" data-value='${value}'>
         ${title}
      </button>
      `
    ).join('')
  }

  getTitle(): string {
    const selected = this.params.find(({ isSelected }) => isSelected)
    return selected ? selected.title : this.defaultTitle
  }

  initEventListeners(): void {
    if (this.subElements) {
      this.subElements.toggle.addEventListener('click', this.onToggleClick as unknown as EventListener);
      this.subElements.menu.addEventListener('click', this.onMenuClick as unknown as EventListener);
    }
    window.addEventListener('click', this.onWindowClick as unknown as EventListener, true)
  }
}
