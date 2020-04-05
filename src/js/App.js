
import Renderer from './dom/Renderer';

import State from './components/State';
import Keyboard from './components/Keyboard';
import Input from './components/Input';
import KeyboardInitState from './constants/KeyboardInitState';

import { getDescriptionsItems } from './constants/KeyboardDescriptions';
import { KeyboardLayout } from './constants/KeyboardLayout';
// import { getNextLanguage } from './constants/KeyboardLanguages';
// import {
//   getKeyboardKeys,
//   getKeyContent,
//   getButton,
//   toggleKeyClass,
// } from './utils/keyboardUtils';

// const SHIFT_LEFT = KeyboardLayout.EN.ShiftLeft.type;
// const SHIFT_RIGHT = KeyboardLayout.EN.ShiftRight.type;
const CAPS_LOCK = KeyboardLayout.EN.CapsLock.type;
// const CTRL_LEFT = KeyboardLayout.EN.ControlLeft.type;
// const ALT_LEFT = KeyboardLayout.EN.AltLeft.type;
// const META_LEFT = KeyboardLayout.EN.MetaLeft.type;

const state = JSON.parse(localStorage.getItem('keyboardState')) || KeyboardInitState;
state.isShift = false;

class App {
  constructor() {
    this.state = new State({ ...state });
    this.pressed = new Set();

    this.setState = this.setState.bind(this);
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
    this.changeKeysCases = this.changeKeysCases.bind(this);
    this.onCapsLockPress = this.onCapsLockPress.bind(this);
    this.onMousedown = this.onMousedown.bind(this);

    // this.onKeyboardStateChange = this.onKeyboardStateChange.bind(this);
    // this.onKeyboardKeyPress = this.onKeyboardKeyPress.bind(this);

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
      // onStateChange: this.onKeyboardStateChange,
      // onKeyPress: this.onKeyboardKeyPress,
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

  // onKeyboardStateChange(nextState) {
  //   this.setState(nextState);
  // }

  // onKeyboardKeyPress({ id, key }) {
  //   this.textInput.printKey({ id, key });
  // }

  onCapsLockPress(evt) {
    const { id } = evt.target;
    const { isCapsLock } = this.state.getState();

    this.setState({ isCapsLock: !isCapsLock });
    this.keyboard.toggleActiveClass(id, !isCapsLock);
  }

  onMousedown(evt) {
    // const { target } = evt;
    const { id } = evt.target;
    // const { isCapsLock, isShift, lang } = this.state.getState();

    switch (id) {
      case CAPS_LOCK:
        this.onCapsLockPress(evt);
        // redrawCases();
        break;
      // case SHIFT_LEFT:
      //   prev = caseModifier.isShift;
      //   caseModifier.isShift = !prev;
      //   redrawCases();
      //   break;
      // case SHIFT_RIGHT:
      //   prev = caseModifier.isShift;
      //   caseModifier.isShift = !prev;
      //   redrawCases();
      //   break;
      // case META_LEFT:
      //   lang = getLang(currentLang);
      //   currentLang = lang;
      //   redrawCases();
      //   break;
      default:
        // printKey(target);
    }
  }

  render() {
    this.keyboardRendered = this.keyboard.render();
    this.textInputRendered = this.textInput.render();

    this.keyboardRendered.addEventListener('mousedown', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;

      this.onMousedown(evt);
      this.textInputRendered.focus();

      this.pressed.add(evt.target.id);
      console.log(this.pressed);
    });

    // this.keyboardRendered.addEventListener('mouseout', (evt) => {
    //   if (evt.target.tagName !== 'BUTTON') return;

    //   this.keyboard.onMousedownEvent(evt);
    //   this.textInputRendered.focus();

    //   this.pressed.delete(evt.target.id);
    // });

    // document.addEventListener('mouseup', (evt) => {
    //   if (evt.target.tagName !== 'BUTTON') return;

    //   this.keyboard.onMouseupEvent();
    //   this.textInputRendered.focus();

    //   this.pressed.delete(evt.target.id);
    // });

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
