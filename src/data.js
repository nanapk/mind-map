import { makingNode, makingEdge, makingLOSMap } from './common';

export const firstBonusData = [
  { total: 20, percentage: 3 },
  { total: 60, percentage: 6 },
  { total: 120, percentage: 9 },
  { total: 240, percentage: 12 },
  { total: 400, percentage: 15 },
  { total: 680, percentage: 18 },
  { total: 1000, percentage: 21 },
];

export const makingLOSMapTree = (type) => {
  let nodes = [];
  let edges = [];

  switch (type) {
    case 'bronzeBuilder': {
      const sponsorOfRootSponsor = { id: 'A', pv: '20' };
      const sponsorOfRootSponsorNode = makingNode(
        sponsorOfRootSponsor.id,
        sponsorOfRootSponsor.pv
      );
      nodes.push(sponsorOfRootSponsorNode);

      const rootSponsor = { id: 'B', pv: '40' };
      const rootSponsorEdge = makingEdge(
        sponsorOfRootSponsor.id,
        rootSponsor.id
      );
      edges.push(rootSponsorEdge);

      const group1 = [
        { id: 'C', pv: '30' },
        { id: 'D', pv: '30' },
        { id: 'E', pv: '30' },
        { id: 'F', pv: '30' },
      ];
      const group2 = [
        { id: 'G', pv: '30' },
        { id: 'H', pv: '40' },
        { id: 'I', pv: '30' },
        { id: 'J', pv: '20' },
      ];
      const group3 = [
        { id: 'K', pv: '50' },
        { id: 'L', pv: '30' },
        { id: 'M', pv: '40' },
        { id: 'N', pv: '30' },
      ];
      const [mapNodes, mapEdges] = makingLOSMap(rootSponsor, [
        group1,
        group2,
        group3,
      ]);

      nodes.push(...mapNodes);
      edges.push(...mapEdges);
      break;
    }
    default: {
      const rootSponsor = { id: 'A', pv: '20' };
      const group = [
        { id: 'B', pv: '20' },
        { id: 'C', pv: '20' },
        { id: 'D', pv: '20' },
      ];
      const [mapNodes, mapEdges] = makingLOSMap(rootSponsor, [group]);
      nodes.push(...mapNodes);
      edges.push(...mapEdges);
      break;
    }
  }
  return { nodes, edges };
};