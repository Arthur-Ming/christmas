export default interface StorageInterface {
  currentSortType: string
  shapesFilterOptions: { [key: string]: boolean }
  colorFilterOptions: { [key: string]: boolean }
  sizeFilterOptions: { [key: string]: boolean }
  favoriteFilterOptions: { [key: string]: boolean }
  rangeQuantityOptions: { from: number, to: number }
  rangeYearOptions: { from: number, to: number }
  basketItems: string[]
  searchInputValue: string
  choosedTree: number
  choosedBg: number
  mediaOptions: { [key: string]: boolean }
  garlandOptions: {
    color: string,
    isActive: boolean
  }

  setBasketItems({ cardNum, isPicked }: { cardNum: string, isPicked: boolean }): void

  resetTreePageOptionts(): void
  resetFiltersOptions(): void
  getLocalStorage(): Promise<void>

}