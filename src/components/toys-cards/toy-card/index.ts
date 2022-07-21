import { createElement } from "../../../utils/domHelpers";
import { Card } from "../../../interfaces";

export default function ToyCard(card: Card): Element {

  const { name, num, count, year, shape, color, size, favorite, isPicked } = card

  return createElement(`
<div class="toy-card toys__card ${isPicked ? 'toy-card_picked' : ''}" data-num='${num}'>
  <div class="toy-card__name" data-name='${name}'>${name}</div>
  <div class="toy-card__icon">
    <img src="./assets/toys/${num}.png" alt="${name}">
  </div>
  <div class="toy-card__text">
    <div class="toy-card__count">Количество: ${count}</div>
    <div class="toy-card__year" data-year='${year}'>Год покупки: ${year} год</div>
    <div class="toy-card__shape">Форма игрушки: ${shape}</div>
    <div class="toy-card__color">Цвет игрушки: ${color}</div>
    <div class="toy-card__size">Размер игрушки: ${size}</div>
    <div class="toy-card__favorite">Любимая: ${favorite ? 'Да' : 'Нет'}</div>
  </div>
</div>
`)
}