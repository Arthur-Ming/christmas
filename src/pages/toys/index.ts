import Component from "../../core/component";
import Sidebar from "../../components/sidebar";
import ToysCards from "../../components/toys-cards";
import Basket from "../../components/basket";
import Notification from "../../components/notification";
import storage from "../../storage";
import Portal from "../../core/portal";
import FilterButton from "../../components/filter-button";
import Search from "../../components/search";
import { ComponentInterface, AsyncComponentInterface } from "../../interfaces";
import { ToysCardsInterface, /* SidebarInterface, */ Card, RawCard } from "../../interfaces";
import cacheImg from "../../utils/cacheImg";
import rawData from "../../data";
import filterAll from "./filters";

const template = (): string => `
<div class="toys-page wrapper__box">
  <aside class="sidebar" data-element='sidebar'></aside>
  <div class="toys" data-element='toysCards'></div>
</div>
`;


const basket = Basket.getInstance()
const filterButton = FilterButton.instance()
const search = Search.getInstance()
const portal = Portal.getInstance()


export default class Toys extends Component implements AsyncComponentInterface {

  isBasketFilled: boolean = false
  data: Card[] = rawData.map((item: RawCard) => ({
    ...item,
    isPicked: storage.basketItems.includes(item.num)
  }))

  private components!: {
    sidebar: ComponentInterface,
    toysCards: ToysCardsInterface
  };

  onFilterButtonClick = () => {
    if (this.subElements)
      this.subElements.sidebar.classList.toggle('sidebar_show')
  }

  onWindowResize = () => {
    if (this.subElements)
      if (document.documentElement.clientWidth > 768) {
        this.subElements.sidebar.classList.remove('sidebar_show')
      }
  }

  onCardPicked = (event: CustomEvent) => {

    basket.setItem(event.detail)
    const elem = this.data.find(({ num }) => num === event.detail.cardNum)
    if (elem)
      elem.isPicked = storage.basketItems.includes(event.detail.cardNum)
  }

  onSearchInput = (event: { target: { value: string }; }) => {

    storage.searchInputValue = event.target.value
    this.filter()
  }

  onBasketFilled = () => {

    if (this.isBasketFilled) {
      const notification = new Notification({
        message: 'В корзине нет места!',
        duration: 6000
      });
      notification.show();
    }
  }

  onLastSaved = () => {

    this.onBasketFilled()
    this.isBasketFilled = true
    this.components.toysCards.shouldPick(false)
  }

  onItemSaved = () => {

    this.components.toysCards.shouldPick(true)
    this.isBasketFilled = false

  }

  onSortTypeSelected = (event: CustomEvent) => {
    storage.currentSortType = event.detail
    this.components.toysCards.sort(event.detail)
  }

  onOnlyFavoriteChanged = (event: { detail: { value: string, checked: boolean }; }) => {

    storage.favoriteFilterOptions[event.detail.value] = event.detail.checked
    this.filter()

  }
  onSizeSelected = (event: { detail: { value: string, checked: boolean }; }) => {

    storage.sizeFilterOptions[event.detail.value] = event.detail.checked
    this.filter()

  }
  onShapeSelected = (event: { detail: { value: string, checked: boolean }; }) => {

    storage.shapesFilterOptions[event.detail.value] = event.detail.checked
    this.filter()

  }
  onColorSelected = (event: { detail: { value: string, checked: boolean }; }) => {

    storage.colorFilterOptions[event.detail.value] = event.detail.checked
    this.filter()

  }

  onRangeCountSelected = (event: CustomEvent) => {

    storage.rangeQuantityOptions = event.detail
    this.filter()
  }

  onRangeYearSelected = (event: CustomEvent) => {

    storage.rangeYearOptions = event.detail
    this.filter()
  }

  onFiltersReset = () => {
    storage.resetFiltersOptions()
    this.filter()
  }


