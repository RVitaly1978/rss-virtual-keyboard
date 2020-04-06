
import Renderer from '../dom/Renderer';

import { KeyboardLayout } from '../constants/KeyboardLayout';

import {
  insertChar,
  handlePressTab,
  handlePressBackspace,
  handlePressDelete,
  handlePressEnter,
  handlePressArrowLeft,
  handlePressArrowRight,
} from '../utils/inputUtils';

const BACKSPACE = KeyboardLayout.EN.Backspace.type;
const TAB = KeyboardLayout.EN.Tab.type;
const DELETE = KeyboardLayout.EN.Delete.type;
const ENTER = KeyboardLayout.EN.Enter.type;
const SHIFT_LEFT = KeyboardLayout.EN.ShiftLeft.type;
const SHIFT_RIGHT = KeyboardLayout.EN.ShiftRight.type;
const CAPSLOCK = KeyboardLayout.EN.CapsLock.type;
const CTRL_LEFT = KeyboardLayout.EN.ControlLeft.type;
const CTRL_RIGHT = KeyboardLayout.EN.ControlRight.type;
const ALT_LEFT = KeyboardLayout.EN.AltLeft.type;
const ALT_RIGHT = KeyboardLayout.EN.AltRight.type;
const META_LEFT = KeyboardLayout.EN.MetaLeft.type;
const ARROW_LEFT = KeyboardLayout.EN.ArrowLeft.type;
const ARROW_RIGHT = KeyboardLayout.EN.ArrowRight.type;

class Input {
  constructor() {
    this.printKey = this.printKey.bind(this);
    this.handlePressedKeys = this.handlePressedKeys.bind(this);

    this.input = Renderer.createElement('textarea', {
      id: 'textarea',
      class: 'keyboard__input',
      cols: 60,
      rows: 5,
      autofocus: true,
    });
  }

  printKey(key) {
    this.handlePressedKeys(key);
  }

  handlePressedKeys(key) {
    const { id } = key;
    const { textContent: char } = key;

    switch (id) {
      case TAB:
        handlePressTab({ textarea: this.input });
        break;
      case ENTER:
        handlePressEnter({ textarea: this.input });
        break;
      case BACKSPACE:
        handlePressBackspace({ textarea: this.input });
        break;
      case DELETE:
        handlePressDelete({ textarea: this.input });
        break;
      case ARROW_LEFT:
        handlePressArrowLeft({ textarea: this.input });
        break;
      case ARROW_RIGHT:
        handlePressArrowRight({ textarea: this.input });
        break;
      case CAPSLOCK:
        break;
      // case 'ShiftLeft':
      //   if (shiftRightStatus) {
      //     shiftRightStatus = !shiftRightStatus;
      //     document.querySelector('#ShiftRight').classList.remove('key--active');
      //     btn.classList.add('key--active');
      //     setTimeout(() => { btn.classList.remove('key--active'); }, 100);
      //   } else {
      //     handlePressShiftLeft(btn);
      //   }
      //   break;
      // case 'ShiftRight':
      //   if (shiftLeftStatus) {
      //     shiftLeftStatus = !shiftLeftStatus;
      //     document.querySelector('#ShiftLeft').classList.remove('key--active');
      //     btn.classList.add('key--active');
      //     setTimeout(() => { btn.classList.remove('key--active'); }, 100);
      //   } else {
      //     handlePressShiftRight(btn);
      //   }
      //   break;
      case SHIFT_LEFT:
        break;
      case SHIFT_RIGHT:
        break;
      case META_LEFT:
        break;
      case CTRL_LEFT:
        break;
      case ALT_LEFT:
        break;
      case CTRL_RIGHT:
        break;
      case ALT_RIGHT:
        break;
      default:
        // if (shiftLeftStatus) {
        //   shiftLeftStatus = !shiftLeftStatus;
        //   document.querySelector('#ShiftLeft').classList.remove('key--active');
        //   handlePressBtn(btn, initialText, cursorStart, cursorEnd);
        // } else if (shiftRightStatus) {
        //   shiftRightStatus = !shiftRightStatus;
        //   document.querySelector('#ShiftRight').classList.remove('key--active');
        //   handlePressBtn(btn, initialText, cursorStart, cursorEnd);
        // } else if (ctrlLeftStatus) {
        //   ctrlLeftStatus = !ctrlLeftStatus;
        //   document.querySelector('#ControlLeft').classList.remove('key--active');
        // } else if (altLeftStatus) {
        //   altLeftStatus = !altLeftStatus;
        //   document.querySelector('#AltLeft').classList.remove('key--active');
        // } else {
        //   handlePressBtn(btn, initialText, cursorStart, cursorEnd);
        // }
        insertChar({ textarea: this.input, char });
    }
  }

  render() {
    return this.input;
  }
}

export default Input;
