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

function makingEdge(source, target) {
  return {
    data: {
      id: `${source}->${target}`,
      source,
      target,
    },
  };
}

function makingNode(node) {
  const { id, pv, index } = node;
  return {
    data: {
      id,
      pv,
      index,
      label: `${id}(${pv})`,
    },
  };
}

function makingLeg(group) {
  const { parent, children } = group;
  return children.map((child) => makingEdge(parent, child));
}

export function makingLOSMap(members, groups) {
  const memberNodes = members.map((member) => makingNode(member));
  const groupLegs = groups.reduce((prev, cur) => {
    const leg = makingLeg(cur);
    prev.push(...leg);
    return prev;
  }, []);

  return [memberNodes, groupLegs];
}

document
  .querySelector('.menu-button[action="close"]')
  .addEventListener('click', function () {
    hideMenu();
  });

export function getNewId(cy) {
  const ALPHABET_COUNT = 26;
  const CAPITAL_A_ASCII = 65;
  const SMALL_A_ASCII = 97;
  const capitalASCIIArray = Array.from(
    new Array(ALPHABET_COUNT),
    (x, i) => i + CAPITAL_A_ASCII
  );
  const smallASCIIArray = Array.from(
    new Array(ALPHABET_COUNT),
    (x, i) => i + SMALL_A_ASCII
  );

  const nodesASCII = [];
  cy.nodes((node) => {
    const nodeIdASCII = node.data('id').charCodeAt();
    nodesASCII.push(nodeIdASCII);
  });

  let resultASCII = null;
  let find = false;
  for (let i = 0; i < capitalASCIIArray.length; i++) {
    if (!nodesASCII.includes(capitalASCIIArray[i])) {
      resultASCII = capitalASCIIArray[i];
      find = true;
      break;
    }
  }

  if (!find) {
    for (let i = 0; i < smallASCIIArray.length; i++) {
      if (!nodesASCII.includes(smallASCIIArray[i])) {
        resultASCII = smallASCIIArray[i];
        find = true;
        break;
      }
    }
  }

  if (find) return String.fromCharCode(resultASCII);
  else return '';
}
