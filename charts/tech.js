function initTechCharts(data) {
  createCloudDonut(data.cloudMarketShare);
  createSoftwareBar(data.enterpriseSoftware);
  createPublicSectorBar(data.publicSectorSoftware);
}

function createCloudDonut(cloud) {
  const ctx = document.getElementById('chart-cloud');
  if (!ctx) return;

  const colors = ['#D29922', '#D29922', '#D29922', '#2EA043', '#2EA043', '#2EA043', '#58A6FF', '#8B949E'];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: cloud.providers,
      datasets: [{
        data: cloud.shares,
        backgroundColor: colors,
        borderColor: '#131922',
        borderWidth: 3,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#8B949E', padding: 12, usePointStyle: true, pointStyleWidth: 10, font: { size: 11 } }
        },
        tooltip: { callbacks: { label: (c) => `${c.label}: ${c.raw}%` } }
      }
    },
    plugins: [{
      id: 'cloudCenter',
      afterDraw(chart) {
        const { ctx: context, chartArea: { width, height, top, left } } = chart;
        context.save();
        const cx = left + width / 2;
        const cy = top + height / 2 - 10;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold 30px -apple-system, sans-serif';
        context.fillStyle = '#D29922';
        context.fillText('66%', cx, cy);
        context.font = '12px -apple-system, sans-serif';
        context.fillStyle = '#8B949E';
        context.fillText('USA-Anbieter', cx, cy + 22);
        context.restore();
      }
    }]
  });
}

function createSoftwareBar(sw) {
  const ctx = document.getElementById('chart-software');
  if (!ctx) return;

  const colors = sw.origin.map(o => o === 'USA' ? '#D29922' : o === 'DE' ? '#2EA043' : '#8B949E');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sw.vendors,
      datasets: [{
        data: sw.marketShare,
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      ...chartDefaults(),
      plugins: {
        ...chartDefaults().plugins,
        title: { display: true, text: 'Unternehmens-Software Marktanteile (%)', color: '#E6EDF3', font: { size: 14, weight: 600 } },
        legend: { display: false },
        tooltip: {
          callbacks: {
            afterLabel: (c) => `Herkunft: ${sw.origin[c.dataIndex]}`,
            label: (c) => `${c.raw}%`
          }
        }
      },
      scales: {
        x: { ...axisDefaults() },
        y: { ...axisDefaults(), ticks: { ...axisDefaults().ticks, callback: v => v + '%' } }
      }
    }
  });
}

function createPublicSectorBar(ps) {
  const ctx = document.getElementById('chart-public-sector');
  if (!ctx) return;

  const colors = ps.usaDependency.map(v => v >= 80 ? '#F85149' : v >= 60 ? '#D29922' : '#2EA043');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ps.categories,
      datasets: [{
        label: 'USA-Abhängigkeit',
        data: ps.usaDependency,
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
        title: { display: true, text: 'USA-Abhängigkeit im öffentlichen Sektor (%)', color: '#E6EDF3', font: { size: 14, weight: 600 } },
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
