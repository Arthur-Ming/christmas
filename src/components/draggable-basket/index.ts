import Component from "../../core/component";
import DraggableItem from "./draggable-item";
import { DraggableBasketInterface } from "../../interfaces";
import { createElement, getSubElements } from "../../utils/domHelpers";
import Dragging from "../dragging";

const template = (): string =>
  `<div class="draggable-basket__items"></div>`;


export type DraggableBasketParams = {
  num: string,
  count: string
}

export default class DraggableBasket extends Component implements DraggableBasketInterface {

  private params: DraggableBasketParams[]
  dragging!: Dragging | null
  items!: Element[]

  onPointerUp = (event: CustomEvent): void => {
    if (this.subElements) {
      const elem: HTMLElement = this.subElements[event.detail]
      this.setHighlight(elem)
      let count: HTMLElement | null = elem.querySelector('[data-count]')
      if (count) {
        if (Number(count.innerHTML) > 0) {
          count.innerHTML = String(Number(count.innerHTML) - 1)
        }
        if (Number(count.innerHTML) === 0) {

          const el: HTMLElement | null = elem.querySelector('[data-grab-handle]')
          if (el) {
            el.remove()
          }
        }
      }
    }
  }

  onMoveElem = (event: CustomEvent): void => {

    const clone: HTMLElement = event.detail.cloneNode(true)
    event.detail.after(clone)

  }

  constructor(params: DraggableBasketParams[]) {

    super()
    this.params = params

  }

  render(): Element | null {
    super.render(template())
    this.items = this.getItems()
    this.element && this.element.append(...this.items)
    this.subElements = getSubElements(this.element);

    this.dragging = new Dragging({
      elem: this.element
    })

    this.initEventListeners()
    return this.element;
  }

  getItems(): Element[] {

    return this.params.map(({ num, count }: DraggableBasketParams) =>
      DraggableItem({ num, count }))
  }

  getBackItem(newNum: string): void {

    if (this.subElements) {
      const elem = this.subElements[newNum]
      this.setHighlight(elem)

      const count: HTMLElement | null = elem.querySelector('[data-count]')
      if (count) {
        if (Number(count.innerHTML) === 0) {
          elem.append(createElement(`
          <div class="draggable-basket__img" data-grab-handle data-num='${newNum}'>
            <img src="./assets/toys/${newNum}.png" alt="">
         </div>
          `))
        }
        count.innerHTML = String(Number(count.innerHTML) + 1)
      }
    }
  }

  setHighlight(elem: HTMLElement) {
    elem.classList.add('draggable-basket__item_highlight')
    setTimeout(() => {
      elem.classList.remove('draggable-basket__item_highlight')
    }, 500)
  }

  initEventListeners(): void {

    if (this.element) {
      this.element.addEventListener('pointer-up', this.onPointerUp as unknown as EventListener)
      this.element.addEventListener('move-elem', this.onMoveElem as unknown as EventListener)
    }
  }
}