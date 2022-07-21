import Component from "../../core/component";
import ToyCard from "./toy-card";
import { ToysCardsInterface, Card } from "../../interfaces";
import emit from "../../utils/emit";
import sorts from "./sorts";
import shuffleCards from "../../utils/shuffleCards";
import shuffle from "../../utils/shuffle";

const template = (): string => `
<div class="toys__cards wrapper__box"></div>`

export default class ToysCards extends Component implements ToysCardsInterface {

  private items: Element[] = []
  private isShouldPick: boolean = true
  private currentSortType: string | null = null
  private cards: Card[];

  onCardPicked = (event: { target: { closest: (arg0: string) => HTMLElement; }; }): void => {

    const target: HTMLElement | null = event.target.closest('[data-num]')

    if (!target) return

    if (this.isShouldPick) {
      target.classList.toggle('toy-card_picked')
    }
    else {
      target.classList.remove('toy-card_picked')
    }

    emit({
      event: 'card-picked',
      elem: this.element,
      payload: {
        cardNum: target.dataset.num,
        isPicked: target.classList.contains('toy-card_picked')
      }
    })
  }

  constructor(cards: Card[]) {
    super()
    this.cards = cards
  }

  render(): Element | null {
    super.render(template())

    if (this.cards.length && this.element) {
      this.items = this.getItems()
      this.element.append(...this.items)
    }

    this.initEventListeners()
    return this.element;
  }

  getItems = (): Array<Element> => this.cards.map((card: Card) => ToyCard(card))

  shouldPick(isShouldPick: boolean = true): void {
    this.isShouldPick = isShouldPick
  }

  sort(sortType: string): void {
    this.currentSortType = sortType
    if (this.currentSortType !== null) {
      if (this.currentSortType === 'random') {
        shuffle(this.items)
      } else
        this.items.sort(sorts[this.currentSortType])
    }
    if (this.element)
      shuffleCards(this.element, this.items)
  }

  update(cards: Card[]): void {
    this.cards = cards
    if (this.element) {
      this.element.innerHTML = ''
      this.items = this.getItems()
      this.element.append(...this.items)
      if (this.currentSortType !== null)
        this.sort(this.currentSortType)
    }
  }

  initEventListeners(): void {
    if (!this.element) return
    this.element.addEventListener('click', this.onCardPicked as unknown as EventListener);
  }
}