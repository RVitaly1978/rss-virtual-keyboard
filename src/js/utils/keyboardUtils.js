
import KeyboardLayout from '../constants/KeyboardLayout';
import Button from '../components/Button';

const KeyCases = {
  LOWER_CASE: 'lowerCase',
  UPPER_CASE: 'upperCase',
};

function getKeyCase({ state, keyType }) {
  const { isShift, isCapsLock } = state;

  switch (keyType) {
    case 'symbol':
      if (isShift) {
        return KeyCases.UPPER_CASE;
      }
      return KeyCases.LOWER_CASE;
    case 'letter':
      if ((isShift && isCapsLock) || (!isShift && !isCapsLock)) {
        return KeyCases.LOWER_CASE;
      }
      return KeyCases.UPPER_CASE;
    default:
      return KeyCases.LOWER_CASE;
  }
}

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

function getButton(buttons, id) {
  let keyIndex;
  buttons.forEach((button, index) => {
    if (button.id === id) {
      keyIndex = index;
    }
  });

  return buttons[keyIndex];
}

function toggleKeyClass(buttons, id, isMousedown) {
  const button = getButton(buttons, id);
  button.classList.toggle('key--active', isMousedown);
}

export {
  getKeyCase,
  getKeyboardKeys,
  getKeyContent,
  getButton,
  toggleKeyClass,
};
