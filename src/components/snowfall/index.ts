import { SnowfallInterface } from "../../interfaces"

export default class Snowfall implements SnowfallInterface {

  container: Element | null = null
  private timerId: NodeJS.Timer | null = null

  constructor(container: Element) {
    this.container = container
  }

  createSnowFlake = (): void => {

    const snow_flake: HTMLElement = document.createElement('i');
    snow_flake.classList.add('fas');
    snow_flake.classList.add('fa-snowflake');
    snow_flake.style.left = Math.random() * window.innerWidth + 'px';
    snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
    snow_flake.style.opacity = String(Math.random());
    const side: string = Math.random() * 10 + 10 + 'px';
    snow_flake.style.width = side;
    snow_flake.style.height = side;

    this.container && this.container.append(snow_flake);

    setTimeout(() => {
      snow_flake.remove();
    }, 5000)
  }

  start(): void {
    this.timerId = setInterval(this.createSnowFlake, 100)
  }
  stop(): void {
    this.timerId && clearTimeout(this.timerId);
  }
}