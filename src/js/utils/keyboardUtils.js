
import { KeyboardLayout } from '../constants/KeyboardLayout';
import Button from '../components/Button';

const KeyCases = {
  LOWER_CASE: 'lowerCase',
  UPPER_CASE: 'upperCase',
};

const SYMBOL = 'symbol';
const LETTER = 'letter';

function getKeyCase({ state, keyType }) {
  const { isShift, isCapsLock } = state;

  switch (keyType) {
    case SYMBOL:
      if (isShift) return KeyCases.UPPER_CASE;
      return KeyCases.LOWER_CASE;
    case LETTER:
      if ((isShift && isCapsLock)
        || (!isShift && !isCapsLock)) return KeyCases.LOWER_CASE;
      return KeyCases.UPPER_CASE;
    default:
      return KeyCases.LOWER_CASE;
  }
}

function getKeyboardKeys({ state }) {
  const items = [];
  const { language } = state;

  Object.keys(KeyboardLayout[language]).forEach((key) => {
    const { type } = KeyboardLayout[language][key];
    const keyCase = getKeyCase({
      state,
      keyType: type,
    });
    const keyCaseContent = KeyboardLayout[language][key][keyCase];

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
  const { language } = state;
  const { name: key } = button;

  const { type } = KeyboardLayout[language][key];

  const keyCase = getKeyCase({
    state,
    keyType: type,
  });

  const keyCaseContent = KeyboardLayout[language][key][keyCase];
  return keyCaseContent;
}

function getButton(buttons, id) {
  let keyIndex;

  buttons.forEach((button, index) => {
    if (button.id === id) {
      keyIndex = index;
    }
  });

  return buttons[keyIndex];
}

export {
  getKeyCase,
  getKeyboardKeys,
  getKeyContent,
  getButton,
};
