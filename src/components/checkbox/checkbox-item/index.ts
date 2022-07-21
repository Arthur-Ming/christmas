import { createElement } from "../../../utils/domHelpers";
import { CheckboxItemParams } from "../../../types";

const template = (params: CheckboxItemParams): string => {

  const {
    value = 0,
    legend = '',
    isSelected = false,
    extraClass = 'checkbox_default',
    icon = `
    <svg class="checkbox__checked checkbox__checked_default" viewBox="0 0 15 12">
      <use xlink:href='assets/svg/checkbox-sprites.svg#default' />
    </svg>`  } = params

  return `
<label class="checkbox ${extraClass}">
  <input type="checkbox" class="checkbox__input" name="checkbox" value=${value} 
  ${isSelected ? 'checked' : ''} >
  <span class="checkbox__state">
    <span class="checkbox__control">
      ${icon}
    </span>
    <span class="checkbox__legend">${legend}</span>
  </span>
</label>
`;
}

export default function CheckboxItem(params: CheckboxItemParams): Element {

  return createElement(template(params))
}
/* 
export default class CheckboxItem implements ComponentInterface {

  element: Element | null = null
  private params: CheckboxItemParams

  constructor(params: CheckboxItemParams) {

    this.params = params

  }

  render() {
    this.element = createElement(template(this.params))

    return this.element;
  }

} */