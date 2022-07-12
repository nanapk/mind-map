import { makingLOSMap } from './common';

export const firstBonusData = [
  { total: 20, percentage: 3 },
  { total: 60, percentage: 6 },
  { total: 120, percentage: 9 },
  { total: 240, percentage: 12 },
  { total: 400, percentage: 15 },
  { total: 680, percentage: 18 },
  { total: 1000, percentage: 21 },
];

export const makingLOSMapOldTree = (type) => {
  let nodes = [];
  let edges = [];
  let members = [];
  let groups = [];
  let memberNodes = [];
  let groupLegs = [];

  switch (type) {
    case 'bronzeFoundation1': {
      // B.F: 그룹 PV 120만, 3명이상이 20만 PV를 달성해 3%의 1차 보너스를 받고 있을 경우
      members = [
        { index: 0, id: 'A', pv: '20' },
        { index: 1, id: 'B', pv: '30' },
        { index: 2, id: 'C', pv: '30' },
        { index: 3, id: 'D', pv: '30' },
        { index: 4, id: 'E', pv: '30' },
      ];

      groups = [
        {
          parent: members[0].id,
          children: [members[1].id],
        },
        {
          parent: members[1].id,
          children: [members[2].id, members[3].id, members[4].id],
        },
      ];
      break;
    }

    case 'bronzeFoundation2': {
      members = [
        { index: 0, id: 'A', pv: '20' },
        { index: 1, id: 'B', pv: '0' },
        { index: 2, id: 'C', pv: '20' },
        { index: 3, id: 'D', pv: '20' },
        { index: 4, id: 'E', pv: '20' },
        { index: 5, id: 'F', pv: '20' },
        { index: 6, id: 'G', pv: '20' },
        { index: 7, id: 'H', pv: '20' },
      ];

      groups = [
        {
          parent: members[0].id,
          children: [members[1].id],
        },
        {
          parent: members[1].id,
          children: [members[2].id, members[3].id, members[4].id],
        },
        {
          parent: members[2].id,
          children: [members[5].id],
        },
        {
          parent: members[3].id,
          children: [members[6].id],
        },
        {
          parent: members[4].id,
          children: [members[7].id],
        },
      ];
      break;
    }

    case 'bronzeBuilder1': {
      // 그룹 PV: 400만, 3명 이상의 6%(60만 PV) 달성자
      members = [
        { index: 0, id: 'A', pv: '20' },
        { index: 1, id: 'B', pv: '30' },
        { index: 2, id: 'C', pv: '30' },
        { index: 3, id: 'D', pv: '30' },
        { index: 4, id: 'E', pv: '30' },
        { index: 5, id: 'F', pv: '30' },
        { index: 6, id: 'G', pv: '30' },
        { index: 7, id: 'H', pv: '30' },
        { index: 8, id: 'I', pv: '30' },
        { index: 9, id: 'J', pv: '20' },
        { index: 10, id: 'K', pv: '20' },
        { index: 11, id: 'L', pv: '30' },
        { index: 12, id: 'M', pv: '30' },
        { index: 13, id: 'N', pv: '30' },
        { index: 14, id: 'O', pv: '30' },
      ];

      groups = [
        {
          parent: members[0].id,
          children: [members[1].id],
        },
        {
          parent: members[1].id,
          children: [members[2].id, members[3].id, members[4].id],
        },
        {
          parent: members[2].id,
          children: [members[5].id, members[6].id, members[7].id],
        },
        {
          parent: members[3].id,
          children: [
            members[8].id,
            members[9].id,
            members[10].id,
            members[11].id,
          ],
        },
        {
          parent: members[4].id,
          children: [members[12].id, members[13].id, members[14].id],
        },
      ];
      break;
    }

    case 'bronzeBuilder2': {
      // 그룹 PV: 400만, 3명 이상의 6%(60만 PV) 달성자
      members = [
        { index: 0, id: 'A', pv: '20' },
        { index: 1, id: 'B', pv: '30' },
        { index: 2, id: 'C', pv: '20' },
        { index: 3, id: 'D', pv: '20' },
        { index: 4, id: 'E', pv: '20' },
        { index: 5, id: 'F', pv: '20' },
        { index: 6, id: 'G', pv: '20' },
        { index: 7, id: 'H', pv: '20' },
        { index: 8, id: 'I', pv: '30' },
        { index: 9, id: 'J', pv: '20' },
        { index: 10, id: 'K', pv: '20' },
        { index: 11, id: 'L', pv: '30' },
        { index: 12, id: 'M', pv: '30' },
        { index: 13, id: 'N', pv: '30' },
        { index: 14, id: 'O', pv: '30' },
        { index: 15, id: 'P', pv: '20' },
        { index: 16, id: 'Q', pv: '20' },
        { index: 17, id: 'R', pv: '20' },
      ];

      groups = [
        {
          parent: members[0].id,
          children: [members[1].id],
        },
        {
          parent: members[1].id,
          children: [members[2].id, members[3].id, members[4].id],
        },
        {
          parent: members[2].id,
          children: [members[5].id, members[6].id, members[7].id],
        },
        {
          parent: members[3].id,
          children: [members[8].id, members[9].id, members[10].id],
        },
        {
          parent: members[4].id,
          children: [members[11].id, members[12].id],
        },
        {
          parent: members[5].id,
          children: [members[13].id, members[14].id],
        },
        {
          parent: members[13].id,
          children: [members[15].id, members[16].id, members[17].id],
        },
      ];
      break;
    }

    default: {
      members = [
        { index: 0, id: 'A', pv: '20' },
        { index: 1, id: 'B', pv: '20' },
        { index: 2, id: 'C', pv: '20' },
        { index: 3, id: 'D', pv: '20' },
      ];

      groups = [
        {
          parent: members[0].id,
          children: [members[1].id],
        },
        {
          parent: members[1].id,
          children: [members[2].id, members[3].id],
        },
      ];
      break;
    }
  }

  [memberNodes, groupLegs] = makingLOSMap(members, groups);

  nodes.push(...memberNodes);
  edges.push(...groupLegs);

  return { nodes, edges };
};
