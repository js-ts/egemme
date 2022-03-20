function addClassList(el, list) {
  if (Array.isArray(list) && list.length > 0) {
    list.forEach(cls => {
      el.classList.add(cls);
    });
  } else if (list !== "") {
    el.classList.add(list);
  }
}

function registerListeners(el, listeners) {
  listeners.forEach(({ event, fn }) => {
    el.addEventListener(event, fn);
  });
}

function isElement(el) {
  return el instanceof HTMLElement || el instanceof Node;
}

function createChildren(el, children = []) {
  children.forEach(child => {
    if (isElement(child)) {
      el.appendChild(child);
    } else {
      const { tag, attr, listeners } = child;
      const childEl = createElement(tag, attr, listeners);
      el.appendChild(childEl);
    }
  });
}

export default function createElement(tag, attr = {}, listeners = []) {
  let element = null;
  let hasChildren = false;

  try {
    const { classList, children, ...restAttrs } = attr;
    element = document.createElement(tag);

    if (classList) {
      addClassList(element, classList);
    }
    registerListeners(element, listeners);

    if (children) {
      createChildren(element, children);
      hasChildren = true;
    }

    Object.entries(restAttrs).forEach(([key, value]) => {
      if (hasChildren && (key === "innerText" || key === "innerHTML")) {
        return;
      }

      if (typeof value === "boolean") {
        element.setAttribute(key, value);
        return;
      }

      element[key] = value;
    });
  } catch (error) {
    console.error(error);
  }

  return element;
}
