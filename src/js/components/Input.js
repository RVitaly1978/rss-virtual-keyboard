
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

    const arrowAction = {
      [ARROW_LEFT]: handlePressArrowLeft,
      [ARROW_RIGHT]: handlePressArrowRight,
      [ARROW_UP]: handlePressArrowUp,
      [ARROW_DOWN]: handlePressArrowDown,
    };

    arrowAction[id]({ textarea: this.input, isShift });
  }

  handlePressedKeys(key) {
    const { id } = key;
    const { textContent: char } = key;

    const keyAction = {
      [TAB]: handlePressTab,
      [ENTER]: handlePressEnter,
      [BACKSPACE]: handlePressBackspace,
      [DELETE]: handlePressDelete,
    };

    if (keyAction[id]) {
      keyAction[id]({ textarea: this.input });
    } else {
      insertChar({ textarea: this.input, char });
    }
  }

  render() {
    return this.input;
  }
}

export default Input;
