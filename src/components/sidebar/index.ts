import Component from "../../core/component";
import { ComponentInterface, /* SidebarInterface, */ CheckboxInterface } from "../../interfaces";
import { DropDownParams, CheckboxItemParams, DoubleSliderType } from "../../types";
import emit from "../../utils/emit";
import Dropdown from "../dropdown";
import DoubleSlider from "../double-slider";
import Checkbox from "../checkbox";
import Button from "../button";
import storage from "../../storage";
import Portal from "../../core/portal";
import dropdownOptions from "./dropdownOptions";
import shapesCheckboxData from "./shapesCheckboxData";

const template = (): string => `
<div class="sidebar__content">
  <div class="sidebar__column">
      <div class="sidebar__item sidebar__item_sort">
        <h4 class="sidebar__subtitle">Сортировать</h4>
        <div class="sidebar__item" data-element='dropdown'></div>
     </div>
     <div class="sidebar__item sidebar__item_shapes" data-element='shapes'>
          <h4 class="sidebar__subtitle">Форма</h4>
      </div>
  </div>
  <div class="sidebar__column">
      <div class="sidebar__item" data-element='sliderQuantity'>
          <h4 class="sidebar__subtitle">Количество экземпляров</h4>
      </div>
      <div class="sidebar__item" data-element='sliderYears'>
          <h4 class="sidebar__subtitle">Год приобретения</h4>
      </div>
      <div class="sidebar__item" data-element='colors'>
          <h4 class="sidebar__subtitle">Цвет</h4>
      </div>
  </div>
  <div class="sidebar__column">
      <div class="sidebar__item"  data-element='size'>
          <h4 class="sidebar__subtitle">Размер</h4>
      </div>
      <div class="sidebar__item"  data-element='favorite'>
          <h4 class="sidebar__subtitle">Только любимые</h4>
      </div>
      <div class="sidebar__item sidebar__reset" data-element='reset'></div>
  </div>
</div>
`;

const portal = Portal.getInstance()

export default class Sidebar extends Component implements ComponentInterface {

  private components!: {
    dropdown: ComponentInterface,
    sliderQuantity: CheckboxInterface,
    sliderYears: CheckboxInterface,
    shapes: CheckboxInterface,
    colors: CheckboxInterface,
    size: CheckboxInterface,
    favorite: CheckboxInterface,
    reset: ComponentInterface,
  };

  dropdownParams: DropDownParams[] = dropdownOptions.map((item: DropDownParams) => ({
    ...item,
    isSelected: item.value === storage.currentSortType
  }))

  shapesParams: CheckboxItemParams[] = Object.entries(storage.shapesFilterOptions)
    .map(([value, isSelected]: [string | number, boolean], index: number) => ({
      value,
      isSelected,
      ...shapesCheckboxData[index]
    }))

  colorsParams: CheckboxItemParams[] = Object.entries(storage.colorFilterOptions)
    .map(([value, isSelected]: [string | number, boolean]) => ({
      value,
      isSelected,
      extraClass: `checkbox_color-${value}`
    }))

  sizesParams: CheckboxItemParams[] = Object.entries(storage.sizeFilterOptions)
    .map(([value, isSelected]: [string | number, boolean]) => ({
      value,
      isSelected,
      extraClass: 'checkbox_toys checkbox_sz',
      icon: `
    <svg class="checkbox__toy-icon checkbox__toy-icon_${value}" viewBox="0 0 38 42">
      <use xlink:href='assets/svg/checkbox-sprites.svg#snowflake' />
    </svg>`
    }))

  favoriteParams: CheckboxItemParams[] = Object.entries(storage.favoriteFilterOptions)
    .map(([value, isSelected]: [string | number, boolean]) => ({
      value,
      isSelected,
    }))

  rangeQuantityOptions: DoubleSliderType = {
    min: 1,
    max: 12,
    selected: storage.rangeQuantityOptions,
    formatValue: (value: string) => value,
  }

  rangeYearOptions: DoubleSliderType = {
    min: 1940,
    max: 2021,
    selected: storage.rangeYearOptions,
    formatValue: (value: string) => value,
  }


  onWindowResize = (): void => {
    if (document.documentElement.clientWidth > 768 && this.subElements && !this.subElements.dropdown.innerHTML) {
      const dropdown: ComponentInterface | undefined = this.components.dropdown
      if (dropdown && dropdown.element) {
        this.subElements.dropdown.append(dropdown.element)
      }
    }
  }

  initComponents(): void {

    this.components = {
      dropdown: new Dropdown(this.dropdownParams, 'Выбрать'),
      sliderQuantity: new DoubleSlider(this.rangeQuantityOptions),
      sliderYears: new DoubleSlider(this.rangeYearOptions),
      shapes: new Checkbox(this.shapesParams),
      colors: new Checkbox(this.colorsParams),
      size: new Checkbox(this.sizesParams),
      favorite: new Checkbox(this.favoriteParams),
      reset: new Button({ title: 'Сброс фильтров' })
    };

    this.renderComponents(this.components);
    this.initEventListeners()
  }

  render(): Element | null {
    super.render(template())
    this.initComponents();
    this.setPortal()
    return this.element;
  }

  setPortal(): void {
    portal
      .setComponent('sidebarDropdown', this.components.dropdown)
      .setComponent('sidebarFavoriteFilter', this.components.favorite)
      .setComponent('sidebarSizesFilter', this.components.size)
      .setComponent('sidebarShapesFilter', this.components.shapes)
      .setComponent('sidebarColorsFilter', this.components.colors)
      .setComponent('sidebarSliderQuantityFilter', this.components.sliderQuantity)
      .setComponent('sidebarSliderYearsFilter', this.components.sliderYears)
  }

  resetFilters(): void {
    this.components.size.reset()
    this.components.shapes.reset()
    this.components.colors.reset()
    this.components.favorite.reset()
    this.components.sliderQuantity.reset()
    this.components.sliderYears.reset()
    emit({
      event: 'reset-filters',
      elem: this.element
    })
  }

  initEventListeners(): void {
    if (this.components.reset.element)
      this.components.reset.element.addEventListener('click', () => this.resetFilters())

    window.addEventListener('resize', this.onWindowResize as unknown as EventListener)
  }
}