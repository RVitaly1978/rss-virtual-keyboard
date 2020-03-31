import isString from 'lodash/isString';

class Renderer {
  constructor(root) {
    this.root = root;
  }

  render(Component) {
    const component = new Component();
    this.root.appendChild(component.render());
    component.didMount();
  }

  static updateElement(parentNode, newChild, oldChild) {
    parentNode.replaceChild(newChild, oldChild);
  }

  static createElement(tag, options = {}) {
    const component = document.createElement(tag);

    const { children, ...attributes } = options;

    Object.keys(attributes).forEach((name) => {
      const attribute = document.createAttribute(name);

      attribute.value = attributes[name];
      component.setAttributeNode(attribute);
    });

    if (children) {
      while (children.length) {
        const next = children.shift();

        if (isString(next)) {
          const textNode = document.createTextNode(next);
          component.appendChild(textNode);
        } else {
          component.appendChild(next);
        }
      }
    }

    return component;
  }
}

export default Renderer;
