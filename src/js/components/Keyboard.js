
import Renderer from '../dom/Renderer';
import Button from './Button';

import KeyboardConfig from '../constants/KeyboardConfig';

// function colorInputElement({
//   tooltips,
//   classes,
//   id,
//   onChange,
//   currentColor,
// }) {
//   const { title, placement } = tooltips;
//   const { classList } = classes;

//   const input = InputTypeColor({
//     params: {
//       idEl: id,
//       dataTitle: title,
//       dataPlacement: placement,
//       classEl: classList,
//       currentValue: currentColor,
//     },
//   });

//   input.addEventListener('change', (e) => {
//     const { value } = e.target;

//     onChange({ id, value });
//   });

//   return input;
// }

class Keyboard {
  // constructor({ state, onChange }) {
  constructor({ state }) {
    this.state = {
      isShift: state.isShift,
      isCapsLock: state.isCapsLock,
      lang: state.lang,
    };

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

    const getKeyboardKeys = () => {
      const items = [];

      Object.values(KeyboardConfig).forEach(({ name, lowerCaseEng, className }) => {
        const button = Button({
          params: {
            idElem: name,
            nameElem: name,
            classElem: className,
          },
          inner: [lowerCaseEng],
        });

        items.push(button);
      });

      return items;
    };

    this.keyboardKeys = getKeyboardKeys();
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

  // update({ state }) {
  //   if ((this.state.primaryColor === state.primaryColor)
  //     && (this.state.secondaryColor === state.secondaryColor)) return;

  //   this.state = {
  //     primaryColor: state.primaryColor,
  //     secondaryColor: state.secondaryColor,
  //   };

  //   this.primaryColorInput.value = this.state.primaryColor;
  //   this.secondaryColorInput.value = this.state.secondaryColor;
  // }

  render() {
    this.keyboard = Renderer.createElement('div', {
      id: 'keyboard',
      class: 'keyboard',
      children: this.keyboardKeys,
    });

    return this.keyboard;
  }
}

export default Keyboard;
