import { PV_BV_RATIO } from './constants';

export function applyTargetBonus(cy, element) {
  const curSelDiv = document.querySelector('.cur-sel');
  const curPvDiv = document.querySelector('.cur-pv');
  const curPaybackDiv = document.querySelector('.cur-payback');
  const curReward1stDiv = document.querySelector('.cur-reward-1st');
  const curReward2ndDiv = document.querySelector('.cur-reward-2nd');
  const curRewardDiv = document.querySelector('.cur-reward');

  const show2ndReward = () => {
    curReward2ndDiv.parentElement.classList.remove('hide');
    curRewardDiv.parentElement.classList.remove('hide');
  };

  const hide2ndReward = () => {
    curReward2ndDiv.parentElement.classList.add('hide');
    curRewardDiv.parentElement.classList.add('hide');
  };

  if (cy == null || element == null) {
    curSelDiv.innerHTML = '없음';
    curPvDiv.innerHTML = '0 만';
    curPaybackDiv.innerHTML = '0 %';
    curReward1stDiv.innerHTML = '0 만원';
    curReward2ndDiv.innerHTML = '0 만원';
    curRewardDiv.innerHTML = '0 만원';
    hide2ndReward();
    return;
  }

  curSelDiv.innerHTML = element.data('label');

  const { totalPv, ratio, reward1st } = calc1stBonus(cy, element);
  curPvDiv.innerHTML = `${totalPv} 만`;
  curPaybackDiv.innerHTML = `${ratio * 100} %`;
  curReward1stDiv.innerHTML = `${reward1st.toFixed(2)} 만원`;

  const reward2nd = calc2ndBonus(cy, element, totalPv, reward1st);
  if (reward2nd) {
    show2ndReward();
    curReward2ndDiv.innerHTML = `${reward2nd.toFixed(2)} 만원`;
    const totalReward = reward1st + reward2nd;
    curRewardDiv.innerHTML = `${totalReward.toFixed(2)} 만원`;
  } else {
    hide2ndReward();
    curReward2ndDiv.innerHTML = '0 만원';
    curRewardDiv.innerHTML = '0 만원';
  }
}

let tempPv = 0;
function calc1stBonus(cy, element) {
  tempPv = parseInt(element.data('pv'));
  calcTargetBonus(cy, element);
  const totalPv = tempPv;
  let ratio = getPercentByPV(totalPv);
  const total1Reward = ratio * totalPv * PV_BV_RATIO;
  const reward1st = calcTargetReward(cy, element, total1Reward);
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
    const childTotalBonus = childPv * childRatio * PV_BV_RATIO;
    totalReward -= childTotalBonus;
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
  if (totalPv < 400) return 0;

  // 60만 pv 달성한 leg가 3개인가?
  const children = getChildrenNodes(cy, element);
  if (children.length < 3) return 0;

  let bFail = false;
  children.forEach(function (child) {
    tempPv = parseInt(child.data('pv'));
    calcTargetBonus(cy, child);
    if (tempPv < 60) bFail = true;
  });
  if (bFail) return 0;

  return reward1st * 0.3;
}
