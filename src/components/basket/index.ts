import Component from "../../core/component";
import storage from "../../storage";
import { BasketInterface } from "../../interfaces";
import emit from "../../utils/emit";

const template = (): string => `
<div class="basket">
  <svg class="basket__icon" viewBox="0 0 64 64">
    <use xlink:href='assets/svg/sprite.svg#ball' />
  </svg>
  <span class="basket__amount"></span>
</div> 
`;

const MAX_CARDS_NUM = 20

export default class Basket extends Component implements BasketInterface {

  private currentCardsPicked: string[] = [...storage.basketItems]
  private amount: Element | null = null

  private static instance: Basket | null

  static getInstance(): Basket {
    if (!this.instance) {
      this.instance = new Basket();
    }
    return this.instance;
  }

  private constructor() {
    super()
  }

  render(): Element | null {
    super.render(template())
    if (this.element)
      this.amount = this.element.querySelector('.basket__amount')
    this.setAmount(this.currentCardsPicked.length)
    return this.element;
  }

  setItem(item: {
    cardNum: string,
    isPicked: boolean
  }): void {

    storage.setBasketItems(item)
    this.currentCardsPicked = storage.basketItems

    this.setAmount(this.currentCardsPicked.length)
  }

  setAmount(currentCardsNum: number): void {

    if (this.amount && currentCardsNum <= MAX_CARDS_NUM) {

      this.amount.textContent = String(currentCardsNum)
      this.setColored()

      if (currentCardsNum < MAX_CARDS_NUM)
        emit({
          event: 'item-saved',
          elem: this.element
        })

      if (currentCardsNum === MAX_CARDS_NUM)
        emit({
          event: 'last-saved',
          elem: this.element
        })
    }

    if (currentCardsNum > MAX_CARDS_NUM) {

      emit({
        event: 'basket-filled',
        elem: this.element
      })
    }
  }

  setColored(): void {

    if (this.currentCardsPicked.length)
      this.element?.classList.add('basket_colored')
    else
      this.element?.classList.remove('basket_colored')
  }
}