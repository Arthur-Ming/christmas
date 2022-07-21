function compare(a: Element, b: Element, type: string = 'name'): number {

  const item1: HTMLElement | null = a.querySelector(`[data-${type}]`)
  const item2: HTMLElement | null = b.querySelector(`[data-${type}]`)

  let compareA: string | undefined
  let compareB: string | undefined
  if (item1 && item2) {
    compareA = item1.dataset[type]
    compareB = item2.dataset[type]
    if (compareA && compareB)
      return compareA < compareB ? -1 : 1
  }

  return 0
}

const sorts: { [key: string | number]: (a: Element, b: Element) => number } = {
  nameUp: (a: Element, b: Element) => compare(a, b),
  nameDawn: (a: Element, b: Element) => -1 * compare(a, b),
  yearUp: (a: Element, b: Element) => compare(a, b, 'year'),
  yearDawn: (a: Element, b: Element) => -1 * compare(a, b, 'year'),
}

export default sorts