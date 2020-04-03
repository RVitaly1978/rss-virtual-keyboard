import Renderer from './dom/Renderer';

import State from './components/State';
import Keyboard from './components/Keyboard';

import KeyboardDescriptions from './constants/KeyboardDescriptions';
import KeyboardLayout from './constants/KeyboardLayout';
import { KeyboardLanguages, getNextLanguage } from './constants/KeyboardLanguages';

const initState = {
  lang: KeyboardLanguages[0],
  isCapsLock: false,
  isShift: false,
};

const state = JSON.parse(localStorage.getItem('keyboardState')) || initState;

const getDescriptionsItems = () => {
  const items = [];

  Object.keys(KeyboardDescriptions).forEach((key) => {
    const option = Renderer.createElement('p', {
      class: 'descriptions__option',
      children: [key],
    });

    const value = Renderer.createElement('p', {
      class: 'descriptions__value',
      children: [KeyboardDescriptions[key]],
    });

    items.push(value, option);
  });

  return items;
};

class App {
  constructor() {
    this.state = new State(state);
    this.isMousedown = false;
    this.currentKey = null;
    this.isCtrl = false;
    this.isAlt = false;

    this.setState = this.setState.bind(this);

    this.textarea = Renderer.createElement('textarea', {
      id: 'textarea',
      class: 'keyboard__input',
      name: 'textarea',
      cols: 60,
      rows: 5,
      autofocus: true,
    });

    this.keyboard = new Keyboard({
      state: this.state.getState(),
    });
    this.updateStateKeyboard = this.updateStateKeyboard.bind(this);
    this.updateKeyboardKeyClass = this.updateKeyboardKeyClass.bind(this);
    this.state.subscribe(this.updateStateKeyboard);
    // this.state.subscribe(this.updateKeyboardKeyClass);
  }

  setState(nextState) {
    this.state.update(nextState);
    this.state.notify();
  }

  updateStateKeyboard() {
    this.keyboard.updateState({
      state: this.state.getState(),
    });
  }

  updateKeyboardKeyClass() {
    this.keyboard.updateKeyClass({
      isMousedown: this.isMousedown,
      currentKey: this.currentKey,
    });
  }

  render() {
    this.descriptions = Renderer.createElement('div', {
      id: 'descriptions',
      class: 'descriptions__container',
      children: getDescriptionsItems(),
    });

    this.keyboardRendered = this.keyboard.render();
    this.keyboardRendered.addEventListener('mousedown', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;

      const { id } = evt.target;
      this.currentKey = id;
      this.isMousedown = true;
      this.updateKeyboardKeyClass();

      if ((id === KeyboardLayout.EN.ShiftLeft.type)
        || (id === KeyboardLayout.EN.ShiftRight.type)) {
        const prevIsShift = this.state.getState().isShift;
        this.setState({ isShift: !prevIsShift });
      }

      if (id === KeyboardLayout.EN.CapsLock.type) {
        const prevIsCapsLock = this.state.getState().isCapsLock;
        this.setState({ isCapsLock: !prevIsCapsLock });
      }

      if (id === KeyboardLayout.EN.MetaLeft.type) { //-------------------------------------------
        const nextLang = getNextLanguage(this.state.getState().lang);
        this.setState({ lang: nextLang });
      }

      this.textarea.focus();
    });

    document.addEventListener('mouseup', () => {
      if (this.isMousedown) {
        this.currentKey = null;
        this.isMousedown = false;
        this.updateKeyboardKeyClass();
      }
    });

    this.keyboardRendered.addEventListener('click', () => {
      this.textarea.focus();
    });

    // this.keyboardRendered.addEventListener('transitionend', (evt) => {
    //   console.log(evt.target);
    // });

    this.textarea.addEventListener('keydown', (evt) => {
      // console.log(evt.code);
      evt.preventDefault();
      this.textarea.focus();
    });

    // window.addEventListener('beforeunload', () => {
    //   const stateInJSON = JSON.stringify(this.state.getState());
    //   localStorage.setItem('keyboardState', stateInJSON);
    // });

    return Renderer.createElement('div', {
      class: 'main',
      children: [
        this.textarea,
        this.keyboardRendered,
        this.descriptions,
      ],
    });
  }
}

export default App;
