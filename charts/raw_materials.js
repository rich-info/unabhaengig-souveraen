function initRawMaterialsCharts(data) {
  createRareEarthsDonut(data.rareEarths);
  createRiskBars(data.riskScores);
}

function createRareEarthsDonut(re) {
  const ctx = document.getElementById('chart-rare-earths');
  if (!ctx) return;

  const colors = ['#F85149', '#D29922', '#58A6FF', '#2EA043', '#A371F7', '#8B949E'];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: re.countries,
      datasets: [{
        data: re.shares,
        backgroundColor: colors,
        borderColor: '#131922',
        borderWidth: 3,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#8B949E', padding: 16, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: {
          callbacks: {
            label: (c) => `${c.label}: ${c.raw}%`
          }
        }
      }
    },
    plugins: [{
      id: 'centerText',
      afterDraw(chart) {
        const { ctx: context, chartArea: { width, height, top, left } } = chart;
        context.save();
        const cx = left + width / 2;
        const cy = top + height / 2 - 10;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.font = 'bold 32px -apple-system, sans-serif';
        context.fillStyle = '#F85149';
        context.fillText('65,5%', cx, cy);

        context.font = '13px -apple-system, sans-serif';
        context.fillStyle = '#8B949E';
        context.fillText('aus China', cx, cy + 24);
        context.restore();
      }
    }]
  });
}

function createRiskBars(scores) {
  const container = document.getElementById('risk-bars');
  if (!container) return;

  container.innerHTML = '';

  scores.sort((a, b) => b.score - a.score).forEach((item, i) => {
    const color = item.score >= 80 ? '#F85149' : item.score >= 60 ? '#D29922' : '#2EA043';

    const row = document.createElement('div');
    row.className = 'risk-row';
    row.innerHTML = `
      <div class="risk-label">${item.material}</div>
      <div class="risk-bar-bg">
        <div class="risk-bar-fill" style="width: 0%; background: ${color};" data-width="${item.score}%">
          ${item.score}
        </div>
      </div>
      <div class="risk-source">${item.mainSource} (${item.share}%)</div>
    `;
    container.appendChild(row);

    setTimeout(() => {
      row.querySelector('.risk-bar-fill').style.width = item.score + '%';
    }, 100 + i * 60);
  });
}
