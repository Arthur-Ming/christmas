import storage from "../../storage";
import { Card } from "../../interfaces";

type FilterParamsType = {
  [key: string | number]: boolean
}

type Types = {
  [key: string]: string
}

const sizeTypes: Readonly<Types> = {
  big: 'большой',
  middle: 'средний',
  small: "малый"
}
const shapeTypes: Readonly<Types> = {
  bell: 'колокольчик',
  ball: 'шар',
  pine: 'шишка',
  star: 'звезда',
  flake: 'снежинка',
  bird: 'фигурка'
}

const colorTypes: Readonly<Types> = {
  white: 'белый',
  yellow: 'желтый',
  red: 'красный',
  blue: 'синий',
  green: 'зелёный'
}

function megaFilter(filterParams: FilterParamsType, item: string | boolean, itemTypes: { [key: string]: string }): boolean {

  if (!Object.values(filterParams).some((item) => item)) return true

  return Object.entries(filterParams)
    .some(([key, value]) => value ? itemTypes[key] === item : false)
}

function rangeFilter(from: number, to: number, count: string): boolean {

  const num = Number(count)
  return from <= num && num <= to
}

function onlyFavoriteFilter(filterParamsFavorite: FilterParamsType, favorite: boolean): boolean {
  return filterParamsFavorite["isFavorite"] ? favorite === filterParamsFavorite["isFavorite"] : true
}

function searchFilter(item: string, input: string): boolean {
  return item.toLowerCase().includes(input.toLowerCase())
}

export default function filterAll(data: Card[]): Card[] {
  return data.filter(({ size, favorite, shape, color, count, year, name }) =>
    searchFilter(name, storage.searchInputValue) &&
    (onlyFavoriteFilter(storage.favoriteFilterOptions, favorite)) &&
    (megaFilter(storage.sizeFilterOptions, size, sizeTypes)) &&
    (megaFilter(storage.shapesFilterOptions, shape, shapeTypes)) &&
    (megaFilter(storage.colorFilterOptions, color, colorTypes)) &&
    (rangeFilter(storage.rangeQuantityOptions.from, storage.rangeQuantityOptions.to, count)) &&
    (rangeFilter(storage.rangeYearOptions.from, storage.rangeYearOptions.to, year))
  )
}