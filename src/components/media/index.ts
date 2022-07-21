import Component from "../../core/component";
import Snowfall from "../snowfall";
import storage from "../../storage";
import { SnowfallInterface, MediaInterface } from "../../interfaces";

const template = (): string => `
<div class="media">
  <div class="audio audio_mute" data-element='audio'>
    <svg class="audio__audio" viewBox="0 0 128 128">
      <use xlink:href='assets/svg/sprite.svg#audio' />
    </svg>
    <svg class="audio__mute" viewBox="0 0 128 128">
      <use xlink:href='assets/svg/sprite.svg#mute' />
    </svg>
  </div>
  <div class="snow-icon" data-element='snow'>
    <svg viewBox="0 0 64 64">
      <use xlink:href='assets/svg/sprite.svg#snow' />
    </svg>
  </div>
</div>
`;

export default class Media extends Component implements MediaInterface {

  audio: HTMLAudioElement = new Audio('assets/audio/audio.mp3');
  snowfall: SnowfallInterface | null = null

  private static instance: Media | null

  static getInstance(): Media {
    if (!this.instance) {
      this.instance = new Media();
    }
    return this.instance;
  }

  private constructor() {
    super()
  }

  onClick = (event: { target: { closest: (arg0: string) => HTMLElement; }; }): void => {

    const target: HTMLElement | null = event.target.closest('[data-element]')

    if (!target) return

    if (target.dataset.element === 'audio') {
      target.classList.toggle('audio_mute')
      this.audioToggle()
    }
    if (target.dataset.element === 'snow') {
      this.snowfallToggle()
      // this.snowfall && this.snowfall.start()
    }
  }

  onRoute = (event: CustomEvent): void => {

    if (event.detail.to === 'tree-page') {

      if (storage.mediaOptions.isAudio && !this.audio.currentTime) {
        document.addEventListener('pointerdown', this.onPointerDawn as unknown as EventListener)
      }
      // this.audio.play()
    }
  }

  onPointerDawn = (event: { target: { closest: (arg0: string) => HTMLElement; }; }): void => {
    if (!event.target.closest('.audio')) {
      /*   this.subElements &&
          this.subElements.audio.classList.remove('audio_mute') */
      this.audio.play()

    }

    document.removeEventListener('pointerdown', this.onPointerDawn as unknown as EventListener)
  }
  render(): Element | null {
    super.render(template())

    this.subElements && storage.mediaOptions.isAudio &&
      this.subElements.audio.classList.remove('audio_mute')
    /*  this.subElements &&
       this.subElements.audio.classList.add('audio_mute') */

    this.initEventListeners()
    return this.element;
  }

  audioToggle(): void {

    storage.mediaOptions.isAudio = !storage.mediaOptions.isAudio
    if (storage.mediaOptions.isAudio) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  setAudioVolume(volum: number): void {
    this.audio.volume = volum
  }

  setSnowfall(container: Element): void {
    this.snowfall = new Snowfall(container)
    storage.mediaOptions.isSnow && this.snowfall.start()
  }

  snowfallToggle(): void {
    if (!this.snowfall) return

    storage.mediaOptions.isSnow = !storage.mediaOptions.isSnow

    storage.mediaOptions.isSnow ? this.snowfall.start() : this.snowfall.stop()
  }

  reset(): void {
    this.audio.pause();
    this.audio.currentTime = 0
    this.subElements && this.subElements.audio.classList.add('audio_mute')
    this.snowfall && this.snowfall.stop()
  }

  initEventListeners(): void {
    if (this.element)
      this.element.addEventListener('click', this.onClick as unknown as EventListener)

    document.addEventListener('route', this.onRoute as unknown as EventListener)

  }
}