import { createElement } from "../../../utils/domHelpers";

export default function ChooseItem({
  choosedItem,
  item,
  type
}: {
  choosedItem: number | string,
  item: number | string,
  type: string
}): Element {

  const template = ` 
<div class="choose-items__item ${choosedItem === item ? 'choose-items_ch' : ''}" data-item='${item}'>
   ${type === 'color' ? `<div class="choose-items__item_${item}"></div>` :
      `<img src="./assets/${type}/${item}.jpg" alt="${item}">`} 
</div>`

  return createElement(template)
} 