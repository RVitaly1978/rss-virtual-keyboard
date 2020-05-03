
import Renderer from '../dom/Renderer';

import { getDescriptionsItems } from '../constants/KeyboardDescriptions';

const SHOW_DESCRIPTION = '▲ show description ▲';
const HIDE_DESCRIPTION = '▼ hide description ▼';
const BUTTON_ACTIVE = 'descriptions__button--active';
const NOTES_SHOW = 'descriptions__notes--show';
const NOTES_VISIBLE = 'descriptions__notes--visible';

class Descriptions {
  constructor() {
    this.isPressed = false;

    this.hideDescriptions = this.hideDescriptions.bind(this);
    this.showDescriptions = this.showDescriptions.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onMousedown = this.onMousedown.bind(this);

    this.showButton = Renderer.createElement('button', {
      id: 'descriptions-button',
      class: 'descriptions__button',
      children: [SHOW_DESCRIPTION],
    });

    this.notes = Renderer.createElement('div', {
      id: 'descriptions-notes',
      class: 'descriptions__notes',
      children: getDescriptionsItems(),
    });
  }

  hideDescriptions() {
    this.isPressed = !this.isPressed;

    this.notes.classList.toggle(NOTES_SHOW, false);
    this.notes.addEventListener('transitionend', () => {
      this.notes.classList.toggle(NOTES_VISIBLE, false);
    }, { once: true });

    this.showButton.classList.toggle(BUTTON_ACTIVE, false);
    this.showButton.textContent = SHOW_DESCRIPTION;
  }

  showDescriptions() {
    this.isPressed = !this.isPressed;

    this.notes.classList.toggle(NOTES_VISIBLE, true);
    this.notes.classList.toggle(NOTES_SHOW, true);

    this.showButton.classList.toggle(BUTTON_ACTIVE, true);
    this.showButton.textContent = HIDE_DESCRIPTION;
  }

  handleButtonClick() {
    if (!this.isPressed) {
      this.showDescriptions();
    } else {
      this.hideDescriptions();
    }
  }

  onMousedown(target) {
    const { id } = target;

    if (target.closest('.descriptions__notes')) {
      this.hideDescriptions();
    }

    if (id === 'descriptions-button') {
      this.handleButtonClick();
    }
  }

  render() {
    this.descriptions = Renderer.createElement('div', {
      class: 'descriptions__container',
      children: [this.notes, this.showButton],
    });

    this.descriptions.addEventListener('mousedown', (evt) => {
      const { target } = evt;
      this.onMousedown(target);
    });

    return this.descriptions;
  }
}

export default Descriptions;
