//mport './favicon.ico';
// favicon build
//import '../model/data.json';
// data build
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';

cytoscape.use(coseBilkent);

import './style.css';
// webpack으로 묶어줘야 하니 css파일을 진입점인 index.js 에 import 합니다

import { makingFirstBonusChart, applyTargetBonus } from './bonus';
import { showMenu, hideMenu } from './common';

const data = [
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
    data: { id: 'A->C', source: 'C', target: 'A' },
  },
];

let curASCII = 68; // D
function GetNewID() {
  if (curASCII == 91) curASCII = 97;
  return String.fromCharCode(curASCII++);
}

// node & font 크기 값
const edgeWidth = '2px';
const arrowScale = 0.8;
// edge & arrow 크기값
const edgeColor = '#ced6e0';
const nodeColor = '#57606f';

// 아래는 공식 사이트에 올라와 있는 예제 코드입니다
const cy = cytoscape({
  container: document.getElementById('cy'), // container to render in

  elements: data,

  style: [
    // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': nodeColor,
        label: 'data(label)',
        color: nodeColor,
      },
    },

    {
      selector: 'edge',
      style: {
        width: edgeWidth,
        'curve-style': 'bezier',
        'line-color': edgeColor,
        'source-arrow-color': edgeColor,
        'source-arrow-shape': 'vee',
        'arrow-scale': arrowScale,
      },
    },
  ],

  layout: {
    name: 'cose-bilkent',
    animate: false,
    gravityRangeCompound: 1.5,
    fit: true,
    tile: true,
  },
});

let bTapHold = false;
function isNode(e) {
  if (e.target.position == undefined) return false; // background
  else if (e.target.data('id').length != 1) return false; // edge
  return true; // node!!
}

cy.on('tap', function (e) {
  if (!isNode(e)) return;

  if (e.target === curSel) {
    resetFocus(e.target);
    curSel = null;
  } else {
    if (curSel != null) resetFocus(curSel);
    setFocus(e.target);
    curSel = e.target;
  }

  applyTargetBonus(cy, curSel);
  return;

  if (bTapHold) {
    bTapHold = false;
    return;
  }
  if (curASCII == 123) {
    alert('더 이상 추가할 수 없습니다.');
    return;
  }

  const parentId = e.target.data('id');
  const parentPos = e.target.position();

  const newId = GetNewID();

  cy.add([
    {
      group: 'nodes',
      data: {
        id: newId,
        pv: '20', // 만 단위
        label: newId,
      },
      position: { x: parentPos.x, y: parentPos.y + 80 },
    },
    {
      group: 'edges',
      data: {
        id: `${parentId}->${newId}`,
        source: newId,
        target: parentId,
      },
    },
  ]);
});

cy.on('taphold', function (e) {
  if (!isNode(e)) return;

  const myId = e.target.data('id');
  showMenu();

  document
    .querySelector('.menu-item[action="close"]')
    .addEventListener('click', function () {
      hideMenu();
    });

  document
    .querySelector('.menu-item[action="delete"]')
    .addEventListener('click', function () {
      let count = 0;
      e.target.connectedEdges().forEach(function (target) {
        if (target.target().data('id') == myId) {
          count++;
        }
      });

      if (count != 0) {
        alert('끝부분만 삭제가 가능합니다.');
        return;
      }

      cy.remove(e.target);
      bTapHold = true;
      hideMenu();
    });
});

let resizeTimer;

window.addEventListener('resize', function () {
  this.clearTimeout(resizeTimer);
  resizeTimer = this.setTimeout(function () {
    cy.fit();
  }, 200);
});

makingFirstBonusChart();

let curSel = null;
const nodeActiveColor = '#ffa502';

function setFocus(target_element) {
  target_element.style('background-color', nodeActiveColor);
}

function resetFocus(target_element) {
  target_element.style('background-color', nodeColor);
}
