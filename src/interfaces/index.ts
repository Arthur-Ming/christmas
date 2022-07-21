export interface RawCard {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean,
}

export interface Card extends RawCard {
  isPicked: boolean
}

export interface ComponentInterface {
  element: Element | null;
  render(): Element | null;
  destroy(): void
}

export interface AsyncComponentInterface {
  element: Element | null;
  render(): Promise<Element | null>;
  destroy(): void
}

export interface CheckboxInterface extends ComponentInterface {
  reset(): void
}

export interface ToysCardsInterface extends ComponentInterface {

  shouldPick(isShouldPick: boolean): void
  sort(sortType: string): void
  update(cards: Card[]): void
}

export interface BasketInterface extends ComponentInterface {
  setItem(item: {
    cardNum: string,
    isPicked: boolean
  }): void
}

/* export interface SidebarInterface extends ComponentInterface {
  getFormComponents(): {
    [key: string]: Element | null
  }
} */

export interface TreeInterface extends ComponentInterface {
  updata(newNum: number): void
  addGarland(color: string): void
  removeGarland(): void
}

export interface DraggableBasketInterface extends ComponentInterface {
  getBackItem(newNum: string): void
}

export interface SnowfallInterface {
  start(): void
  stop(): void
}

export interface MediaInterface extends ComponentInterface {
  setAudioVolume(volum: number): void
  setSnowfall(container: Element): void
  reset(): void
}

export interface ChooseItemsInterface extends ComponentInterface {
  reset(choosedItem?: number | string): void
}

export interface PortalInterface {
  setComponent(name: string, instance: ComponentInterface): PortalInterface
  getComponent(name: string): ComponentInterface | undefined
}



