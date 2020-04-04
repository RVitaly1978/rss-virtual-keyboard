
import Renderer from './dom/Renderer';

import State from './components/State';
import Keyboard from './components/Keyboard';
import Input from './components/Input';

import { getDescriptionsItems } from './constants/KeyboardDescriptions';
import KeyboardInitState from './constants/KeyboardInitState';

const state = JSON.parse(localStorage.getItem('keyboardState')) || KeyboardInitState;

class App {
  constructor() {
    this.state = new State({ ...state });

    this.setState = this.setState.bind(this);
    this.onKeyboardStateChange = this.onKeyboardStateChange.bind(this);
    this.onKeyboardKeyPress = this.onKeyboardKeyPress.bind(this);

    this.descriptions = Renderer.createElement('div', {
      id: 'descriptions',
      class: 'descriptions__container',
      children: getDescriptionsItems(),
    });

    this.textInput = new Input();

    this.keyboard = new Keyboard({
      state: this.state.getState(),
      onStateChange: this.onKeyboardStateChange,
      onKeyPress: this.onKeyboardKeyPress,
    });
  }

  setState(nextState) {
    this.state.update(nextState);
    // this.state.notify();
  }

  onKeyboardStateChange(nextState) {
    this.setState(nextState);
  }

  onKeyboardKeyPress({ id, key }) {
    this.textInput.printKey({ id, key });
  }

  render() {
    this.keyboardRendered = this.keyboard.render();
    this.textInputRendered = this.textInput.render();

    this.keyboardRendered.addEventListener('mousedown', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;
      this.keyboard.onMousedownEvent(evt);
      this.textInputRendered.focus();
    });

    document.addEventListener('mouseup', () => {
      this.keyboard.onMouseupEvent();
      this.textInputRendered.focus();
    });

    document.addEventListener('keydown', (evt) => {
      if ((evt.code !== 'ArrowUp') && (evt.code !== 'ArrowDown')) {
        evt.preventDefault();
      }
      this.keyboard.onKeydownEvent(evt);
      this.textInputRendered.focus();
    });

    document.addEventListener('keyup', (evt) => {
      evt.preventDefault();
      this.keyboard.onKeyupEvent(evt);
      this.textInputRendered.focus();
    });

    window.addEventListener('beforeunload', () => {
      const stateInJSON = JSON.stringify(this.state.getState());
      localStorage.setItem('keyboardState', stateInJSON);
    });

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
