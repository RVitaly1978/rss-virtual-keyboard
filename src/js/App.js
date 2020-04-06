
import Renderer from './dom/Renderer';

import State from './components/State';
import Keyboard from './components/Keyboard';
import Input from './components/Input';
import KeyboardInitState from './constants/KeyboardInitState';

import { getDescriptionsItems } from './constants/KeyboardDescriptions';
import { KeyboardLayout, keysToChangeLang } from './constants/KeyboardLayout';
import { getNextLanguage } from './constants/KeyboardLanguages';
// import {
//   getKeyboardKeys,
//   getKeyContent,
//   getButton,
//   toggleKeyClass,
// } from './utils/keyboardUtils';

const CAPS_LOCK = KeyboardLayout.EN.CapsLock.type;
const SHIFT_LEFT = KeyboardLayout.EN.ShiftLeft.type;
const SHIFT_RIGHT = KeyboardLayout.EN.ShiftRight.type;
// const META_LEFT = KeyboardLayout.EN.MetaLeft.type;
// const CTRL_LEFT = KeyboardLayout.EN.ControlLeft.type;
// const CTRL_RIGHT = KeyboardLayout.EN.ControlRight.type;
// const ALT_LEFT = KeyboardLayout.EN.AltLeft.type;
// const ALT_RIGHT = KeyboardLayout.EN.AltRight.type;

const state = JSON.parse(localStorage.getItem('keyboardState')) || KeyboardInitState;
state.isShift = false;

class App {
  constructor() {
    this.state = new State({ ...state });
    this.pressed = new Set();
    this.isChangeLangPressed = false;

    this.setState = this.setState.bind(this);
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
    this.changeKeysCases = this.changeKeysCases.bind(this);
    this.onCapsLockPress = this.onCapsLockPress.bind(this);
    this.onShiftPress = this.onShiftPress.bind(this);
    this.onSingleChangeLangKeyPress = this.onSingleChangeLangKeyPress.bind(this);
    this.onMultipleChangeLangKeyPress = this.onMultipleChangeLangKeyPress.bind(this);
    this.onPrintableKeyPress = this.onPrintableKeyPress.bind(this);
    this.handleMultiplePressed = this.handleMultiplePressed.bind(this);
    this.onMousedown = this.onMousedown.bind(this);
    this.onMouseup = this.onMouseup.bind(this);

    this.state.subscribe(this.saveStateToLocalStorage);
    this.state.subscribe(this.changeKeysCases);

    this.descriptions = Renderer.createElement('div', {
      id: 'descriptions',
      class: 'descriptions__container',
      children: getDescriptionsItems(),
    });

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
    this.keyboard.redrawAllKeys(updated);
  }

  onCapsLockPress(evt) {
    const { id } = evt.target;
    const { isCapsLock } = this.state.getState();

    this.setState({ isCapsLock: !isCapsLock });
    this.keyboard.toggleActiveClass(id, !isCapsLock);
  }

  onShiftPress(evt) {
    const { id } = evt.target;
    const { isShift } = this.state.getState();

    this.setState({ isShift: !isShift });
    this.keyboard.toggleActiveClass(id, !isShift);
  }

  onSingleChangeLangKeyPress(evt) {
    const { id } = evt.target;
    const isPressed = this.isChangeLangPressed;

    this.isChangeLangPressed = !isPressed;
    this.keyboard.toggleActiveClass(id, !isPressed);

    if (isPressed) {
      this.pressed.clear();
    }
  }

