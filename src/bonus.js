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
    const curPaybackDiv = document.querySelector('.cur-payback');
    curPaybackDiv.innerHTML = '0 %';
    const curRewardDiv = document.querySelector('.cur-reward');
    curRewardDiv.innerHTML = '0 만원';
    return;
  }

  const curSelDiv = document.querySelector('.cur-sel');
  curSelDiv.innerHTML = element.data('label');

  totalPv = parseInt(element.data('pv'));
  calcTargetBonus(cy, element);
  const targetPv = totalPv;
  const curPvDiv = document.querySelector('.cur-pv');
  curPvDiv.innerHTML = `${targetPv} 만`;

  let ratio = getPercentByPV(targetPv);
  const curPaybackDiv = document.querySelector('.cur-payback');
  curPaybackDiv.innerHTML = `${ratio * 100} %`;

  const reward = calcTargetReward(cy, element, ratio * targetPv);
  const curRewardDiv = document.querySelector('.cur-reward');
  curRewardDiv.innerHTML = `${reward.toFixed(1)} 만원`;
}

function calcTargetBonus(cy, element) {
  const children = getChildrenNodes(cy, element);
  children.forEach(function (child) {
    if (child.isEdge()) {
      calcTargetBonus(cy, child);
    } else {
      calcTargetBonus(cy, child);
      totalPv += parseInt(child.data('pv'));
    }
  });
}

function getPercentByPV(total) {
  if (total < 20)
    return 0.0;
  else if (total < 60)
    return 0.03;
  else if (total < 120)
    return 0.06;
  else if (total < 240)
    return 0.09;
  else if (total < 400)
    return 0.12;
  else if (total < 680)
    return 0.15;
  else if (total < 1000)
    return 0.18;
  else
    return 0.21;
}

function calcTargetReward(cy, element, totalReward) {
  const children = getChildrenNodes(cy, element);
  children.forEach(function (child) {
    totalPv = parseInt(child.data('pv'));
    calcTargetBonus(cy, child);
    const childPv = totalPv;
    const childRatio = getPercentByPV(childPv);
    totalReward -= childPv * childRatio;
  });
  return totalReward;
}

export function getChildrenNodes(cy, element) {
  const myId = element.data('id');
  let children = [];
  element.connectedEdges().forEach(function (target) {
    if (target.target().data('id') == myId) {
      children.push(target.source());
    }
  });
  return children;
}