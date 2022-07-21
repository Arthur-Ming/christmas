import Component from "../../core/component";
import { ComponentInterface } from "../../interfaces";
import template from "./template";

type GarlandParams = {
  color: string,
}

export default class Garland extends Component implements ComponentInterface {

  private params: GarlandParams

  constructor(params: GarlandParams) {

    super()
    this.params = params

  }

  render(): Element | null {
    super.render(template(this.params.color))
    return this.element;
  }
}