  onMultipleChangeLangKeyPress() {
    const { key1, key2 } = keysToChangeLang;
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

      this.pressed.clear();
      this.keyboard.toggleActiveClass(key1, false);
      this.keyboard.toggleActiveClass(key2, false);
    }
  }

  onPrintableKeyPress(evt) {
    const { target } = evt;
    const { id } = target;

    this.textInput.printKey(target);
    this.keyboard.toggleActiveClass(id, true);
  }

  handleMultiplePressed(evt) {
    if (this.pressed.size === 1) return;

    const { id } = evt.target;
    const { key1, key2 } = keysToChangeLang;

    if ((id === key1) || (id === key2)) {
      this.onMultipleChangeLangKeyPress();
    }
  }

  onMousedown(evt) {
    const { id } = evt.target;

    this.pressed.add(id);

    this.handleMultiplePressed(evt);

    switch (id) {
      case CAPS_LOCK:
        this.onCapsLockPress(evt);
        break;
      case SHIFT_LEFT:
        this.onShiftPress(evt);
        break;
      case SHIFT_RIGHT:
        this.onShiftPress(evt);
        break;
      case keysToChangeLang.key1:
        this.onSingleChangeLangKeyPress(evt);
        break;
      case keysToChangeLang.key2:
        this.onSingleChangeLangKeyPress(evt);
        break;
      default:
        this.onPrintableKeyPress(evt);
    }
  }

  onMouseup(evt) {
    const { id } = evt.target;

    if ((id !== SHIFT_LEFT)
      && (id !== SHIFT_RIGHT)
      && (id !== keysToChangeLang.key1)
      && (id !== keysToChangeLang.key2)) {
      this.pressed.delete(id);
    }

    if ((id === CAPS_LOCK)
      || (id === SHIFT_LEFT)
      || (id === SHIFT_RIGHT)
      || (id === keysToChangeLang.key1)
      || (id === keysToChangeLang.key2)) {
      return;
    }

    this.keyboard.toggleActiveClass(id, false);
  }

  render() {
    this.keyboardRendered = this.keyboard.render();
    this.textInputRendered = this.textInput.render();

    this.keyboardRendered.addEventListener('mousedown', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;

      this.onMousedown(evt);
      this.textInputRendered.focus();
    });

    this.keyboardRendered.addEventListener('mouseup', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;

      this.onMouseup(evt);
      this.textInputRendered.focus();
    });

    this.keyboardRendered.addEventListener('mouseout', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;

      this.onMouseup(evt);
      this.textInputRendered.focus();
    });

    // document.addEventListener('keydown', (evt) => {
    //   if ((evt.code !== 'ArrowUp') && (evt.code !== 'ArrowDown')) {
    //     evt.preventDefault();
    //   }
    //   this.keyboard.onKeydownEvent(evt);
    //   this.textInputRendered.focus();

    //   this.pressed.add(evt.code);
    //   console.log(this.pressed);
    // });

    // document.addEventListener('keyup', (evt) => {
    //   evt.preventDefault();
    //   this.keyboard.onKeyupEvent(evt);
    //   this.textInputRendered.focus();

    //   this.pressed.delete(evt.code);
    //   console.log(this.pressed);
    // });

    // window.addEventListener('blur', () => {
    //   this.changeKeysCases();
    // });

    this.app = Renderer.createElement('div', {
      class: 'main',
      children: [
        this.textInputRendered,
        this.keyboardRendered,
        this.descriptions,
      ],
    });

    return this.app;
  }
}

export default App;

// updateKeyOnMousedown() {
//   const {
//     isCapsLock,
//     isShift,
//   } = this.state.getState();
//   const keyId = this.currentKey;

//   if (keyId === CAPSLOCK) {
//     toggleKeyClass(this.keyboardKeys, keyId, !isCapsLock);
//   } else if ((keyId === SHIFT_LEFT) || (keyId === SHIFT_RIGHT)) {
//     if (!isShift) {
//       toggleKeyClass(this.keyboardKeys, keyId, !isShift);
//     } else {
//       toggleKeyClass(this.keyboardKeys, SHIFT_LEFT, !isShift);
//       toggleKeyClass(this.keyboardKeys, SHIFT_RIGHT, !isShift);
//       this.isShiftLeft = false;
//       this.isShiftRight = false;
//     }
//   } else if ((keyId === CTRL_LEFT) || (keyId === ALT_LEFT)) {
//     if (!this.isCtrl && !this.isAlt) {
//       toggleKeyClass(this.keyboardKeys, keyId, true);
//     } else { // -----------------------------------------------------------------
//       this.isCtrl = false;
//       this.isAlt = false;
//       toggleKeyClass(this.keyboardKeys, CTRL_LEFT, this.isCtrl);
//       toggleKeyClass(this.keyboardKeys, ALT_LEFT, this.isAlt);
//     }
//   } else {
//     toggleKeyClass(this.keyboardKeys, keyId, this.isMousedown);
//   }
// }

