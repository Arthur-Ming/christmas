
type defaultOptionsType = {
  currentSortType: string,
  shapesFilterOptions: { [key: string]: boolean },
  colorFilterOptions: { [key: string]: boolean },
  sizeFilterOptions: { [key: string]: boolean },
  favoriteFilterOptions: { [key: string]: boolean },
  rangeQuantityOptions: {
    from: number,
    to: number
  },
  rangeYearOptions: {
    from: number,
    to: number
  },
  basketItems: string[],
  searchInputValue: string,
  choosedTree: number,
  choosedBg: number,
  mediaOptions: { [key: string]: boolean },
  garlandOptions: {
    color: string,
    isActive: boolean
  }
}

const defaultOptions: Readonly<defaultOptionsType> = {
  currentSortType: 'random',
  shapesFilterOptions: {
    bell: false,
    ball: false,
    pine: false,
    star: false,
    flake: false,
    bird: false
  },
  colorFilterOptions: {
    white: false,
    yellow: false,
    red: false,
    blue: false,
    green: false
  },

  sizeFilterOptions: {
    big: false,
    middle: false,
    small: false
  },

  favoriteFilterOptions: {
    isFavorite: false
  },

  rangeQuantityOptions: {
    from: 1,
    to: 12,
  },

  rangeYearOptions: {
    from: 1940,
    to: 2021,
  },

  basketItems: [],
  searchInputValue: '',
  choosedTree: 1,
  choosedBg: 1,

  mediaOptions: {
    isSnow: false,
    isAudio: false
  },
  garlandOptions: {
    color: 'multicolor',
    isActive: false
  }

}

export default defaultOptions