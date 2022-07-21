import Component from "../../core/component";
import ChooseItem from "./choose-item";
import { ChooseItemsInterface } from "../../interfaces";
import emit from "../../utils/emit";

const template = (): string =>
  `<div class="choose-items__content"></div>`;

type ChooseItemsParams = {
  type: string,
  items: number[] | string[]
  choosedItem: number | string
}

export default class ChooseItems extends Component implements ChooseItemsInterface {

  private params: ChooseItemsParams
  items!: Element[]

  onClick = (event: { target: { closest: Function }; }): void => {

    const target: HTMLElement | null = event.target.closest('[data-item]')

    if (!target) return

    this.items.forEach((item: Element) =>
      item.classList.remove('choose-items_ch')
    )

    target.classList.add('choose-items_ch')

    emit({
      event: 'item-click',
      elem: this.element,
      payload: target.dataset.item
    })
  }

  constructor(params: ChooseItemsParams) {

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

    return this.params.items.map((item: number | string) =>
      ChooseItem({
        choosedItem: this.params.choosedItem,
        item: item,
        type: this.params.type
      })
    )
  }

  reset(choosedItem?: number | string): void {

    this.items.forEach((item: Element, index: number) => {
      item.classList.remove('choose-items_ch')
      if (choosedItem === index + 1)
        item.classList.add('choose-items_ch')
    })
  }

  initEventListeners(): void {
    if (this.element)
      this.element.addEventListener('click', this.onClick as unknown as EventListener)
  }
}