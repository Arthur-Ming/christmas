import defaultOptions from "./defaultOptions";
import StorageInterface from "./storageInterface";

class Storage implements StorageInterface {

  currentSortType: string = defaultOptions.currentSortType
  shapesFilterOptions: { [key: string]: boolean } = { ...defaultOptions.shapesFilterOptions }
  colorFilterOptions: { [key: string]: boolean } = { ...defaultOptions.colorFilterOptions }
  sizeFilterOptions: { [key: string]: boolean } = { ...defaultOptions.sizeFilterOptions }
  favoriteFilterOptions: { [key: string]: boolean } = { ...defaultOptions.favoriteFilterOptions }
  rangeQuantityOptions: { from: number, to: number } = { ...defaultOptions.rangeQuantityOptions }
  rangeYearOptions: { from: number, to: number } = { ...defaultOptions.rangeYearOptions }
  basketItems: string[] = defaultOptions.basketItems
  searchInputValue: string = defaultOptions.searchInputValue
  choosedTree: number = defaultOptions.choosedTree
  choosedBg: number = defaultOptions.choosedBg
  mediaOptions: { [key: string]: boolean } = { ...defaultOptions.mediaOptions }
  garlandOptions: {
    color: string,
    isActive: boolean
  } = { ...defaultOptions.garlandOptions }


  private static instance: Storage | null

  static getInstance() {
    if (!this.instance) {
      this.instance = new Storage();
    }
    return this.instance;
  }

  private constructor() {
    this.initEventListeners();
  }

  setLocalStorage = () => {
    localStorage.setItem('christmasTaskLocalStorage', JSON.stringify({
      currentSortType: this.currentSortType,
      shapesFilterOptions: this.shapesFilterOptions,
      colorFilterOptions: this.colorFilterOptions,
      sizeFilterOptions: this.sizeFilterOptions,
      favoriteFilterOptions: this.favoriteFilterOptions,
      rangeQuantityOptions: this.rangeQuantityOptions,
      rangeYearOptions: this.rangeYearOptions,
      basketItems: this.basketItems,
      searchInputValue: this.searchInputValue,
      mediaOptions: this.mediaOptions,
      choosedTree: this.choosedTree,
      choosedBg: this.choosedBg,
      garlandOptions: this.garlandOptions
    }));
  };


  setBasketItems({ cardNum, isPicked }: { cardNum: string, isPicked: boolean }): void {
    if (isPicked) {
      this.basketItems.push(cardNum)
    } else {
      this.basketItems = this.basketItems.filter((num) => num !== cardNum)
    }
  }

  resetFiltersOptions() {

    this.shapesFilterOptions = { ...defaultOptions.shapesFilterOptions }
    this.colorFilterOptions = { ...defaultOptions.colorFilterOptions }
    this.sizeFilterOptions = { ...defaultOptions.sizeFilterOptions }
    this.favoriteFilterOptions = { ...defaultOptions.favoriteFilterOptions }
    this.rangeQuantityOptions = { ...defaultOptions.rangeQuantityOptions }
    this.rangeYearOptions = { ...defaultOptions.rangeYearOptions }
  }

  resetTreePageOptionts() {
    this.choosedTree = defaultOptions.choosedTree
    this.choosedBg = defaultOptions.choosedBg
    this.mediaOptions = { ...defaultOptions.mediaOptions }
    this.garlandOptions = { ...defaultOptions.garlandOptions }
  }

  async getLocalStorage() {

    const localStorageItem: string | null = localStorage.getItem('christmasTaskLocalStorage')

    if (!localStorageItem) return

    const christmasTaskLocalStorage = await JSON.parse(localStorageItem);

    if (christmasTaskLocalStorage.currentSortType)
      this.currentSortType = christmasTaskLocalStorage.currentSortType;

    if (christmasTaskLocalStorage.shapesFilterOptions)
      this.shapesFilterOptions = christmasTaskLocalStorage.shapesFilterOptions

    if (christmasTaskLocalStorage.colorFilterOptions)
      this.colorFilterOptions = christmasTaskLocalStorage.colorFilterOptions

    if (christmasTaskLocalStorage.sizeFilterOptions)
      this.sizeFilterOptions = christmasTaskLocalStorage.sizeFilterOptions

    if (christmasTaskLocalStorage.favoriteFilterOptions)
      this.favoriteFilterOptions = christmasTaskLocalStorage.favoriteFilterOptions

    if (christmasTaskLocalStorage.rangeQuantityOptions)
      this.rangeQuantityOptions = christmasTaskLocalStorage.rangeQuantityOptions

    if (christmasTaskLocalStorage.rangeYearOptions)
      this.rangeYearOptions = christmasTaskLocalStorage.rangeYearOptions

    if (christmasTaskLocalStorage.basketItems)
      this.basketItems = christmasTaskLocalStorage.basketItems

    if (christmasTaskLocalStorage.searchInputValue)
      this.searchInputValue = christmasTaskLocalStorage.searchInputValue

    if (christmasTaskLocalStorage.mediaOptions)
      this.mediaOptions = christmasTaskLocalStorage.mediaOptions

    if (christmasTaskLocalStorage.garlandOptions)
      this.garlandOptions = christmasTaskLocalStorage.garlandOptions

    if (christmasTaskLocalStorage.choosedTree)
      this.choosedTree = christmasTaskLocalStorage.choosedTree

    if (christmasTaskLocalStorage.choosedBg)
      this.choosedBg = christmasTaskLocalStorage.choosedBg

  }

  initEventListeners() {
    window.addEventListener('beforeunload', this.setLocalStorage);
  }
}

const storage = Storage.getInstance()

export default storage