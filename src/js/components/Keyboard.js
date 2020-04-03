
import Renderer from '../dom/Renderer';
import State from './State';
import Button from './Button';

import KeyboardLayout from '../constants/KeyboardLayout';
import { getNextLanguage } from '../constants/KeyboardLanguages';

import getKeyCase from '../utils/getKeyCase';

function getKeyboardKeys({ state }) {
  const items = [];
  const { lang } = state;

  Object.keys(KeyboardLayout[lang]).forEach((key) => {
    const { type } = KeyboardLayout[lang][key];
    const keyCase = getKeyCase({
      state,
      keyType: type,
    });
    const keyCaseContent = KeyboardLayout[lang][key][keyCase];

    const { className } = KeyboardLayout.EN[key];

    const button = Button({
      params: {
        idElem: key,
        nameElem: key,
        classElem: className,
      },
      inner: [keyCaseContent],
    });

    items.push(button);
  });

  return items;
}

function getKeyContent({ state, button }) {
  const { lang } = state;
  const { name: key } = button;

  const { type } = KeyboardLayout[lang][key];

  const keyCase = getKeyCase({
    state,
    keyType: type,
  });

  const keyCaseContent = KeyboardLayout[lang][key][keyCase];
  return keyCaseContent;
}

class Keyboard {
  constructor({ state, onChange }) {
    this.state = new State({ ...state });
    this.setState = this.setState.bind(this);

    this.onChange = onChange;
    this.onStateChange = this.onStateChange.bind(this);
    this.state.subscribe(this.onStateChange);

    // this.update = this.update.bind(this);

    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleButtonClick = this.handleButtonClick.bind(this);

    // this.primaryColorInput = colorInputElement({
    //   tooltips: Tooltips[IdList.colorPalettes.primaryColor],
    //   classes: ClassLists.primaryColor,
    //   id: IdList.colorPalettes.primaryColor,
    //   onChange: this.handleInputChange,
    //   currentColor: this.state.primaryColor,
    // });

    this.keyboardKeys = getKeyboardKeys({
      state: this.state.getState(),
    });

    this.keyboard = Renderer.createElement('div', {
      id: 'keyboard',
      class: 'keyboard',
      children: [...this.keyboardKeys],
    });
  }

  setState(nextState) {
    this.state.update(nextState);
    this.state.notify();
  }

  onStateChange() {
    this.onChange(this.state.getState());
  }

  // handleInputChange({ id, value }) {
  //   if (id === IdList.colorPalettes.primaryColor) {
  //     this.state.primaryColor = value;
  //   } else {
  //     this.state.secondaryColor = value;
  //   }

  //   this.onChange(this.state);
  // }

  // handleButtonClick() {
  //   const color = this.state.primaryColor;

  //   this.state.primaryColor = this.state.secondaryColor;
  //   this.primaryColorInput.value = this.state.secondaryColor;

  //   this.state.secondaryColor = color;
  //   this.secondaryColorInput.value = color;

  //   this.onChange(this.state);
  // }

  updateKeyClass(state) {
    const {
      isCapsLock: prevIsCapsLock,
      isShift: prevIsShift,
      currentKey: prevCurrentKey,
    } = this.state.getState();
    this.state = { ...this.state, ...state };
    const keyId = this.state.currentKey || prevCurrentKey;

    const toggleKeyClass = (button, isButtonPress) => {
      button.classList.toggle('key--active', isButtonPress);
    };

    const getButton = (id) => {
      let keyIndex;
      this.keyboardKeys.forEach((button, index) => {
        if (button.id === id) {
          keyIndex = index;
        }
      });
      return this.keyboardKeys[keyIndex];
    };

    const button = getButton(keyId);
    const { type: CapsLock } = KeyboardLayout.EN.CapsLock;
    const { type: ShiftLeft } = KeyboardLayout.EN.ShiftLeft;
    const { type: ShiftRight } = KeyboardLayout.EN.ShiftRight;

    if ((keyId === CapsLock) && (prevIsCapsLock)) {
      toggleKeyClass(button, prevIsCapsLock);
    } else if (((keyId === ShiftLeft) || (keyId === ShiftRight))
      && (prevIsShift)) {
      const shiftLeftButton = getButton(ShiftLeft);
      const shiftRightButton = getButton(ShiftRight);
      toggleKeyClass(shiftLeftButton, false);
      toggleKeyClass(shiftRightButton, false);
    } else {
      toggleKeyClass(button, this.state.isMousedown);
    }
  }

  updateState({ state }) {
    const {
      isShift: prevIsShift,
      isCapsLock: prevIsCapsLock,
      lang: prevLang,
    } = this.state;
    this.state = { ...this.state, ...state };

    if ((this.state.isShift !== prevIsShift)
      || (this.state.isCapsLock !== prevIsCapsLock)
      || (this.state.lang !== prevLang)) {
      this.keyboardKeys.forEach((button) => {
        const key = button;
        const keyContent = getKeyContent({
          state: this.state,
          button: key,
        });
        key.textContent = keyContent;
      });
    }
  }

  render() {
    this.keyboard.addEventListener('mousedown', (evt) => {
      if (evt.target.tagName !== 'BUTTON') return;

      const { id } = evt.target;
      this.currentKey = id;
      this.isMousedown = true;
      this.updateKeyClass();

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

      // this.textarea.focus();
    });

    document.addEventListener('mouseup', () => {
      if (this.isMousedown) {
        this.currentKey = null;
        this.isMousedown = false;
        this.updateKeyClass();
      }
    });

    return this.keyboard;
  }
}

export default Keyboard;
