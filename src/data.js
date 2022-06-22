export const firstBonusData = [
  { total: 20, percentage: 3 },
  { total: 60, percentage: 6 },
  { total: 120, percentage: 9 },
  { total: 240, percentage: 12 },
  { total: 400, percentage: 15 },
  { total: 680, percentage: 18 },
  { total: 1000, percentage: 21 },
];

export const initData = [];

export const elements = {
  nodes: [
    {
      data: {
        id: 'A',
        pv: '20', // 만 단위
        label: 'A(20)',
      },
    },
    {
      data: {
        id: 'B',
        pv: '20', // 만 단위
        label: 'B(20)',
      },
    },
    {
      data: {
        id: 'C',
        pv: '20', // 만 단위
        label: 'C(20)',
      },
    },
    {
      data: {
        id: 'D',
        pv: '20', // 만 단위
        label: 'D(20)',
      },
    },
  ],
  edges: [
    {
      data: { id: 'A->B', source: 'A', target: 'B' },
    },

    {
      data: { id: 'B->C', source: 'B', target: 'C' },
    },

    {
      data: { id: 'B->D', source: 'B', target: 'D' },
    },
  ],
};
