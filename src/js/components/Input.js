
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
    /* eslint-disable no-debugger */
    // debugger;
    /* eslint-disable no-debugger */

    this.printKey = this.printKey.bind(this);
    this.handlePressedKeys = this.handlePressedKeys.bind(this);

    // this.onStateChange = onStateChange;
    // this.onKeyPress = onKeyPress;
    // this.updateAppOnKeyPress = this.updateAppOnKeyPress.bind(this);
    // this.updateAppOnStateChange = this.updateAppOnStateChange.bind(this);
    // this.state.subscribe(this.updateAppOnStateChange);

    // this.isMousedown = false;
    // this.currentKey = null;
    // this.isShiftLeft = false;
    // this.isShiftRight = false;
    // this.isCtrl = false;
    // this.isAlt = false;

    // this.updateKeyOnMouseUp = this.updateKeyOnMouseUp.bind(this);
    // this.updateKeyOnMousedown = this.updateKeyOnMousedown.bind(this);

    // this.updateKeys = this.updateKeys.bind(this);
    // this.state.subscribe(this.updateKeys);

    // ----------------------------------------------------------------------------------
    // this.keyboard.addEventListener('mousedown', (evt) => {
    //   if (evt.target.tagName !== 'BUTTON') return;

    //   const { id } = evt.target;
    //   const { textContent } = evt.target;
    //   this.currentKey = id;
    //   this.isMousedown = true;
    //   this.updateAppOnKeyPress({ key: textContent });
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

    //   this.textarea.focus();
    // });

    // document.addEventListener('mouseup', () => {
    //   if (this.isMousedown) {
    //     this.isMousedown = false;
    //     this.updateKeyOnMouseUp();
    //   }
    // });

    this.input = Renderer.createElement('textarea', {
      id: 'textarea',
      class: 'keyboard__input',
      cols: 60,
      rows: 5,
      autofocus: true,
    });
  }

  printKey({ id, key }) {
    this.handlePressedKeys({ id, key });
  }

  handlePressedKeys({ id, key }) {
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
        insertChar({ textarea: this.input, char: key });
    }
  }

  render() {
    return this.input;
  }
}

export default Input;
