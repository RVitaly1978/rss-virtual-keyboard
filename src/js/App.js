
import Renderer from './dom/Renderer';

import State from './components/State';
import Keyboard from './components/Keyboard';
import Input from './components/Input';
import Descriptions from './components/Descriptions';
import KeyboardInitState from './constants/KeyboardInitState';

import {
  KeyboardLayout,
  keysToChangeLang,
  isKeyInKeyboard,
  stickingKeys,
} from './constants/KeyboardLayout';
import { getNextLanguage } from './constants/KeyboardLanguages';

const CAPS_LOCK = KeyboardLayout.EN.CapsLock.type;
const SHIFT_LEFT = KeyboardLayout.EN.ShiftLeft.type;
const SHIFT_RIGHT = KeyboardLayout.EN.ShiftRight.type;
const CTRL_LEFT = KeyboardLayout.EN.ControlLeft.type;
const CTRL_RIGHT = KeyboardLayout.EN.ControlRight.type;
const ALT_LEFT = KeyboardLayout.EN.AltLeft.type;
const ALT_RIGHT = KeyboardLayout.EN.AltRight.type;
const META_LEFT = KeyboardLayout.EN.MetaLeft.type;
const ARROW_LEFT = KeyboardLayout.EN.ArrowLeft.type;
const ARROW_RIGHT = KeyboardLayout.EN.ArrowRight.type;
const ARROW_UP = KeyboardLayout.EN.ArrowUp.type;
const ARROW_DOWN = KeyboardLayout.EN.ArrowDown.type;

const state = JSON.parse(localStorage.getItem('keyboardState')) || KeyboardInitState;
state.isShift = false;

class App {
  constructor() {
    this.state = new State({ ...state });
    this.pressed = new Set();
    this.sticking = false;

    this.setState = this.setState.bind(this);
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
    this.changeKeysCases = this.changeKeysCases.bind(this);

    this.onCapsLockPress = this.onCapsLockPress.bind(this);
    this.onShiftPress = this.onShiftPress.bind(this);
    this.onChangeLangKeyPress = this.onChangeLangKeyPress.bind(this);
    this.onArrowPress = this.onArrowPress.bind(this);
    this.onMetaPress = this.onMetaPress.bind(this);
    this.onCtrlPress = this.onCtrlPress.bind(this);
    this.onAltPress = this.onAltPress.bind(this);
    this.onPrintableKeyPress = this.onPrintableKeyPress.bind(this);
    this.onMousedown = this.onMousedown.bind(this);
    this.onMouseup = this.onMouseup.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.onWindowBlur = this.onWindowBlur.bind(this);

    this.state.subscribe(this.saveStateToLocalStorage);
    this.state.subscribe(this.changeKeysCases);

    this.descriptions = new Descriptions();

    this.textInput = new Input();

    this.keyboard = new Keyboard({
      state: this.state.getState(),
    });
  }

  setState(nextState) {
    this.state.update(nextState);
    this.state.notify();
  }

  saveStateToLocalStorage() {
    const stateInJSON = JSON.stringify(this.state.getState());
    localStorage.setItem('keyboardState', stateInJSON);
  }

  changeKeysCases() {
    const updated = { ...this.state.getState() };
    this.keyboard.changeCase(updated);
  }

  onCapsLockPress(target) {
    const { id } = target;
    const { isCapsLock } = this.state.getState();

    this.setState({ isCapsLock: !isCapsLock });
    this.keyboard.toggleActiveClass(id, !isCapsLock);
  }

  onShiftPress(target) {
    const { id } = target;
    const { isShift } = this.state.getState();

    this.setState({ isShift: !isShift });
    this.keyboard.toggleActiveClass(id, !isShift);
  }

  onChangeLangKeyPress(target) {
    const { id } = target;

    if (this.pressed.size === 1) {
      this.keyboard.toggleActiveClass(id, true);
    } else {
      let isToggle = true;

      Object.values(keysToChangeLang).forEach((key) => {
        if (!this.pressed.has(key)) {
          isToggle = false;
        }
      });

      if (isToggle) {
        const { language } = this.state.getState();
        const next = getNextLanguage(language);
        this.setState({ language: next });

        this.keyboard.toggleActiveClass(id, true);
      }
    }
  }

  onMetaPress(target) {
    const { id } = target;
    this.keyboard.toggleActiveClass(id, true);
  }

  onCtrlPress(target) {
    const { id } = target;
    this.keyboard.toggleActiveClass(id, true);
  }

  onAltPress(target) {
    const { id } = target;
    this.keyboard.toggleActiveClass(id, true);
  }

  onArrowPress(target) {
    const { id } = target;

    this.keyboard.toggleActiveClass(id, true);

    const { isShift } = this.state.getState();
    this.textInput.changeCursorPosition(target, isShift);
  }

