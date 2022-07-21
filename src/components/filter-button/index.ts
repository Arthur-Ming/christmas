import Component from "../../core/component";
import { ComponentInterface } from "../../interfaces";

const template = (): string => `
<button class="filter-button">
  <svg fill='none' viewBox="0 0 24 24">
    <use xlink:href='assets/svg/sprite.svg#filter-button' />
  </svg>
</button>
`;

export default class FilterButton extends Component implements ComponentInterface {

  static _instance: FilterButton | null

  static instance(): FilterButton {
    if (!this._instance) {
      this._instance = new FilterButton();
    }
    return this._instance;
  }

  render(): Element | null {
    super.render(template())
    return this.element;
  }
}