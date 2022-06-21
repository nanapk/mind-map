export const firstBonusData = [
  { total: 20, percentage: 3 },
  { total: 60, percentage: 6 },
  { total: 120, percentage: 9 },
  { total: 240, percentage: 12 },
  { total: 400, percentage: 15 },
  { total: 680, percentage: 18 },
  { total: 1000, percentage: 21 },
];

export const initData = [
  {
    data: {
      id: 'A',
      pv: '20', // 만 단위
      label: 'A',
    },
  },
  {
    data: {
      id: 'B',
      pv: '20', // 만 단위
      label: 'B',
    },
  },
  {
    data: { id: 'A->B', source: 'B', target: 'A' },
  },
  {
    data: {
      id: 'C',
      pv: '20', // 만 단위
      label: 'C',
    },
  },
  {
    data: { id: 'B->C', source: 'C', target: 'B' },
  },
  {
    data: {
      id: 'D',
      pv: '20', // 만 단위
      label: 'D',
    },
  },
  {
    data: { id: 'B->D', source: 'D', target: 'B' },
  },
];