  async initComponents() {

    const srcs = this.data.map(({ num }) => `./assets/toys/${num}.png`);
    await cacheImg(srcs)

    this.components = {
      sidebar: new Sidebar(),
      toysCards: new ToysCards(filterAll(this.data))
    }

    if (storage.basketItems.length >= 20) {
      this.onLastSaved()
    }

    super.renderComponents(this.components)

    this.components.toysCards.sort(storage.currentSortType)

    /* this.sidebarFormComponents = this.components.sidebar.getFormComponents() */

    //console.log(portal.getComponent('sidebarDropdown'))

    this.initEventListeners()
  }

  async render() {
    super.render(template())
    await this.initComponents();
    return this.element;
  }

  filter(): void {
    const newCards = filterAll(this.data)
    if (!newCards.length) {
      const notification = new Notification({
        message: 'Извините, совпадений не обнаружено',
        duration: 6000
      });
      notification.show();
    }

    this.components.toysCards.update(newCards)
  }

  initEventListeners() {
    const { element: toysCards } = this.components.toysCards;
    if (toysCards)
      toysCards.addEventListener('card-picked', this.onCardPicked as unknown as EventListener);

    if (basket.element) {
      basket.element.addEventListener('item-saved', this.onItemSaved as unknown as EventListener);
      basket.element.addEventListener('last-saved', this.onLastSaved as unknown as EventListener);
      basket.element.addEventListener('basket-filled', this.onBasketFilled as unknown as EventListener);
    }

    const sidebarDropdown = portal.getComponent('sidebarDropdown')
    if (sidebarDropdown && sidebarDropdown.element) {
      sidebarDropdown.element.addEventListener('option-selected', this.onSortTypeSelected as unknown as EventListener);
    }

    const sidebarFavoriteFilter = portal.getComponent('sidebarFavoriteFilter')
    if (sidebarFavoriteFilter && sidebarFavoriteFilter.element) {
      sidebarFavoriteFilter.element.addEventListener('checkbox-changed', this.onOnlyFavoriteChanged as unknown as EventListener);
    }

    const sidebarSizesFilter = portal.getComponent('sidebarSizesFilter')
    if (sidebarSizesFilter && sidebarSizesFilter.element) {
      sidebarSizesFilter.element.addEventListener('checkbox-changed', this.onSizeSelected as unknown as EventListener);
    }

    const sidebarShapesFilter = portal.getComponent('sidebarShapesFilter')
    if (sidebarShapesFilter && sidebarShapesFilter.element) {
      sidebarShapesFilter.element.addEventListener('checkbox-changed', this.onShapeSelected as unknown as EventListener);
    }

    const sidebarColorsFilter = portal.getComponent('sidebarColorsFilter')
    if (sidebarColorsFilter && sidebarColorsFilter.element) {
      sidebarColorsFilter.element.addEventListener('checkbox-changed', this.onColorSelected as unknown as EventListener);
    }

    const sidebarSliderQuantityFilter = portal.getComponent('sidebarSliderQuantityFilter')
    if (sidebarSliderQuantityFilter && sidebarSliderQuantityFilter.element) {
      sidebarSliderQuantityFilter.element.addEventListener('range-select', this.onRangeCountSelected as unknown as EventListener);
    }

    const sidebarSliderYearsFilter = portal.getComponent('sidebarSliderYearsFilter')
    if (sidebarSliderYearsFilter && sidebarSliderYearsFilter.element) {
      sidebarSliderYearsFilter.element.addEventListener('range-select', this.onRangeYearSelected as unknown as EventListener);
    }

    if (filterButton.element)
      filterButton.element.addEventListener('click', this.onFilterButtonClick as unknown as EventListener)

    if (search.element)
      search.element.addEventListener('input', this.onSearchInput as unknown as EventListener)

    if (this.components.sidebar.element)
      this.components.sidebar.element.addEventListener('reset-filters', this.onFiltersReset as unknown as EventListener)

    window.addEventListener('resize', this.onWindowResize as unknown as EventListener)
  }
}
