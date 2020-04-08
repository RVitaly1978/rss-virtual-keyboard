import Renderer from '../dom/Renderer';

function Button({ params, inner = [] }) {
  const {
    idElem = '',
    classElem = '',
    nameElem = '',
    dataType = '',
    backgroundImgUrl = '',
    typeButton = 'button',
    tabIndex = '0',
  } = params;

  const node = Renderer.createElement('button', {
    type: typeButton,
    id: idElem,
    name: nameElem,
    'data-type': dataType,
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
