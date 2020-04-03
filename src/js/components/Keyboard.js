
import Renderer from '../dom/Renderer';
import Button from './Button';

import KeyboardLayout from '../constants/KeyboardLayout';

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
  // constructor({ state, onChange }) {
  constructor({ state }) {
    this.state = { ...state };

    // this.onChange = onChange;

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
      state: this.state,
    });
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
    } = this.state;
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
    this.keyboard = Renderer.createElement('div', {
      id: 'keyboard',
      class: 'keyboard',
      children: [...this.keyboardKeys],
    });

    return this.keyboard;
  }
}

export default Keyboard;
