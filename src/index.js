import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';

cytoscape.use(coseBilkent);

import './style.css';

import { makingFirstBonusChart, applyTargetBonus } from './bonus';
import { showMenu, hideMenu, GetNewID } from './common';
import {
  edgeWidth,
  arrowScale,
  edgeColor,
  nodeColor,
  nodeActiveColor,
  predecessorsColor,
} from './style';
import { initData } from './data';

var curSel = null;
let curASCII = 68; // D

var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: initData,
  style: [
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
    resetFocus(cy, e.target);
    curSel = null;
  } else {
    if (curSel != null) resetFocus(curSel);
    setFocus(cy, e.target);
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

function setFocus(cy, target_element) {
  target_element.style('background-color', nodeActiveColor);
  setFocusPredecessor(cy, target_element);
}

function setFocusPredecessor(cy, target_element) {
  target_element.predecessors().each(function (e) {
    if (e.isEdge()) {
      setFocusPredecessor(cy, e);
    } else {
      setFocusPredecessor(cy, e);
      e.style('background-color', predecessorsColor);
    }
  });
}

function resetFocus(cy, target_element) {
  target_element.style('background-color', nodeColor);
  resetFocusPredecessor(cy, target_element);
}

function resetFocusPredecessor(cy, target_element) {
  target_element.predecessors().each(function (e) {
    if (e.isEdge()) {
      setFocusPredecessor(cy, e);
    } else {
      setFocusPredecessor(cy, e);
      e.style('background-color', nodeColor);
    }
  });
}

document
  .querySelector('.utility-button[action="add"]')
  .addEventListener('click', function () {
    if (!curSel) alert('대상을 선택해주세요.');
  });

document
  .querySelector('.utility-button[action="delete"]')
  .addEventListener('click', function () {
    if (!curSel) alert('대상을 선택해주세요.');
    let count = 0;
    curSel.connectedEdges().forEach(function (target) {
      if (target.target().data('id') == curSel.data('id')) {
        count++;
      }
    });

    if (count !== 0) {
      alert('끝부분만 삭제가 가능합니다.');
      return;
    }

    cy.remove(curSel);
  });
