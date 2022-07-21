
const sizeOptions: ReadonlyArray<{ value: number; extraClass: string; icon: string; }> = [
  {
    value: 0,
    extraClass: 'checkbox_toys checkbox_sz',
    icon: `
    <svg class="checkbox__toy-icon checkbox__toy-icon_bg" viewBox="0 0 38 42">
      <use xlink:href='assets/svg/checkbox-sprites.svg#snowflake' />
    </svg>`
  },
  {
    value: 1,
    extraClass: 'checkbox_toys checkbox_sz',
    icon: `
    <svg class="checkbox__toy-icon checkbox__toy-icon_md" viewBox="0 0 38 42">
      <use xlink:href='assets/svg/checkbox-sprites.svg#snowflake' />
    </svg>`
  },
  {
    value: 2,
    extraClass: 'checkbox_toys checkbox_sz',
    icon: `
    <svg class="checkbox__toy-icon checkbox__toy-icon_sm" viewBox="0 0 38 42">
      <use xlink:href='assets/svg/checkbox-sprites.svg#snowflake' />
    </svg>`
  },
]

export default sizeOptions