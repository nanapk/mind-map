export function showElement(className) {
  document.querySelector(`.${className}`).classList.add('show');
  document.querySelector(`.${className}`).classList.remove('hide');
}

export function hideElement(className) {
  document.querySelector(`.${className}`).classList.add('hide');
  document.querySelector(`.${className}`).classList.remove('show');
}

export function showMenu() {
  showElement('gray-background');
  showElement('menu');
}

export function hideMenu() {
  hideElement('gray-background');
  hideElement('menu');
}

export function GetNewID() {
  if (curASCII == 91) curASCII = 97;
  return String.fromCharCode(curASCII++);
}

function addNode() {}

function deleteNode(id) {}
