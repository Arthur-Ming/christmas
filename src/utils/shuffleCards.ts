interface FlexItemInfo {
  element: Element
  x: number
  y: number
  width: number
  height: number
}

export default function shuffleCards(container: Element, newItems: Element[]): void {
  const oldFlexItemsInfo = getFlexItemsInfo(container)

  let newFlexItemsInfo: FlexItemInfo[]
  if (container) {
    container.append(...newItems)
    newFlexItemsInfo = getFlexItemsInfo(container)
    aminateFlexItems(oldFlexItemsInfo, newFlexItemsInfo)
  }
}

function getFlexItemsInfo(container: Element): FlexItemInfo[] {
  return Array.from(container.children).map((item: Element) => {
    const rect: DOMRect = item.getBoundingClientRect()
    return {
      element: item,
      x: rect.left,
      y: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top,
    }
  })
}

function aminateFlexItems(
  oldFlexItemsInfo: FlexItemInfo[],
  newFlexItemsInfo: FlexItemInfo[]
): void {

  newFlexItemsInfo.forEach((newFlexItemInfo: FlexItemInfo) => {

    const oldFlexItemInfo: FlexItemInfo | undefined = oldFlexItemsInfo.find(
      (itemInfo) => itemInfo.element === newFlexItemInfo.element
    )

    let translateX: number = 0
    let translateY: number = 0
    let scaleX: number = 1
    let scaleY: number = 1
    if (oldFlexItemInfo) {
      translateX = oldFlexItemInfo.x - newFlexItemInfo.x
      translateY = oldFlexItemInfo.y - newFlexItemInfo.y
      scaleX = oldFlexItemInfo.width / newFlexItemInfo.width
      scaleY = oldFlexItemInfo.height / newFlexItemInfo.height
    }
    if (isNaN(scaleX)) scaleX = 1
    if (isNaN(scaleY)) scaleY = 1

    newFlexItemInfo.element.animate(
      [
        {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
        },
        { transform: 'none' },
      ],
      {
        duration: 800,
        easing: 'ease-out',
      }
    )
  })
}
