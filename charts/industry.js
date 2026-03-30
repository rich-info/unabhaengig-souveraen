function initIndustryCharts(data) {
  createSupplyChainBar(data.chinaShareInSupplyChain);
  createExportChart(data.exportDependency);
  createFlowDiagram(data.autoSupplyChain);
}

function createSupplyChainBar(chinaShare) {
  const ctx = document.getElementById('chart-supply-chain');
  if (!ctx) return;

  const labels = ['Batterien', 'Elektronik', 'Permanentmagnete', 'Rohstoffe', 'Gesamt'];
  const values = [chinaShare.batterien, chinaShare.elektronik, chinaShare.magnete, chinaShare.rohstoffe, chinaShare.gesamt];
  const colors = values.map(v => v >= 70 ? '#F85149' : v >= 50 ? '#D29922' : '#58A6FF');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'China-Anteil',
        data: values,
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      ...chartDefaults(),
      indexAxis: 'y',
      plugins: {
        ...chartDefaults().plugins,
        title: { display: true, text: 'China-Anteil in deutschen Auto-Lieferketten (%)', color: '#E6EDF3', font: { size: 14, weight: 600 } },
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.raw}%` } }
      },
      scales: {
        x: { max: 100, ...axisDefaults(), ticks: { ...axisDefaults().ticks, callback: v => v + '%' } },
        y: { ...axisDefaults() }
      }
    }
  });
}

function createExportChart(exp) {
  const ctx = document.getElementById('chart-export');
  if (!ctx) return;

  const colors = ['#F85149', '#D29922', '#58A6FF', '#2EA043', '#A371F7', '#8B949E'];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: exp.countries,
      datasets: [{
        data: exp.shares,
        backgroundColor: colors,
        borderColor: '#131922',
        borderWidth: 3,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '58%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#8B949E', padding: 16, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: { callbacks: { label: (c) => `${c.label}: ${c.raw}%` } }
      }
    },
    plugins: [{
      id: 'exportCenter',
      afterDraw(chart) {
        const { ctx: context, chartArea: { width, height, top, left } } = chart;
        context.save();
        const cx = left + width / 2;
        const cy = top + height / 2 - 10;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold 28px -apple-system, sans-serif';
        context.fillStyle = '#F85149';
        context.fillText('21%', cx, cy);
        context.font = '12px -apple-system, sans-serif';
        context.fillStyle = '#8B949E';
        context.fillText('Export → China', cx, cy + 22);
        context.restore();
      }
    }]
  });
}

function createFlowDiagram(supply) {
  const container = document.getElementById('flow-diagram');
  if (!container) return;

  const countries = {};
  supply.flows.forEach(f => {
    if (!countries[f.from]) countries[f.from] = [];
    countries[f.from].push({ to: f.to, value: f.value });
  });

  const countryColors = {
    'China': '#F85149',
    'Südkorea': '#58A6FF',
    'Japan': '#A371F7',
    'USA': '#D29922',
    'EU': '#2EA043'
  };

  let html = '<div class="card-title-sm">Zulieferer-Fluss: Herkunftsland → Komponente → Deutsche Autoindustrie</div>';
  html += '<div>';

  Object.entries(countries).sort((a, b) => {
    const totalA = a[1].reduce((s, f) => s + f.value, 0);
    const totalB = b[1].reduce((s, f) => s + f.value, 0);
    return totalB - totalA;
  }).forEach(([country, flows]) => {
    const color = countryColors[country] || '#8B949E';
    const total = flows.reduce((s, f) => s + f.value, 0);
    html += `<div class="flow-section" style="background: ${color}11; border-left-color: ${color};">`;
    html += `<div class="flow-header">`;
    html += `<span class="flow-country" style="color: ${color}">${country}</span>`;
    html += `<span class="flow-total">Gesamtvolumen: ${total}</span></div>`;
    html += '<div class="flow-tags">';
    flows.sort((a, b) => b.value - a.value).forEach(f => {
      const opacity = Math.max(0.3, f.value / 100);
      html += `<div class="flow-tag" style="background: ${color}${Math.round(opacity * 40).toString(16).padStart(2, '0')}; color: ${color}">
        ${f.to} <strong>${f.value}%</strong>
      </div>`;
    });
    html += '</div></div>';
  });

  html += '</div>';
  container.innerHTML = html;
}
