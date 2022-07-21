import Component from '../../core/component';
import { ComponentInterface } from '../../interfaces';
import { DoubleSliderType, RangeSelectedType, SubElements } from '../../types';

const template = (from: string, to: string): string => `
<div class="range-slider">
   <span data-element="from">${from}</span>
   <div data-element="inner" class="range-slider__inner">
      <span data-element="progress" class="range-slider__progress"></span>
      <span data-element="thumbLeft" class="range-slider__thumb-left"></span>
      <span data-element="thumbRight" class="range-slider__thumb-right"></span>
   </div>
   <span data-element="to">${to}</span>
</div>
`;

export default class DoubleSlider extends Component implements ComponentInterface {
   private dragging: HTMLElement | null = null
   private shiftX: number | null = null
   private min: number | null = null
   private max: number | null = null
   private selected: RangeSelectedType
   formatValue: Function

   onThumbPointerMove = (event: { preventDefault: () => void; clientX: number; }): void => {
      event.preventDefault();

      if (!this.subElements) {
         return
      }
      const { left: innerLeft, right: innerRight, width } = this.subElements.inner.getBoundingClientRect();

      if (this.dragging === this.subElements.thumbLeft && this.shiftX) {
         let newLeft: number = (event.clientX - innerLeft + this.shiftX) / width;

         if (newLeft < 0) {
            newLeft = 0;
         }
         newLeft *= 100;
         const right: number = parseFloat(this.subElements.thumbRight.style.right);

         if (newLeft + right > 100) {
            newLeft = 100 - right;
         }

         this.dragging.style.left = this.subElements.progress.style.left = newLeft + '%';
         const value: RangeSelectedType | undefined = this.getValue()
         if (value)
            this.subElements.from.textContent = this.formatValue(value.from);
      }

      if (this.dragging === this.subElements.thumbRight && this.shiftX) {
         let newRight: number = (innerRight - event.clientX - this.shiftX) / width;

         if (newRight < 0) {
            newRight = 0;
         }
         newRight *= 100;

         const left: number = parseFloat(this.subElements.thumbLeft.style.left);

         if (left + newRight > 100) {
            newRight = 100 - left;
         }
         this.dragging.style.right = this.subElements.progress.style.right = newRight + '%';
         const value: RangeSelectedType | undefined = this.getValue()
         if (value)
            this.subElements.to.textContent = this.formatValue(value.to);
      }
   };

   onThumbPointerDown(event: { target: HTMLElement; preventDefault: () => void; clientX: number; }) {

      const thumbElem: HTMLElement = event.target;

      event.preventDefault();

      const { left, right }: DOMRect = thumbElem.getBoundingClientRect();

      if (this.subElements && thumbElem === this.subElements.thumbLeft) {
         this.shiftX = right - event.clientX;
      } else {
         this.shiftX = left - event.clientX;
      }

      this.dragging = thumbElem;
      if (this.element)
         this.element.classList.add('range-slider_dragging');

      document.addEventListener('pointermove', this.onThumbPointerMove);
      document.addEventListener('pointerup', this.onThumbPointerUp);
   }

   onThumbPointerUp = (): void => {
      if (!this.element) return
      this.element.classList.remove('range-slider_dragging');

      document.removeEventListener('pointermove', this.onThumbPointerMove);
      document.removeEventListener('pointerup', this.onThumbPointerUp);

      this.element.dispatchEvent(new CustomEvent('range-select', {
         detail: this.getValue(),
         bubbles: true
      }));
   };

   constructor(params: DoubleSliderType = {
      min: 100,
      max: 200,
      formatValue: (value: string) => '$' + value,
      selected: {
         from: 100,
         to: 200
      }
   }) {
      super()
      this.min = params.min;
      this.max = params.max;
      this.formatValue = params.formatValue;
      this.selected = params.selected;
   }

   render(): Element | null {
      super.render(template(this.formatValue(this.selected.from), this.formatValue(this.selected.to)))
      this.initEventListeners();
      this.update();
      return this.element
   }

   initEventListeners(): void {

      if (!this.subElements) return

      const { thumbLeft, thumbRight }: SubElements = this.subElements;

      thumbLeft.addEventListener('pointerdown', event => this.onThumbPointerDown(event as unknown as { target: HTMLElement; preventDefault: () => void; clientX: number; }));
      thumbRight.addEventListener('pointerdown', event => this.onThumbPointerDown(event as unknown as { target: HTMLElement; preventDefault: () => void; clientX: number; }));
   }


   update(): void {
      if (!this.max || !this.min || !this.subElements) return

      const rangeTotal: number = this.max - this.min;
      const left: string = Math.floor((this.selected.from - this.min) / rangeTotal * 100) + '%';
      const right: string = Math.floor((this.max - this.selected.to) / rangeTotal * 100) + '%';

      this.subElements.from.textContent = this.formatValue(this.selected.from)
      this.subElements.to.textContent = this.formatValue(this.selected.to)

      this.subElements.progress.style.left = left;
      this.subElements.progress.style.right = right;

      this.subElements.thumbLeft.style.left = left;
      this.subElements.thumbRight.style.right = right;
   }

   reset(): void {
      this.selected.from = Number(this.min)
      this.selected.to = Number(this.max)
      this.update()
   }

   getValue(): RangeSelectedType | undefined {
      if (!this.max || !this.min || !this.subElements) return

      const rangeTotal = this.max - this.min;
      const { left } = this.subElements.thumbLeft.style;
      const { right } = this.subElements.thumbRight.style;

      const from = Math.round(this.min + parseFloat(left) * 0.01 * rangeTotal);
      const to = Math.round(this.max - parseFloat(right) * 0.01 * rangeTotal);

      return { from, to };
   }

   destroy(): void {
      super.destroy()
      document.removeEventListener('pointermove', this.onThumbPointerMove);
      document.removeEventListener('pointerup', this.onThumbPointerUp);
   }
}