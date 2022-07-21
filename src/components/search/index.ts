import Component from "../../core/component";
import { ComponentInterface } from "../../interfaces";
import storage from "../../storage";

const template = (): string => `
<form class="search">
  <input type="search" class="search__input" autofocus autocomplete="off" placeholder="введите...">
    <svg class="search__icon" viewBox="0 0 64 64">
      <use xlink:href='assets/svg/sprite.svg#search' />
    </svg>
</form>
`;

export default class Search extends Component implements ComponentInterface {

  private static instance: Search | null

  static getInstance() {
    if (!this.instance) {
      this.instance = new Search();
    }
    return this.instance;
  }

  private constructor() {
    super()
  }

  render(): Element | null {
    super.render(template())
    this.setValue(storage.searchInputValue)
    return this.element;
  }

  setValue(value: string): void {
    if (this.element) {
      const input = this.element.querySelector('input')
      if (input)
        input.value = value
    }
  }
}