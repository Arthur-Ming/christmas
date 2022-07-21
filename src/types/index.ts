export type SubElements = {
  [key: string]: HTMLElement
} | undefined

export type SourcesData = {
  id: string
  name: string
}

export type CheckboxItemParams = {
  value: string | number
  isSelected: boolean,
  legend?: string,
  extraClass?: string,
  icon?: string
}

export type DropDownParams = {
  title: string,
  value: string,
  isSelected: boolean,
}

export type RangeSelectedType = {
  from: number,
  to: number
}

export type DoubleSliderType = {
  min: number,
  max: number,
  formatValue: Function,
  selected: RangeSelectedType
}