// updateKeyOnMouseup() {
//   const keyId = this.currentKey;

//   if ((keyId === CAPSLOCK)
//     || (keyId === SHIFT_LEFT)
//     || (keyId === SHIFT_RIGHT)
//     || (keyId === CTRL_LEFT)
//     || (keyId === ALT_LEFT)) {
//     return;
//   }

//   toggleKeyClass(this.keyboardKeys, keyId, this.isMousedown);
// }

// updateKeyOnKeyup(evt) {
//   const keyId = evt.code;

//   if ((keyId === CAPSLOCK)
//     || (keyId === SHIFT_LEFT)
//     || (keyId === SHIFT_RIGHT)
//     || (keyId === CTRL_LEFT)
//     || (keyId === ALT_LEFT)) {
//     return;
//   }

//   toggleKeyClass(this.keyboardKeys, keyId, false);
// }

// onMousedownEvent(evt) {
//   const { id } = evt.target;
//   const { textContent } = evt.target;
//   this.currentKey = id;
//   this.isMousedown = true;

//   this.onKeyPress({ id, key: textContent });
//   this.updateKeyOnMousedown();

//   if (id === SHIFT_LEFT) {
//     this.isShiftLeft = true;
//     const prev = this.state.getState().isShift;
//     this.setState({ isShift: !prev });
//   }

//   if (id === SHIFT_RIGHT) {
//     this.isShiftRight = true;
//     const prev = this.state.getState().isShift;
//     this.setState({ isShift: !prev });
//   }

//   if (id === CAPSLOCK) {
//     const prev = this.state.getState().isCapsLock;
//     this.setState({ isCapsLock: !prev });
//   }

//   if (id === META_LEFT) { //-------------------------------------------
//     const nextLang = getNextLanguage(this.state.getState().lang);
//     this.setState({ lang: nextLang });
//   }

//   if (id === CTRL_LEFT) {
//     this.isCtrl = true;
//   }

//   if (id === CTRL_LEFT) {
//     this.isAlt = true;
//   }
// }

// onMouseupEvent() {
//   if (this.isMousedown) {
//     this.isMousedown = false;
//     this.updateKeyOnMouseup();
//   }
// }

// onKeydownEvent(evt) {
//   const { code: id } = evt;
//   const { textContent } = getButton(this.keyboardKeys, id);
//   this.currentKey = id;
//   this.isMousedown = true;
//   this.isKeydown = true;

//   this.onKeyPress({ id, key: textContent });
//   this.updateKeyOnMousedown();

//   if (id === SHIFT_LEFT) {
//     this.isShiftLeft = true;
//     const prev = this.state.getState().isShift;
//     this.setState({ isShift: !prev });
//   }

//   if (id === SHIFT_RIGHT) {
//     this.isShiftRight = true;
//     const prev = this.state.getState().isShift;
//     this.setState({ isShift: !prev });
//   }

//   if (id === CAPSLOCK) {
//     const prev = this.state.getState().isCapsLock;
//     this.setState({ isCapsLock: !prev });
//   }

//   if (id === META_LEFT) { //-------------------------------------------
//     const nextLang = getNextLanguage(this.state.getState().lang);
//     this.setState({ lang: nextLang });
//   }

//   if (id === CTRL_LEFT) {
//     this.isCtrl = true;
//   }

//   if (id === CTRL_LEFT) {
//     this.isAlt = true;
//   }
// }

// onKeyupEvent(evt) {
//   this.updateKeyOnKeyup(evt);
// }
