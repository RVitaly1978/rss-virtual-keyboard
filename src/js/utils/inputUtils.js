
import {
  KeyboardLayout,
  CharKeys,
} from '../constants/KeyboardLayout';

function insertChar({ textarea, char }) {
  const input = textarea;
  const { selectionStart } = input;

  input.setRangeText(char);
  input.selectionStart = selectionStart + 1;
  input.selectionEnd = selectionStart + 1;
}

function handlePressTab({ textarea }) {
  const char = CharKeys[KeyboardLayout.EN.Tab.type];
  insertChar({ textarea, char });
}

function handlePressEnter({ textarea }) {
  const char = CharKeys[KeyboardLayout.EN.Enter.type];
  insertChar({ textarea, char });
}

function handlePressBackspace({ textarea }) {
  const input = textarea;
  const { value, selectionStart, selectionEnd } = input;

  if ((selectionStart !== selectionEnd) && (selectionStart !== 0)) {
    input.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
    input.selectionStart = selectionStart;
    input.selectionEnd = selectionStart;
  } else if ((selectionStart !== selectionEnd) && (selectionStart === 0)) {
    input.value = value.slice(selectionEnd);
    input.selectionStart = 0;
    input.selectionEnd = 0;
  } else if ((selectionStart === selectionEnd) && (selectionStart !== 0)) {
    input.value = value.slice(0, selectionStart - 1) + value.slice(selectionStart);
    input.selectionStart = selectionStart - 1;
    input.selectionEnd = selectionStart - 1;
  } else {
    input.selectionStart = 0;
    input.selectionEnd = 0;
  }
}

function handlePressDelete({ textarea }) {
  const input = textarea;
  const { value, selectionStart, selectionEnd } = input;

  if (selectionStart !== selectionEnd) {
    input.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
  } else {
    input.value = value.slice(0, selectionStart) + value.slice(selectionStart + 1);
  }

  input.selectionStart = selectionStart;
  input.selectionEnd = selectionStart;
}

function handlePressArrowLeft({ textarea, isShift }) {
  const input = textarea;
  const { selectionStart, selectionEnd, selectionDirection } = input;

  if (!isShift) {
    if (selectionStart !== selectionEnd) {
      input.selectionStart = selectionStart;
      input.selectionEnd = selectionStart;
    } else if (selectionStart === 0) {
      input.selectionStart = 0;
      input.selectionEnd = 0;
    } else {
      input.selectionStart = selectionStart - 1;
      input.selectionEnd = selectionStart - 1;
    }
  } else if ((selectionDirection === 'forward') && (selectionStart !== 0)) { // --------------------------------
    input.selectionStart = selectionStart;
    input.selectionEnd = selectionEnd - 1;
  } else if ((selectionDirection === 'forward') && (selectionStart === 0)) { // --------------------------------
    input.selectionStart = 0;
    input.selectionEnd = selectionEnd - 1;
  } else if ((selectionDirection === 'backward') && (selectionStart !== 0)) {
    input.selectionStart = selectionStart - 1;
    input.selectionEnd = selectionEnd;
  } else {
    input.selectionStart = 0;
    input.selectionEnd = selectionEnd;
  }
}

function handlePressArrowRight({ textarea, isShift }) {
  const input = textarea;
  const { selectionStart, selectionEnd, selectionDirection } = input;

  if (!isShift) {
    if (selectionStart !== selectionEnd) {
      input.selectionStart = selectionEnd;
      input.selectionEnd = selectionEnd;
    } else {
      input.selectionStart = selectionStart + 1;
      input.selectionEnd = selectionStart + 1;
    }
  } else if (selectionDirection === 'forward') {
    input.selectionEnd = selectionEnd + 1;
  } else if (selectionDirection === 'backward') {
    input.selectionStart = selectionStart + 1;
  }
}

function handlePressArrowUp({ textarea, isShift }) {
  const input = textarea;
  const { selectionStart, selectionEnd } = input;

  if (!isShift) {
    input.selectionEnd = 0;
  } else if (selectionStart !== selectionEnd) {
    input.selectionEnd = selectionStart;
  }

  input.selectionStart = 0;
}

function handlePressArrowDown({ textarea, isShift }) {
  const input = textarea;
  const { selectionStart, selectionEnd } = input;
  const { length } = input.value;

  if (!isShift) {
    input.selectionStart = length;
  } else if (selectionStart !== selectionEnd) {
    input.selectionStart = selectionEnd;
  }

  input.selectionEnd = length;
}

export {
  insertChar,
  handlePressTab,
  handlePressEnter,
  handlePressBackspace,
  handlePressDelete,
  handlePressArrowLeft,
  handlePressArrowRight,
  handlePressArrowUp,
  handlePressArrowDown,
};
