import Component from "../../core/component";
import { ComponentInterface } from "../../interfaces";

const template = (): string => `
<div class="footer__content wrapper__box">
  <a class="rss-logo" href="https://rs.school/js/">
      <img src="assets/img/rs_school_js _w.svg" alt="rss-logo">
  </a>
  <a href="https://github.com/Arthur-Ming" class="author">Arthur-Ming</a>
</div>
`;

export default class Footer extends Component implements ComponentInterface {

  render(): Element | null {
    super.render(template())
    return this.element;
  }
}