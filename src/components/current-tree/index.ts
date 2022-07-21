import Component from "../../core/component";
import { TreeInterface } from "../../interfaces";
import emit from "../../utils/emit";
import Dragging from "../dragging";
import Garland from "../garland";
import maps from "./maps";

const template = (num: number): string =>  `
<div class="tree__content">
  <div class="tree__img" data-element='img'>
     <img src="./assets/tree/${num}.jpg" alt="" usemap="#image-map">
  </div>
  <map class="tree__map" name="image-map" data-target-tree>
     <area coords=${maps[num - 1]} shape="poly" data-element='map'/>
  </map>
</div>
`;

type CurrentTreeParams = {
  num: number,
}

export default class CurrentTree extends Component implements TreeInterface {

  private params: CurrentTreeParams
  garland: Garland | null = null

  onPointerUp = (event: CustomEvent): void => {
    emit({
      event: 'back-to-basket',
      elem: this.element,
      payload: event.detail
    })
  }

  constructor(params: CurrentTreeParams) {
    super()
    this.params = params
  }

  render(): Element | null {

    super.render(template(this.params.num))

    new Dragging({
      elem: this.element,
      outerContainer: this.element
    })

    this.initEventListeners()
    return this.element;
  }

  updata(newNum: number): void {
    if (this.element) {
      const img: HTMLImageElement = document.createElement('img');
      img.src = `./assets/tree/${newNum}.jpg`;
      img.setAttribute('usemap', '#image-map')
      img.onload = () => {
        if (this.subElements) {
          this.subElements.img.innerHTML = ''
          this.subElements.img.append(img)
          this.subElements.map.setAttribute('coords', maps[newNum - 1])
        }
      }
    }
  }

  addGarland(color: string): void {
    this.garland = new Garland({ color: color })
    if (this.element) {
      const garlandElement: Element | null = this.garland.render()
      garlandElement && this.element.append(garlandElement)
    }
  }

  removeGarland(): void {
    if (this.garland) {
      this.garland.destroy()
    }
  }

  initEventListeners(): void {
    if (this.element) {
      this.element.addEventListener('pointer-up', this.onPointerUp as unknown as EventListener)
    }
  }
}