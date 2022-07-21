import { AsyncComponentInterface, ComponentInterface } from '../interfaces';
import renderPage from './renderPage';

export default class Router {

  private static instance: Router | null

  static getInstance() {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  private constructor() { }

  page: AsyncComponentInterface | ComponentInterface | null = null;

  async route({ to }: { to: string }) {

    document.body.classList.add('_spinner');

    const { default: Page } = await import(`../pages/${to}/index.ts`);

    const newPage: AsyncComponentInterface | ComponentInterface = new Page();

    const element: Element | null = await newPage.render();

    document.body.classList.remove('_spinner');

    renderPage({
      from: this.page,
      to: element,
    });

    this.page = newPage;

    document.dispatchEvent(new CustomEvent('route', {
      detail: {
        to,
      },
    }));
  }
}