
import Renderer from '../dom/Renderer';

import {
  KeyboardLayout,
  KeyClassName,
} from '../constants/KeyboardLayout';

import {
  getKeyboardKeys,
  getKeyContent,
  getButton,
} from '../utils/keyboardUtils';

class Keyboard {
  constructor({ state }) {
    this.state = { ...state };

    this.changeCase = this.changeCase.bind(this);
    this.toggleActiveClass = this.toggleActiveClass.bind(this);
    this.getButtonById = this.getButtonById.bind(this);

    this.keyboardKeys = getKeyboardKeys({
      state: this.state,
    });

    this.keyboard = Renderer.createElement('div', {
      id: 'keyboard',
      class: 'keyboard',
      children: [...this.keyboardKeys],
    });
  }

  changeCase(state) {
    this.keyboardKeys.forEach((key) => {
      const button = key;

      const keyContent = getKeyContent({
        state,
        button,
      });

      button.textContent = keyContent;
    });
  }

  toggleActiveClass(id, isTrue) {
    const { active } = KeyClassName;
    const key = getButton(this.keyboardKeys, id);

    key.classList.toggle(active, isTrue);
  }

  getButtonById(id) {
    return getButton(this.keyboardKeys, id);
  }

  render() {
    if (this.state.isCapsLock) {
      const CAPSLOCK = KeyboardLayout.EN.CapsLock.type;
      this.toggleActiveClass(CAPSLOCK, true);
    }

    return this.keyboard;
  }
}

export default Keyboard;
