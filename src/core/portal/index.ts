import { ComponentInterface, PortalInterface } from "../../interfaces";

export default class Portal implements PortalInterface {

  private static instance: Portal | null
  private components: Map<string, ComponentInterface> = new Map()

  static getInstance(): Portal {
    if (!this.instance) {
      this.instance = new Portal();
    }
    return this.instance;
  }

  private constructor() { }

  getComponent(name: string): ComponentInterface | undefined {

    return this.components.get(name)
  }

  setComponent(name: string, instance: ComponentInterface): PortalInterface {
    this.components.set(name, instance)
    return this
  }
}