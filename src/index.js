import './styles/index.scss';

import Descriptions from './js/constants/Descriptions';
import KeyboardConfig from './js/constants/KeyboardConfig';

const languages = {
  ENG: 'eng',
  RU: 'ru',
};

let shiftLeftStatus = false;
let shiftRightStatus = false;
let ctrlLeftStatus = false;
let altLeftStatus = false;
let capsLockStatus = (localStorage.getItem('StatusCapsLock') === null) ? false : ((localStorage.getItem('StatusCapsLock') === 'true'));
let lang = (localStorage.getItem('lang') === null) ? languages.ENG : localStorage.getItem('lang');

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.append(wrapper);

const textarea = document.createElement('textarea');
textarea.id = 'textarea';
textarea.className = 'keyboard-input';
textarea.name = 'textarea';
textarea.cols = 60;
textarea.rows = 6;
textarea.autofocus = true;
wrapper.append(textarea);

const keyboard = document.createElement('div');
keyboard.id = 'keyboard';
keyboard.className = 'keyboard';
wrapper.append(keyboard);

Object.values(KeyboardConfig).forEach(({ name, className }) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.name = name;
  button.id = name;
  button.className = className;
  button.textContent = ' ';
  keyboard.append(button);
});

const descriptions = document.createElement('div');
descriptions.className = 'descriptions__container';
Object.keys(Descriptions).forEach((key) => {
  const option = document.createElement('p');
  option.className = 'descriptions__option';
  option.textContent = key;

  const value = document.createElement('p');
  value.className = 'descriptions__value';
  value.textContent = Descriptions[key];

  descriptions.append(value);
  descriptions.append(option);
});
wrapper.append(descriptions);

const buttons = document.querySelectorAll('button');

const displayKeyValue = {
  LOWER_CASE_RU: 'lowerCaseRu',
  UPPER_CASE_RU: 'upperCaseRu',
  LOWER_CASE_ENG: 'lowerCaseEng',
  UPPER_CASE_ENG: 'upperCaseEng',
};

function getDisplayKeyValue(capsLock, shiftLeft, shiftRight) {
  const isShiftModifier = shiftLeft || shiftRight;
  switch (true) {
    case (lang === 'ru') && capsLock:
      return isShiftModifier ? displayKeyValue.LOWER_CASE_RU : displayKeyValue.UPPER_CASE_RU;
    case (lang === 'ru') && !capsLock:
      return isShiftModifier ? displayKeyValue.UPPER_CASE_RU : displayKeyValue.LOWER_CASE_RU;
    case (lang === 'eng') && capsLock:
      return isShiftModifier ? displayKeyValue.LOWER_CASE_ENG : displayKeyValue.UPPER_CASE_ENG;
    case (lang === 'eng') && !capsLock:
      return isShiftModifier ? displayKeyValue.UPPER_CASE_ENG : displayKeyValue.LOWER_CASE_ENG;
    default:
      throw new Error('no more cases');
  }
}

function renderButtons(capsLock, shiftLeft, shiftRight) {
  const displayValue = getDisplayKeyValue(capsLock, shiftLeft, shiftRight);

  buttons.forEach((button) => {
    const keyCode = button.id;
    /* eslint-disable no-param-reassign */
    button.textContent = KeyboardConfig[keyCode][displayValue];
    /* eslint-enable no-param-reassign */
  });
}

renderButtons(capsLockStatus, shiftLeftStatus, shiftRightStatus);
if (capsLockStatus === true) document.querySelector('#CapsLock').classList.add('key--active');

function insertChar(text, cursorStart, cursorEnd, char) {
  if (cursorStart !== cursorEnd) {
    textarea.value = text.slice(0, cursorStart) + char + text.slice(cursorEnd);
  } else {
    textarea.value = text.slice(0, cursorStart) + char + text.slice(cursorStart);
  }
  textarea.selectionStart = cursorStart + 1;
  textarea.selectionEnd = textarea.selectionStart;
}

function removeActive(btn) {
  btn.addEventListener('transitionend', () => {
    btn.classList.remove('key--active');
  });
}

function handlePressTab(Tab, initialText, cursorStart, cursorEnd) {
  insertChar(initialText, cursorStart, cursorEnd, '\t');
  Tab.classList.add('key--active');
  removeActive(Tab);
}

