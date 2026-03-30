function initEnergyCharts(data) {
  createGasChart(data.gasImports);
  createOilChart(data.oilImports);
  createLngChart(data.lngSources);
}

function createGasChart(gas) {
  const ctx = document.getElementById('chart-gas');
  if (!ctx) return;

  const colors = {
    'Russland': '#F85149',
    'Norwegen': '#58A6FF',
    'Niederlande': '#2EA043',
    'Belgien (LNG)': '#D29922',
    'USA (LNG)': '#D29922',
    'Sonstige': '#8B949E'
  };

  const datasets = gas.countries.map(country => ({
    label: country,
    data: gas.data[country],
    backgroundColor: colors[country] || '#8B949E',
    borderRadius: 4,
    borderSkipped: false,
  }));

  new Chart(ctx, {
    type: 'bar',
    data: { labels: gas.years, datasets },
    options: {
      ...chartDefaults(),
      plugins: {
        ...chartDefaults().plugins,
        title: { display: true, text: 'Erdgas-Importe nach Herkunft (%)', color: '#E6EDF3', font: { size: 14, weight: 600 } },
        tooltip: {
          callbacks: {
            label: (c) => `${c.dataset.label}: ${c.raw}%`
          }
        }
      },
      scales: {
        x: { stacked: true, ...axisDefaults() },
        y: { stacked: true, max: 100, ...axisDefaults(), ticks: { ...axisDefaults().ticks, callback: v => v + '%' } }
      }
    }
  });
}

function createOilChart(oil) {
  const ctx = document.getElementById('chart-oil');
  if (!ctx) return;

  const colors = {
    'Russland': '#F85149',
    'Norwegen': '#58A6FF',
    'Kasachstan': '#A371F7',
    'USA': '#D29922',
    'Libyen': '#7EE787',
    'Sonstige': '#8B949E'
  };

  const datasets = oil.countries.map(country => ({
    label: country,
    data: oil.data[country],
    backgroundColor: colors[country] || '#8B949E',
    borderRadius: 4,
    borderSkipped: false,
  }));

  new Chart(ctx, {
    type: 'bar',
    data: { labels: oil.years, datasets },
    options: {
      ...chartDefaults(),
      plugins: {
        ...chartDefaults().plugins,
        title: { display: true, text: 'Rohöl-Importe nach Herkunft (%)', color: '#E6EDF3', font: { size: 14, weight: 600 } },
        tooltip: {
          callbacks: {
            label: (c) => `${c.dataset.label}: ${c.raw}%`
          }
        }
      },
      scales: {
        x: { stacked: true, ...axisDefaults() },
        y: { stacked: true, max: 100, ...axisDefaults(), ticks: { ...axisDefaults().ticks, callback: v => v + '%' } }
      }
    }
  });
}

function createLngChart(lng) {
  const ctx = document.getElementById('chart-lng');
  if (!ctx) return;

  const colors = ['#D29922', '#58A6FF', '#2EA043', '#A371F7', '#7EE787', '#8B949E'];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: lng.countries,
      datasets: [{
        data: lng.shares,
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
        title: { display: true, text: 'LNG-Importe nach Herkunft (%)', color: '#E6EDF3', font: { size: 14, weight: 600 } },
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => `${c.raw}%`
          }
        }
      },
      scales: {
        x: { max: 60, ...axisDefaults(), ticks: { ...axisDefaults().ticks, callback: v => v + '%' } },
        y: { ...axisDefaults() }
      }
    }
  });
}
