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

export function applyTargetBonus(cy, element) {
  if (cy == null || element == null) {
    const curSelDiv = document.querySelector('.cur-sel');
    curSelDiv.innerHTML = '없음';
    const curPvDiv = document.querySelector('.cur-pv');
    curPvDiv.innerHTML = '0 만';
    const curPaybackDiv = document.querySelector('.cur-payback');
    curPaybackDiv.innerHTML = '0 %';
    const curReward1stDiv = document.querySelector('.cur-reward-1st');
    curReward1stDiv.innerHTML = '0 만원';
    const curReward2ndDiv = document.querySelector('.cur-reward-2nd');
    curReward2ndDiv.innerHTML = '0 만원';
    const curRewardDiv = document.querySelector('.cur-reward');
    curRewardDiv.innerHTML = '0 만원';
    return;
  }

  const curSelDiv = document.querySelector('.cur-sel');
  curSelDiv.innerHTML = element.data('label');

  const {totalPv, ratio, reward1st} = calc1stBonus(cy, element);
  const curPvDiv = document.querySelector('.cur-pv');
  curPvDiv.innerHTML = `${totalPv} 만`;
  const curPaybackDiv = document.querySelector('.cur-payback');
  curPaybackDiv.innerHTML = `${ratio * 100} %`;
  const curReward1stDiv = document.querySelector('.cur-reward-1st');
  curReward1stDiv.innerHTML = `${reward1st.toFixed(1)} 만원`;
  
  const reward2nd = calc2ndBonus(cy, element, totalPv, reward1st);
  const curReward2ndDiv = document.querySelector('.cur-reward-2nd');
  curReward2ndDiv.innerHTML = `${reward2nd.toFixed(1)} 만원`;
  
  const curRewardDiv = document.querySelector('.cur-reward');
  curRewardDiv.innerHTML = `${(reward1st + reward2nd).toFixed(1)} 만원`;
}

let tempPv = 0;
function calc1stBonus(cy, element) {
  tempPv = parseInt(element.data('pv'));
  calcTargetBonus(cy, element);
  const totalPv = tempPv;
  let ratio = getPercentByPV(totalPv);
  const reward1st = calcTargetReward(cy, element, ratio * totalPv);
  return { totalPv, ratio, reward1st };
}

function calcTargetBonus(cy, element) {
  const children = getChildrenNodes(cy, element);
  children.forEach(function (child) {
    if (child.isEdge()) {
      calcTargetBonus(cy, child);
    } else {
      calcTargetBonus(cy, child);
      tempPv += parseInt(child.data('pv'));
    }
  });
}

function getPercentByPV(total) {
  if (total < 20) return 0.0;
  else if (total < 60) return 0.03;
  else if (total < 120) return 0.06;
  else if (total < 240) return 0.09;
  else if (total < 400) return 0.12;
  else if (total < 680) return 0.15;
  else if (total < 1000) return 0.18;
  else return 0.21;
}

function calcTargetReward(cy, element, totalReward) {
  const children = getChildrenNodes(cy, element);
  children.forEach(function (child) {
    tempPv = parseInt(child.data('pv'));
    calcTargetBonus(cy, child);
    const childPv = tempPv;
    const childRatio = getPercentByPV(childPv);
    totalReward -= childPv * childRatio;
  });
  return totalReward;
}

export function getChildrenNodes(cy, element) {
  const myId = element.data('id');
  let children = [];
  element.connectedEdges().forEach(function (edge) {
    if (edge.source().data('id') == myId) {
      children.push(edge.target());
    }
  });
  return children;
}

function calc2ndBonus(cy, element, totalPv, reward1st) {
  // total PV가 400만 인가?
  if (totalPv < 400)
    return 0;

  // 60만 pv 달성한 leg가 3개인가?
  const children = getChildrenNodes(cy, element);
  if (children.length < 3)
    return 0;

  let bFail = false;
  children.forEach(function (child) {
    tempPv = parseInt(child.data('pv'));
    calcTargetBonus(cy, child);
    console.log(tempPv);
    if (tempPv < 60) bFail = true;
  });
  if (bFail)
    return 0;

  console.log("Bronze Builder!!");
  return reward1st * 0.3;
}