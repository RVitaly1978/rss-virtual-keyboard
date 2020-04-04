
import Renderer from '../dom/Renderer';
// import State from './State';
// import Button from './Button';

// import KeyboardLayout from '../constants/KeyboardLayout';
// import { getNextLanguage } from '../constants/KeyboardLanguages';

// import getKeyCase from '../utils/getKeyCase';

class Input {
  constructor() {
  // constructor({ state, onStateChange, onKeyPress }) {
  //   this.state = new State({ ...state });
  //   this.setState = this.setState.bind(this);

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

    this.input = Renderer.createElement('textarea', {
      id: 'textarea',
      class: 'keyboard__input',
      cols: 60,
      rows: 5,
      autofocus: true,
    });

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
  }

  // setState(nextState) {
  //   this.state.update(nextState);
  //   this.state.notify();
  // }

  render() {
    return this.input;
  }
}

export default Input;