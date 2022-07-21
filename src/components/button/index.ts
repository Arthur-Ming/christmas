import Component from "../../core/component";
import { ComponentInterface } from "../../interfaces";

type ButtonParams = {
  title?: string,
}

const template = ({ title }: ButtonParams): string => `
<button class="button">
  <span>${title}</span>
</button>
`;

export default class Button extends Component implements ComponentInterface {

  private params!: ButtonParams;

  constructor({
    title = '',
  }: ButtonParams) {

    super()
    this.params = { title }
  }

  render(): Element | null {
    super.render(template(this.params))
    return this.element;
  }
}