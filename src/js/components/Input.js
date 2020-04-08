
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
  handlePressArrowUp,
  handlePressArrowDown,
} from '../utils/inputUtils';

const BACKSPACE = KeyboardLayout.EN.Backspace.type;
const TAB = KeyboardLayout.EN.Tab.type;
const DELETE = KeyboardLayout.EN.Delete.type;
const ENTER = KeyboardLayout.EN.Enter.type;
const ARROW_LEFT = KeyboardLayout.EN.ArrowLeft.type;
const ARROW_RIGHT = KeyboardLayout.EN.ArrowRight.type;
const ARROW_UP = KeyboardLayout.EN.ArrowUp.type;
const ARROW_DOWN = KeyboardLayout.EN.ArrowDown.type;

class Input {
  constructor() {
    this.printKey = this.printKey.bind(this);
    this.handlePressedKeys = this.handlePressedKeys.bind(this);
    this.changeCursorPosition = this.changeCursorPosition.bind(this);

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

  changeCursorPosition(key, isShift) {
    const { id } = key;

    switch (id) {
      case ARROW_LEFT:
        handlePressArrowLeft({ textarea: this.input, isShift });
        break;
      case ARROW_RIGHT:
        handlePressArrowRight({ textarea: this.input, isShift });
        break;
      case ARROW_UP:
        handlePressArrowUp({ textarea: this.input, isShift });
        break;
      case ARROW_DOWN:
        handlePressArrowDown({ textarea: this.input, isShift });
        break;
      default:
        break;
    }
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
      default:
        insertChar({ textarea: this.input, char });
    }
  }

  render() {
    return this.input;
  }
}

export default Input;
