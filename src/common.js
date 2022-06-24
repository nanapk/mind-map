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
