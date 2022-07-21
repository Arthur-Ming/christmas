import Component from "../../core/component";
import ChooseItems from "../../components/choose-items";
import CurrentTree from "../../components/current-tree";
import DraggableBasket from "../../components/draggable-basket";
import Checkbox from "../../components/checkbox";
import Media from "../../components/media";
import Button from "../../components/button";
import {
  ComponentInterface, TreeInterface,
  DraggableBasketInterface, ChooseItemsInterface, CheckboxInterface, Card
} from "../../interfaces";

import storage from "../../storage";
import rawData from "../../data";

const template = (): string => `
<div class="tree-page wrapper__box">
  <aside class="choose-bar">
      <div class="choose-bar__content">
          <div class="choose-items choose-tree" data-element='chooseTree'>
            <h4 class="choose-bar__title">Выберите  Ёлку</h4>
          </div>
          <div class="choose-items choose-bg" data-element='chooseBg'>
            <h4 class="choose-bar__title">Выберите фон</h4>
          </div>
        <div class="garland-control">
          <h4 class="choose-bar__title">Гирлянда</h4>
          <div class="garland-control__content">
             <div class="choose-items choose-garland" data-element='chooseGarlandColor'></div>
             <div class="garland-control__checkbox" data-element='garlandCheckbox'></div>
          </div>
        </div>
        <div class="sidebar__item sidebar__reset" data-element='resetChoose'></div>
      </div>
  </aside>
  <div class="tree" data-element='tree'></div>
  <aside class="choose-bar">
      <div class="choose-bar__content">
        <div class="draggable-basket" data-element='draggableBasket'>
          <h4 class="choose-bar__title">Игрушки</h4>
        </div>
      </div>
  </aside>
</div>
`;


const treeItems: ReadonlyArray<number> = [1, 2, 3, 4]
const bgItems: ReadonlyArray<number> = [1, 2, 3, 4, 5, 6, 7, 8]
const media = Media.getInstance()
media.setAudioVolume(0.2)

type ElementType = Element | null

export default class TreePage extends Component implements ComponentInterface {

  private components!: {
    chooseTree: ChooseItemsInterface,
    chooseBg: ChooseItemsInterface,
    tree: TreeInterface,
    draggableBasket: DraggableBasketInterface,
    chooseGarlandColor: ChooseItemsInterface,
    garlandCheckbox: CheckboxInterface,
    resetChoose: ComponentInterface,
  };

  onTreeChoosed = (event: CustomEvent): void => {
    storage.choosedTree = Number(event.detail)
    this.components.tree.updata(storage.choosedTree)
  }
  onBgChoosed = (event: CustomEvent): void => {
    storage.choosedBg = Number(event.detail)
    this.setBg()
  }
  onBackToBasket = (event: CustomEvent): void => {
    this.components.draggableBasket.getBackItem(event.detail)

  }
  onGarlandCheckbox = (event: CustomEvent): void => {
    storage.garlandOptions.isActive = event.detail.checked
    event.detail.checked ?
      this.components.tree.addGarland(storage.garlandOptions.color) :
      this.components.tree.removeGarland()
  }

  onChooseGarlandColor = (event: CustomEvent): void => {

    storage.garlandOptions.color = event.detail
    if (storage.garlandOptions.isActive) {
      this.components.tree.removeGarland()
      this.components.tree.addGarland(storage.garlandOptions.color)
    }
  }

  onResetClick = (): void => {
    storage.resetTreePageOptionts()
    this.components.chooseTree.reset(storage.choosedTree)
    this.components.chooseBg.reset(storage.choosedBg)
    this.components.chooseGarlandColor.reset(1)
    this.components.tree.updata(storage.choosedTree)
    this.components.garlandCheckbox.reset()
    media.reset()
    this.components.tree.removeGarland()
    this.setBg()
  }

  initComponents(): void {
    const chooseTree: ChooseItems = new ChooseItems({
      type: 'tree',
      items: [...treeItems],
      choosedItem: storage.choosedTree
    })

    const chooseBg: ChooseItems = new ChooseItems({
      type: 'bg',
      items: [...bgItems],
      choosedItem: storage.choosedBg
    })

    const chooseGarlandColor: ChooseItems = new ChooseItems({
      type: 'color',
      items: ['multicolor', 'red', 'green', 'blue', 'yellow'],
      choosedItem: storage.garlandOptions.color
    })

    const garlandCheckbox: Checkbox = new Checkbox([{
      value: 0,
      isSelected: storage.garlandOptions.isActive
    }])

    const tree: CurrentTree = new CurrentTree({
      num: storage.choosedTree
    })

    let data: { num: string; count: string; }[]

    data = rawData.slice(0, 20).map(({ count, num }: { num: string; count: string; }) => ({
      num,
      count
    }))

    if (storage.basketItems.length) {
      data = rawData.filter(({ num }: { num: string }) => storage.basketItems.includes(num))
      data = data.map(({ count, num }: { num: string; count: string; }) => ({
        num,
        count
      }))
    }

    const draggableBasket: DraggableBasket = new DraggableBasket(data)

    const resetChoose: Button = new Button({
      title: 'Сбросить настройки'
    })

    this.components = {
      chooseTree,
      chooseBg,
      tree,
      draggableBasket,
      chooseGarlandColor,
      garlandCheckbox,
      resetChoose
    }
    super.renderComponents(this.components)
    this.initEventListeners()

    this.subElements && media.setSnowfall(this.subElements.tree)

    storage.garlandOptions.isActive && this.components.tree.addGarland(storage.garlandOptions.color)
  }

  render(): Element | null {
    super.render(template())
    this.initComponents();
    this.setBg()
    return this.element;
  }

  setBg(): void {
    if (this.subElements) {
      const src: string = `url("./assets/bg/${storage.choosedBg}.jpg")`
      this.subElements.tree.style.backgroundImage = src
    }
  }

  initEventListeners(): void {
    const { element: chooseTree }: { element: ElementType } = this.components.chooseTree;
    if (chooseTree)
      chooseTree.addEventListener('item-click', this.onTreeChoosed as unknown as EventListener);

    const { element: chooseBg }: { element: ElementType } = this.components.chooseBg;
    if (chooseBg)
      chooseBg.addEventListener('item-click', this.onBgChoosed as unknown as EventListener);

    const { element: tree }: { element: ElementType } = this.components.tree;
    if (tree)
      tree.addEventListener('back-to-basket', this.onBackToBasket as unknown as EventListener);

    const { element: garlandCheckbox }: { element: ElementType } = this.components.garlandCheckbox
    if (garlandCheckbox)
      garlandCheckbox.addEventListener('checkbox-changed', this.onGarlandCheckbox as unknown as EventListener);

    const { element: chooseGarlandColor }: { element: ElementType } = this.components.chooseGarlandColor
    if (chooseGarlandColor)
      chooseGarlandColor.addEventListener('item-click', this.onChooseGarlandColor as unknown as EventListener);

    const { element: resetChoose }: { element: ElementType } = this.components.resetChoose
    if (resetChoose)
      resetChoose.addEventListener('click', this.onResetClick as unknown as EventListener)

  }
}
