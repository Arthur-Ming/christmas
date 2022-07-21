import Component from "../../core/component";
import { ComponentInterface } from "../../interfaces";
import { CheckboxItemParams } from "../../types";
import emit from "../../utils/emit";
import CheckboxItem from "./checkbox-item";

const template = (): string =>
  `<form class="form-checkbox"></form>`;

export default class Checkbox extends Component implements ComponentInterface {

  private params: CheckboxItemParams[]
  items!: Element[]

  onChange = (event: { target: { value: string, checked: boolean }; }): void => {

    emit({
      event: 'checkbox-changed',
      elem: this.element,
      payload: {
        value: event.target.value,
        checked: event.target.checked
      }
    })
  }

  constructor(params: CheckboxItemParams[] = [{
    value: 0,
    isSelected: false,
    legend: '',
    extraClass: 'checkbox_default',
    icon: `
    <svg class="checkbox__checked checkbox__checked_default" viewBox="0 0 15 12">
      <use xlink:href='assets/svg/checkbox-sprites.svg#default' />
    </svg>`
  }]) {

    super()
    this.params = params
  }

  render(): Element | null {
    super.render(template())
    this.items = this.getItems()
    this.element && this.element.append(...this.items)
    this.initEventListeners()
    return this.element;
  }

  getItems(): Element[] {

    return this.params.map((param: CheckboxItemParams) => CheckboxItem(param))

  }

  reset(): void {
    this.items.forEach((item: Element) => {
      const checkboxInput: HTMLInputElement | null = item.querySelector('input')
      if (checkboxInput)
        checkboxInput.checked = false
    })
  }

  initEventListeners(): void {
    if (!this.element) return
    this.element.addEventListener('change', this.onChange as unknown as EventListener);
  }
}