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