function handlePressEnter(Enter, initialText, cursorStart, cursorEnd) {
  insertChar(initialText, cursorStart, cursorEnd, '\n');
  Enter.classList.add('key--active');
  removeActive(Enter);
}

function handlePressBackspace(Backspace, initialText, cursorStart, cursorEnd) {
  if (cursorStart !== cursorEnd) {
    textarea.value = initialText.slice(0, cursorStart) + initialText.slice(cursorEnd);
    textarea.selectionStart = cursorStart;
  } else {
    textarea.value = initialText.slice(0, cursorStart - 1) + initialText.slice(cursorStart);
    textarea.selectionStart = cursorStart - 1;
  }
  textarea.selectionEnd = textarea.selectionStart;
  Backspace.classList.add('key--active');
  removeActive(Backspace);
}

function handlePressDelete(Delete, initialText, cursorStart, cursorEnd) {
  if (cursorStart !== cursorEnd) {
    textarea.value = initialText.slice(0, cursorStart) + initialText.slice(cursorEnd);
  } else {
    textarea.value = initialText.slice(0, cursorStart) + initialText.slice(cursorStart + 1);
  }
  textarea.selectionStart = cursorStart;
  textarea.selectionEnd = textarea.selectionStart;
  Delete.classList.add('key--active');
  removeActive(Delete);
}

function handlePressArrowLeft(ArrowLeft, cursorStart, cursorEnd) {
  if (cursorStart !== cursorEnd) {
    textarea.selectionStart = cursorStart;
  } else {
    textarea.selectionStart = cursorStart - 1;
  }
  textarea.selectionEnd = textarea.selectionStart;
  ArrowLeft.classList.add('key--active');
  removeActive(ArrowLeft);
}

function handlePressArrowRight(ArrowRight, cursorStart, cursorEnd) {
  if (cursorStart !== cursorEnd) {
    textarea.selectionStart = cursorEnd;
  } else {
    textarea.selectionStart = cursorStart + 1;
  }
  textarea.selectionEnd = textarea.selectionStart;
  ArrowRight.classList.add('key--active');
  removeActive(ArrowRight);
}

function handlePressCapsLock(CapsLock) {
  capsLockStatus = !capsLockStatus;
  localStorage.setItem('StatusCapsLock', capsLockStatus);
  CapsLock.classList.toggle('key--active');
}

function handlePressShiftLeft(ShiftLeft) {
  shiftLeftStatus = !shiftLeftStatus;
  ShiftLeft.classList.toggle('key--active');
}

function handlePressShiftRight(ShiftRight) {
  shiftRightStatus = !shiftRightStatus;
  ShiftRight.classList.toggle('key--active');
}

function handlePressControlLeft(ControlLeft) {
  ctrlLeftStatus = !ctrlLeftStatus;
  ControlLeft.classList.toggle('key--active');
}

function handlePressAltLeft(AltLeft) {
  altLeftStatus = !altLeftStatus;
  AltLeft.classList.toggle('key--active');
}

function handlePressNonFuncBtn(btn) {
  btn.classList.add('key--active');
  removeActive(btn);
}

function handlePressBtn(btn, initialText, cursorStart, cursorEnd) {
  insertChar(initialText, cursorStart, cursorEnd, btn.textContent);
  btn.classList.add('key--active');
  removeActive(btn);
}

