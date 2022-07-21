import emit from "../../utils/emit";

export default class Dragging {

  element: Element | null
  private parent: Element | null
  private movingItem: HTMLElement | null = null
  private shiftX: number = 0
  private shiftY: number = 0
  private droppableBelow: Element | null = null

  onMoveElem = (event: {
    target: { closest: Function },
    preventDefault: Function,
    clientX: number,
    clientY: number
  }): void => {
    event.preventDefault();
    const target: HTMLElement | null = event.target.closest('[data-grab-handle]');

    if (target) {

      this.movingItem = target

      const hightOfMovingItem = target.offsetHeight;
      const widthOfMovingItem = target.offsetWidth;

      this.shiftX = event.clientX - target.getBoundingClientRect().left;
      this.shiftY = event.clientY - target.getBoundingClientRect().top;

      target.style.height = hightOfMovingItem + 'px'
      target.style.width = widthOfMovingItem + 'px'

      emit({
        elem: this.element,
        event: 'move-elem',
        payload: this.movingItem
      })

      target.classList.add('item_dragging')

      target.parentNode && target.parentNode.append(this.movingItem)

      this.moveAt(event);

      document.addEventListener('pointermove', this.onMouseMove);
      document.addEventListener('pointerup', this.onPointerUp);
    }
  }

  onPointerUp = (event: { clientX: number; clientY: number; }): void => {

    if (!this.movingItem) return

    this.movingItem.classList.add('hide');

    const elemBelow: Element | null = document.elementFromPoint(event.clientX, event.clientY);

    this.movingItem.classList.remove('hide')

    if (elemBelow)
      this.droppableBelow = elemBelow.closest('[data-target-tree]');

    if (!this.droppableBelow) {

      if (this.parent)
        emit({
          elem: this.element,
          event: 'pointer-up',
          payload: this.movingItem.dataset.num
        })

      this.movingItem.remove()

    } else {

      const target: HTMLElement | null = this.droppableBelow.closest('.tree__content')
      if (!target) return

      const parentShiftLeft: number = this.parent ? this.parent.getBoundingClientRect().left : 0
      const parentShiftTop: number = this.parent ? this.parent.getBoundingClientRect().top : 0

      this.movingItem.style.left = parseInt(this.movingItem.style.left) + parentShiftLeft - target.getBoundingClientRect().left + 'px'
      this.movingItem.style.top = parseInt(this.movingItem.style.top) - target.getBoundingClientRect().top + parentShiftTop + 'px'
      this.droppableBelow.append(this.movingItem)
      this.movingItem.classList.remove('item_dragging')

      if (!this.parent)
        emit({
          elem: this.element,
          event: 'pointer-up',
          payload: this.movingItem.dataset.num
        })

      this.droppableBelow = null
    }

    document.removeEventListener('pointerup', this.onPointerUp);
    document.removeEventListener('pointermove', this.onMouseMove);
    document.removeEventListener('pointermove', this.moveAt);

  }

  onMouseMove = (event: { clientX: number; clientY: number; }): void => {

    this.moveAt(event);

    if (!this.movingItem) return

    this.movingItem.classList.add('hide');

    const elemBelow: Element | null = document.elementFromPoint(event.clientX, event.clientY);

    this.movingItem.classList.remove('hide')

    if (elemBelow)
      this.droppableBelow = elemBelow.closest('[data-target-tree]');

    if (this.droppableBelow)
      this.movingItem.classList.remove('item_drag')
    else {
      this.movingItem.classList.add('item_drag')
    }

  }

  moveAt = (event: { clientX: number; clientY: number; }): void => {

    if (event.clientY - this.shiftY < 0) {
      window.scrollBy(0, -10)
    }
    if (event.clientY + this.shiftY > document.documentElement.clientHeight) {

      window.scrollBy(0, 10)
    }

    const parentShiftLeft: number = this.parent ? this.parent.getBoundingClientRect().left : 0
    const parentShiftTop: number = this.parent ? this.parent.getBoundingClientRect().top : 0

    if (!this.movingItem) return

    this.movingItem.style.left = event.clientX - this.shiftX - parentShiftLeft + 'px';
    this.movingItem.style.top = event.clientY - this.shiftY - parentShiftTop + 'px';

  }

  constructor({
    elem,
    outerContainer = null
  }: { elem: Element | null, outerContainer?: Element | null }) {

    this.parent = outerContainer
    this.element = elem
    this.initEventListeners()
  }

  initEventListeners(): void {
    if (this.element)
      this.element.addEventListener('pointerdown', this.onMoveElem as unknown as EventListener)
  }
}
