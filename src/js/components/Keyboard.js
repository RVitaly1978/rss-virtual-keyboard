
import Renderer from '../dom/Renderer';

import { KeyboardLayout, KeyClassName } from '../constants/KeyboardLayout';
// import { getNextLanguage } from '../constants/KeyboardLanguages';

import {
  getKeyboardKeys,
  getKeyContent,
  getButton,
  // toggleKeyClass,
} from '../utils/keyboardUtils';

// const SHIFT_LEFT = KeyboardLayout.EN.ShiftLeft.type;
// const SHIFT_RIGHT = KeyboardLayout.EN.ShiftRight.type;
const CAPSLOCK = KeyboardLayout.EN.CapsLock.type;
// const CTRL_LEFT = KeyboardLayout.EN.ControlLeft.type;
// const ALT_LEFT = KeyboardLayout.EN.AltLeft.type;
// const META_LEFT = KeyboardLayout.EN.MetaLeft.type;

class Keyboard {
  constructor({ state }) {
    this.state = { ...state };

    this.redrawAllKeys = this.redrawAllKeys.bind(this);
    this.toggleActiveClass = this.toggleActiveClass.bind(this);

    this.keyboardKeys = getKeyboardKeys({
      state: this.state,
    });

    this.keyboard = Renderer.createElement('div', {
      id: 'keyboard',
      class: 'keyboard',
      children: [...this.keyboardKeys],
    });
  }

  redrawAllKeys(state) {
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

  render() {
    if (this.state.isCapsLock) {
      this.toggleActiveClass(CAPSLOCK, true);
    }

    return this.keyboard;
  }
}

export default Keyboard;
