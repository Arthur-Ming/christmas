import { createElement } from "../../../utils/domHelpers"
import { DraggableBasketParams } from ".."

const DraggableItem = ({ num, count }: DraggableBasketParams): Element =>
  createElement(` 
<div class="draggable-basket__item" data-element='${num}'>
  <div class="draggable-basket__img" data-grab-handle data-num='${num}'>
    <img src="./assets/toys/${num}.png" alt="">
  </div>
  <div class="draggable-basket__amount">
    <span data-count>${count}</span>
  </div>
</div>`)

export default DraggableItem