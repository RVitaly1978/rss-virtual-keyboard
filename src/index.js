import './styles/index.scss';

import App from './js/App';
import Renderer from './js/dom/Renderer';

document.addEventListener('DOMContentLoaded', () => {
  const root = Renderer.createElement('div', {
    id: 'app',
    class: 'app',
  });

  const AppRenderer = new Renderer(root);
  AppRenderer.render(App);

  document.body.append(root);
}, false);
