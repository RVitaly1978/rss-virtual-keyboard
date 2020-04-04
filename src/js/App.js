
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

    this.onKeyboardStateChange = this.onKeyboardStateChange.bind(this);
    this.onKeyboardKeyPress = this.onKeyboardKeyPress.bind(this);

    // this.setKeyToPrint = this.setKeyToPrint.bind(this);
  }

  onKeyboardStateChange(nextState) {
    this.state.update(nextState);
  }

  onKeyboardKeyPress({ key }) {
    console.log(key, this.textInput);
    this.textInput.printKey({ key });
    // this.setKeyToPrint({ key });
  }

  // setKeyToPrint({ key }) {
  //   console.log(key, this.textInput);
  //   this.textInput.printKey();
  // }

  render() {
    // this.keyboard.addEventListener('click', () => {
    //   this.textInput.focus();
    // });

    // this.textInput.addEventListener('keydown', (evt) => {
    //   evt.preventDefault();
    //   this.textInput.focus();
    // });

    // window.addEventListener('beforeunload', () => {
    //   const stateInJSON = JSON.stringify(this.state.getState());
    //   localStorage.setItem('keyboardState', stateInJSON);
    // });

    this.app = Renderer.createElement('div', {
      class: 'main',
      children: [
        this.textInput.render(),
        this.keyboard.render(),
        this.descriptions,
      ],
    });

    return this.app;
  }
}

export default App;
