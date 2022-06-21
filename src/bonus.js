import { firstBonusData } from './data';

export function makingFirstBonusChart() {
  const firstBonusChartDiv = document.querySelector('.first-bonus-chart');

  firstBonusData.forEach((bonusData) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('first-bonus-item');

    let bonusTotal = document.createElement('div');
    bonusTotal.innerText = `${bonusData.total}만PV`;
    bonusTotal.classList.add('bonus-total');

    let bonusPercentage = document.createElement('div');
    bonusPercentage.innerText = `${bonusData.percentage}%`;
    bonusTotal.classList.add('bonus-percentage');

    wrapper.appendChild(bonusTotal);
    wrapper.appendChild(bonusPercentage);

    firstBonusChartDiv.appendChild(wrapper);
  });
}

let totalPv = 0;
export function applyTargetBonus(cy, element) {
  if (cy == null || element == null) {
    const curSelDiv = document.querySelector('.cur-sel');
    curSelDiv.innerHTML = '없음';
    const curPvDiv = document.querySelector('.cur-pv');
    curPvDiv.innerHTML = '0 만';
    return;
  }

  const curSelDiv = document.querySelector('.cur-sel');
  curSelDiv.innerHTML = element.data('label');

  totalPv = 0;
  totalPv = parseInt(element.data('pv'));
  calcTargetBonus(cy, element);
  const curPvDiv = document.querySelector('.cur-pv');
  curPvDiv.innerHTML = `${totalPv} 만`;
}

function calcTargetBonus(cy, element) {
  element.predecessors().each(function (e) {
    if (e.isEdge()) {
      calcTargetBonus(cy, e);
    } else {
      calcTargetBonus(cy, e);
      totalPv += parseInt(e.data('pv'));
    }
  });
}
