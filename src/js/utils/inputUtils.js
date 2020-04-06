
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

  if (selectionStart !== selectionEnd) {
    input.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
    input.selectionStart = selectionStart;
  } else {
    input.value = value.slice(0, selectionStart - 1) + value.slice(selectionStart);
    input.selectionStart = selectionStart - 1;
  }

  input.selectionEnd = selectionStart - 1;
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
    } else {
      input.selectionStart = selectionStart - 1;
      input.selectionEnd = selectionStart - 1;
    }
  } else if (selectionDirection === 'forward') {
    // console.log('ArrowLeft --- forward', selectionStart, selectionEnd, selectionDirection);
    input.selectionEnd = selectionEnd - 1;
  } else if (selectionDirection === 'backward') {
    // console.log('ArrowLeft --- backward', selectionStart, selectionEnd, selectionDirection);
    input.selectionStart = selectionStart - 1;
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
