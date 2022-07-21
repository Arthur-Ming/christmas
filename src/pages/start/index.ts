import Component from "../../core/component";
import { ComponentInterface } from "../../interfaces";
import Router from "../../router";

const router = Router.getInstance()

const template = (): string => `
<div class="start-page">
  <div class="start-page__content wrapper__box">
    <div class="start-page__banner">
      <div class="start-page__banner-text">Помогите бабушке нарядить елку</div>
    </div>
    <button class="start-page__button button" data-button='button'>
      <span>Начать</span>
    </button>
    <div class="ball ball__1"></div>
    <div class="ball ball__2"></div>
  </div>
</div>
`;

export default class Start extends Component implements ComponentInterface {

  onButtonClick = (event: { target: { closest: Function } }): void => {

    const target: Element | null = event.target.closest('[data-button]')

    if (!target) return

    router.route({
      to: 'toys'
    })
  }

  render(): Element | null {
    super.render(template())
    this.initEventListeners()
    return this.element;
  }

  initEventListeners(): void {
    if (this.element)
      this.element.addEventListener('click', this.onButtonClick as unknown as EventListener)
  }
}