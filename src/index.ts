import './scss/app.scss';
import App from './App';

const app = new App()


const root: HTMLElement | null = document.getElementById('app')

if (root) {
  const element = app.render()
  element && root.append(element)
}

