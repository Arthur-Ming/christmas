type CustomEventParams = {
  event: string,
  elem: Element | null,
  payload?: string | object | Element | null
}

export default function (params: CustomEventParams): void {
  if (params.elem)
    params.elem.dispatchEvent(new CustomEvent(params.event, { detail: params.payload }));
}