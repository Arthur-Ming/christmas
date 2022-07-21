import { DropDownParams } from "../../types"

const dropdownOptions: ReadonlyArray<DropDownParams> = [
  {
    value: 'nameUp',
    title: 'По названию от «А» до «Я»',
    isSelected: false,
  },
  {
    value: 'nameDawn',
    title: 'По названию от «Я» до «А»',
    isSelected: false,
  },
  {
    value: 'yearUp',
    title: 'По году приобретения в возрастающем порядке',
    isSelected: false,
  },
  {
    value: 'yearDawn',
    title: 'По году их приобретения в спадающем порядке ',
    isSelected: false,
  },
  {
    value: 'random',
    title: 'В случайном порядке',
    isSelected: true,
  },
]
export default dropdownOptions