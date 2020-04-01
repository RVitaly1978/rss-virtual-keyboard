import Renderer from '../dom/Renderer';

function Button({ params, inner = [] }) {
  const {
    idElem = '',
    classElem = '',
    dataKey = '',
    backgroundImgUrl = '',
    typeButton = 'button',
    tabIndex = '0',
  } = params;

  const node = Renderer.createElement('button', {
    type: typeButton,
    id: idElem,
    'data-key': dataKey,
    style:
      backgroundImgUrl !== ''
        ? `background-image: url(${backgroundImgUrl})`
        : '',
    class: classElem,
    tabindex: tabIndex,
    children: inner,
  });

  return node;
}

export default Button;
