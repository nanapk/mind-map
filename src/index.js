import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import coseBilkent from 'cytoscape-cose-bilkent';

cytoscape.use(dagre);
cytoscape.use(coseBilkent);

import './style.scss';
import './toggle.scss';

import { applyTargetBonus } from './bonus';
import { showMenu, hideMenu, getNewId, toggleOverThousand } from './common';
import {
  edgeWidth,
  arrowScale,
  edgeColor,
  nodeColor,
  nodeActiveColor,
  successorsColor,
} from './style';
import { makingLOSMapTree } from './data';
import { dagreLayout } from './layout';

var curSel = null;

function resetCurSel() {
  if (curSel) {
    resetFocus(cy, curSel);
    curSel = null;
    applyTargetBonus(cy, curSel);
  }
}

var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: makingLOSMapTree('oneOneTwo'),
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
        'target-arrow-shape': 'vee',
        'target-arrow-color': edgeColor,
        'arrow-scale': arrowScale,
      },
    },
  ],
  layout: {
    name: 'dagre',
    ...dagreLayout,
  },
});

let bTapHold = false;
function isNode(e) {
  if (e.target.position == undefined) return false; // background
  else if (e.target.data('id').length != 1) return false; // edge
  return true; // node!!
}

cy.on('tap', function (e) {
  if (bTapHold) {
    bTapHold = false;
    return;
  }

  if (!isNode(e)) return;

  if (e.target === curSel) {
    resetFocus(cy, e.target);
    curSel = null;
  } else {
    if (curSel != null) resetFocus(cy, curSel);
    setFocus(cy, e.target);
    curSel = e.target;
  }

  applyTargetBonus(cy, curSel);
  return;
});

cy.on('taphold', function (e) {
  if (!isNode(e)) return;

  bTapHold = true;
  const targetEl = e.target;
  const myId = targetEl.data('id');
  const myPV = targetEl.data('pv');
  showMenu();
  const pvInput = document.querySelector('.pv-input');
  pvInput.value = myPV;

  const editButton = document.querySelector('.menu-button[action="edit-pv"]');
  editButton.onclick = function () {
    const newPV = pvInput.value;
    const id = targetEl.data('id');
    targetEl.data('pv', newPV);
    targetEl.data('label', `${id}(${newPV})`);
    hideMenu();
    applyTargetBonus(cy, targetEl);
  };
});

let resizeTimer;

window.addEventListener('resize', function () {
  this.clearTimeout(resizeTimer);
  resizeTimer = this.setTimeout(function () {
    cy.fit();
  }, 200);
});

function setFocus(cy, target_element) {
  target_element.style('background-color', nodeActiveColor);
  setFocusSuccessors(cy, target_element);
}

function setFocusSuccessors(cy, target_element) {
  target_element.successors().each(function (e) {
    if (!e.isEdge()) {
      e.style('background-color', successorsColor);
    }
  });
}

function resetFocus(cy, target_element) {
  target_element.style('background-color', nodeColor);
  resetFocusSuccessors(cy, target_element);
}

function resetFocusSuccessors(cy, target_element) {
  target_element.successors().each(function (e) {
    if (!e.isEdge()) {
      e.style('background-color', nodeColor);
    }
  });
}

document
  .querySelector('.utility-button[action="add"]')
  .addEventListener('click', function () {
    if (!curSel) {
      alert('대상을 선택해주세요.');
      return;
    }

    const parentId = curSel.data('id');
    const parentPos = curSel.position();

    const newId = getNewId(cy);

    if (!newId) {
      alert('더 이상 추가할 수 없습니다.');
      return;
    }

    cy.add([
      {
        group: 'nodes',
        data: {
          id: newId,
          pv: '20', // 만 단위
          label: `${newId}(20)`,
        },
        position: { x: parentPos.x, y: parentPos.y + 80 },
      },
      {
        group: 'edges',
        data: {
          id: `${parentId}->${newId}`,
          source: parentId,
          target: newId,
        },
      },
    ]);
    resetCurSel();
  });

document
  .querySelector('.utility-button[action="delete"]')
  .addEventListener('click', function () {
    if (!curSel) {
      alert('대상을 선택해주세요.');
      return;
    }
    let count = 0;
    curSel.connectedEdges().forEach(function (edge) {
      if (edge.source().data('id') == curSel.data('id')) {
        count++;
      }
    });

    if (count !== 0) {
      alert('끝부분만 삭제가 가능합니다.');
      return;
    }

    cy.remove(curSel);
    resetCurSel();
  });

const changeElementsButtons = document.querySelectorAll(
  '.utility-button[action="change-elements"]'
);
changeElementsButtons.forEach((el) => {
  el.onclick = function () {
    const type = this.getAttribute('type');

    if (type === 'bronze-foundation-1') {
      cy.json({ elements: makingLOSMapTree('bronzeFoundation1') });
    } else if (type === 'bronze-foundation-2') {
      cy.json({ elements: makingLOSMapTree('bronzeFoundation2') });
    } else if (type === 'bronze-builder-1') {
      cy.json({ elements: makingLOSMapTree('bronzeBuilder1') });
    } else if (type === 'bronze-builder-2') {
      cy.json({ elements: makingLOSMapTree('bronzeBuilder2') });
    } else if (type === 'one-one-two') {
      cy.json({ elements: makingLOSMapTree('oneOneTwo') });
    }
    cy.layout({
      name: 'dagre',
      ...dagreLayout,
    }).run();
    resetCurSel();
  };
});

const toggleButton = document.querySelector('#toggle-button');
toggleButton.addEventListener('change', function (e) {
  resetCurSel();
  toggleOverThousand(cy, e.target);
});
