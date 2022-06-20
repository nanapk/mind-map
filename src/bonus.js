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