function inputKeys(initialText, cursorStart, cursorEnd, btn) {
  switch (btn.id) {
    case 'Tab':
      handlePressTab(btn, initialText, cursorStart, cursorEnd);
      break;
    case 'Enter':
      handlePressEnter(btn, initialText, cursorStart, cursorEnd);
      break;
    case 'Backspace':
      handlePressBackspace(btn, initialText, cursorStart, cursorEnd);
      break;
    case 'Delete':
      handlePressDelete(btn, initialText, cursorStart, cursorEnd);
      break;
    case 'ArrowLeft':
      handlePressArrowLeft(btn, cursorStart, cursorEnd);
      break;
    case 'ArrowRight':
      handlePressArrowRight(btn, cursorStart, cursorEnd);
      break;
    case 'CapsLock':
      handlePressCapsLock(btn);
      break;
    case 'ShiftLeft':
      if (shiftRightStatus) {
        shiftRightStatus = !shiftRightStatus;
        document.querySelector('#ShiftRight').classList.remove('key--active');
        btn.classList.add('key--active');
        setTimeout(() => { btn.classList.remove('key--active'); }, 100);
      } else {
        handlePressShiftLeft(btn);
      }
      break;
    case 'ShiftRight':
      if (shiftLeftStatus) {
        shiftLeftStatus = !shiftLeftStatus;
        document.querySelector('#ShiftLeft').classList.remove('key--active');
        btn.classList.add('key--active');
        setTimeout(() => { btn.classList.remove('key--active'); }, 100);
      } else {
        handlePressShiftRight(btn);
      }
      break;
    case 'ControlRight':
      handlePressNonFuncBtn(btn);
      break;
    case 'AltRight':
      handlePressNonFuncBtn(btn);
      break;
    case 'MetaLeft':
      handlePressNonFuncBtn(btn);
      break;
    case 'ControlLeft':
      if (altLeftStatus) {
        lang = (lang === 'ru') ? 'eng' : 'ru';
        localStorage.setItem('lang', lang);
        altLeftStatus = !altLeftStatus;
        document.querySelector('#AltLeft').classList.remove('key--active');
        btn.classList.add('key--active');
        setTimeout(() => { btn.classList.remove('key--active'); }, 100);
      } else {
        handlePressControlLeft(btn);
      }
      break;
    case 'AltLeft':
      if (ctrlLeftStatus) {
        lang = (lang === 'ru') ? 'eng' : 'ru';
        localStorage.setItem('lang', lang);
        ctrlLeftStatus = !ctrlLeftStatus;
        document.querySelector('#ControlLeft').classList.remove('key--active');
        btn.classList.add('key--active');
        setTimeout(() => { btn.classList.remove('key--active'); }, 100);
      } else {
        handlePressAltLeft(btn);
      }
      break;
    default:
      if (shiftLeftStatus) {
        shiftLeftStatus = !shiftLeftStatus;
        document.querySelector('#ShiftLeft').classList.remove('key--active');
        handlePressBtn(btn, initialText, cursorStart, cursorEnd);
      } else if (shiftRightStatus) {
        shiftRightStatus = !shiftRightStatus;
        document.querySelector('#ShiftRight').classList.remove('key--active');
        handlePressBtn(btn, initialText, cursorStart, cursorEnd);
      } else if (ctrlLeftStatus) {
        ctrlLeftStatus = !ctrlLeftStatus;
        document.querySelector('#ControlLeft').classList.remove('key--active');
      } else if (altLeftStatus) {
        altLeftStatus = !altLeftStatus;
        document.querySelector('#AltLeft').classList.remove('key--active');
      } else {
        handlePressBtn(btn, initialText, cursorStart, cursorEnd);
      }
  }
}

document.querySelector('.keyboard').addEventListener('mousedown', (evt) => {
  if (evt.target.type !== 'button') return;
  const btn = evt.target;
  const initialText = textarea.value;
  const cursorStart = textarea.selectionStart;
  const cursorEnd = textarea.selectionEnd;
  inputKeys(initialText, cursorStart, cursorEnd, btn);
  renderButtons(capsLockStatus, shiftLeftStatus, shiftRightStatus);
  textarea.focus();
});

document.querySelector('.keyboard').addEventListener('click', () => {
  textarea.focus();
});

document.querySelector('#textarea').addEventListener('keydown', (evt) => {
  evt.preventDefault();
  const btn = document.getElementById(evt.code);
  const initialText = textarea.value;
  const cursorStart = textarea.selectionStart;
  const cursorEnd = textarea.selectionEnd;
  if (btn.id === 'ShiftLeft' || btn.id === 'ShiftRight' || btn.id === 'ControlLeft' || btn.id === 'AltLeft') {
    if (evt.repeat === true) return;
  }
  inputKeys(initialText, cursorStart, cursorEnd, btn);
  renderButtons(capsLockStatus, shiftLeftStatus, shiftRightStatus);
  textarea.focus();
});
