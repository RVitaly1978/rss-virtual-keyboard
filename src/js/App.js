import Renderer from './dom/Renderer';

import State from './components/State';
import Keyboard from './components/Keyboard';
import Input from './components/Input';

import { getDescriptionsItems } from './constants/KeyboardDescriptions';
import { InitState } from './constants/InitState';

const state = JSON.parse(localStorage.getItem('keyboardState')) || InitState;

class App {
  constructor() {
    this.state = new State({ ...state });

    // this.setAppState = this.setAppState.bind(this);

    this.descriptions = Renderer.createElement('div', {
      id: 'descriptions',
      class: 'descriptions__container',
      children: getDescriptionsItems(),
    });

    this.input = new Input().render();

    this.keyboard = new Keyboard({
      state: this.state.getState(),
      onStateChange: this.onKeyboardStateChange,
      onKeyPress: this.onKeyboardKeyPress,
    }).render();

    this.onKeyboardStateChange = this.onKeyboardStateChange.bind(this);
    this.onKeyboardKeyPress = this.onKeyboardKeyPress.bind(this);

    // this.updateKeyboardKeyClass = this.updateKeyboardKeyClass.bind(this);
    // this.state.subscribe(this.updateKeyboardKeyClass);
  }

  // setAppState(nextState) {
  //   console.log(nextState);
  //   this.state.update(nextState);
  //   this.state.notify();
  // }

  onKeyboardStateChange(nextState) {
    this.state.update(nextState);
  }

  onKeyboardKeyPress({ key }) {
    console.log(key, this.state.getState());
  }

  render() {
    // this.keyboard.addEventListener('click', () => {
    //   this.input.focus();
    // });

    // this.input.addEventListener('keydown', (evt) => {
    //   evt.preventDefault();
    //   this.input.focus();
    // });

    // window.addEventListener('beforeunload', () => {
    //   const stateInJSON = JSON.stringify(this.state.getState());
    //   localStorage.setItem('keyboardState', stateInJSON);
    // });

    return Renderer.createElement('div', {
      class: 'main',
      children: [
        this.input,
        this.keyboard,
        this.descriptions,
      ],
    });
  }
}

export default App;
