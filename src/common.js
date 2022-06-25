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

export function makingEdge(source, target) {
  return {
    data: {
      id: `${source}->${target}`,
      source,
      target,
    },
  };
}

export function makingNode(id, pv) {
  return {
    data: {
      id,
      pv,
      label: `${id}(${pv})`,
    },
  };
}

function makingGroup(group) {
  const sponsor = Object.assign(group[0]);
  const partners = group.slice(1);
  const groupNodes = group.map((member) => makingNode(member.id, member.pv));
  const groupEdges = partners.map((member) =>
    makingEdge(sponsor.id, member.id)
  );
  return [groupNodes, groupEdges, sponsor];
}

function connectingSponsorsAndRootSponsor(sponsors, rootSponsor) {
  return sponsors.map((sponsor) => makingEdge(rootSponsor.data.id, sponsor.id));
}

export function makingLOSMap(root, groups) {
  const rootSponsorNode = makingNode(root.id, root.pv);
  const nodes = [rootSponsorNode];
  const edges = [];
  const sponsorGroup = [];

  for (let i = 0; i < groups.length; i++) {
    const [groupNodes, groupEdges, sponsor] = makingGroup(groups[i]);
    nodes.push(...groupNodes);
    edges.push(...groupEdges);
    sponsorGroup.push(sponsor);
  }

  const sponsorEdges = connectingSponsorsAndRootSponsor(
    sponsorGroup,
    rootSponsorNode
  );

  edges.push(...sponsorEdges);

  return [nodes, edges];
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