  onPrintableKeyPress(target) {
    const { id } = target;

    this.keyboard.toggleActiveClass(id, true);

    if (this.pressed.size > 1) {
      if (this.pressed.has(CTRL_LEFT)
        || this.pressed.has(CTRL_RIGHT)
        || this.pressed.has(ALT_LEFT)
        || this.pressed.has(ALT_RIGHT)) {
        return;
      }
    }

    if (this.pressed.size > 2) {
      if (this.pressed.has(SHIFT_LEFT)
        || this.pressed.has(SHIFT_RIGHT)) {
        return;
      }
    }

    this.textInput.printKey(target);
  }

  onMousedown(target) {
    this.textInputRendered.focus();
    const { id } = target;

    this.pressed.add(id);

    const keyAction = {
      [CAPS_LOCK]: this.onCapsLockPress,
      [SHIFT_LEFT]: this.onShiftPress,
      [SHIFT_RIGHT]: this.onShiftPress,
      [keysToChangeLang.key1]: this.onChangeLangKeyPress,
      [keysToChangeLang.key2]: this.onChangeLangKeyPress,
      [ARROW_LEFT]: this.onArrowPress,
      [ARROW_RIGHT]: this.onArrowPress,
      [ARROW_UP]: this.onArrowPress,
      [ARROW_DOWN]: this.onArrowPress,
      [META_LEFT]: this.onMetaPress,
      [CTRL_RIGHT]: this.onCtrlPress,
      [ALT_RIGHT]: this.onAltPress,
    };

    if (keyAction[id]) {
      keyAction[id](target);
    } else {
      this.onPrintableKeyPress(target);
    }
  }

  onMouseup(target) {
    this.textInputRendered.focus();
    const { id } = target;

    if (this.sticking === target) {
      return;
    }

    this.pressed.delete(id);

    if (id === CAPS_LOCK) return;

    const { isShift } = this.state.getState();
    if ((id === SHIFT_LEFT) && (!isShift)) return;
    if ((id === SHIFT_RIGHT) && (!isShift)) return;

    if ((id === SHIFT_LEFT) || (id === SHIFT_RIGHT)) {
      this.setState({ isShift: !isShift });

      this.keyboard.toggleActiveClass(SHIFT_LEFT, false);
      this.keyboard.toggleActiveClass(SHIFT_RIGHT, false);
      return;
    }

    this.keyboard.toggleActiveClass(id, false);
  }

  onKeydown(evt) {
    const { code } = evt;

    if ((code === SHIFT_LEFT
      || code === SHIFT_RIGHT
      || code === CAPS_LOCK
      || code === CTRL_LEFT
      || code === CTRL_RIGHT
      || code === ALT_LEFT
      || code === ALT_RIGHT)
      && (evt.repeat === true)) {
      return;
    }

    const target = this.keyboard.getButtonById(code);
    this.onMousedown(target);
  }

  onKeyup(evt) {
    const target = this.keyboard.getButtonById(evt.code);
    this.onMouseup(target);
  }

  onWindowBlur() {
    this.pressed.forEach((key) => {
      this.keyboard.toggleActiveClass(key, false);
      this.pressed.delete(key);
    });
  }

  render() {
    this.textInputRendered = this.textInput.render();
    this.keyboardRendered = this.keyboard.render();
    this.descriptionsRendered = this.descriptions.render();

    this.keyboardRendered.addEventListener('mousedown', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;

      if ((Object.values(stickingKeys).includes(evt.target.id))
      && (!this.sticking)) {
        this.sticking = evt.target;
      } else if (this.sticking) {
        const target = this.sticking;
        this.sticking = false;
        this.onMousedown(evt.target);
        this.onMouseup(target);

        this.keyboard.toggleActiveClass(SHIFT_LEFT, false);
        this.keyboard.toggleActiveClass(SHIFT_RIGHT, false);
        return;
      }

      this.onMousedown(evt.target);
    });

    this.keyboardRendered.addEventListener('mouseup', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;
      this.onMouseup(evt.target);
    });

    this.keyboardRendered.addEventListener('mouseout', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;
      if (this.pressed.size === 0) return;
      this.onMouseup(evt.target);
    });

    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      if (!isKeyInKeyboard(evt)) return;

      if (this.sticking) {
        const target = this.sticking;
        this.sticking = false;
        this.onKeydown(evt);
        this.onMouseup(target);
        return;
      }

      this.onKeydown(evt);
    });

    document.addEventListener('keyup', (evt) => {
      evt.preventDefault();
      if (!isKeyInKeyboard(evt)) return;

      this.onKeyup(evt);
    });

    this.textInputRendered.addEventListener('blur', () => {
      if (this.pressed.size !== 0) {
        this.textInputRendered.focus();
      }
    });

    window.addEventListener('blur', () => {
      this.onWindowBlur();
    });

    this.app = Renderer.createElement('div', {
      class: 'main',
      children: [
        this.textInputRendered,
        this.keyboardRendered,
        this.descriptionsRendered,
      ],
    });

    return this.app;
  }
}

export default App;
