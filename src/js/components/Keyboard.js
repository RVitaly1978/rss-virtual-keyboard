
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

  updateState({ state }) {
    const {
      isShift: oldIsShift,
      isCapsLock: oldIsCapsLock,
      lang: oldLang,
    } = this.state;

    this.state = { ...state };

    if ((this.state.isShift !== oldIsShift)
      || (this.state.isCapsLock !== oldIsCapsLock)
      || (this.state.lang !== oldLang)) {
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
