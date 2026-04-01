function initSovereigntyCharts(data) {
  createSovereigntyGauges(data.sovereigntyIndex);
  createRenewableTimeline(data.renewableElectricity);
  createEVChart(data.electricVehicles);
  createHeatingMixChart(data.heatPumps);
  createHeatPumpTimeline(data.heatPumps);
}

/* ── Souveränitäts-Fortschrittsbalken ── */

function createSovereigntyGauges(index) {
  const container = document.getElementById('sovereignty-gauges');
  if (!container) return;

  const items = [
    { ...index.strom,  icon: '⚡', color: '#2EA043' },
    { ...index.mobil,  icon: '🔋', color: '#58A6FF' },
    { ...index.waerme, icon: '🏠', color: '#D29922' },
    { ...index.gesamt, icon: '🛡️', color: '#A371F7' }
  ];

  let html = '';
  items.forEach((item, i) => {
    const pct = Math.round((item.current / item.target) * 100);
    const barColor = pct >= 60 ? '#2EA043' : pct >= 35 ? '#D29922' : '#F85149';

    html += `<div class="sov-gauge-card">
      <div class="sov-gauge-header">
        <span class="sov-gauge-icon">${item.icon}</span>
        <span class="sov-gauge-label">${item.label}</span>
      </div>
      <div class="sov-gauge-bar-bg">
        <div class="sov-gauge-bar-fill" style="width: 0%; background: ${barColor};" data-width="${pct}%"></div>
        <div class="sov-gauge-target" style="left: ${Math.min(pct > 95 ? 95 : 100, 100)}%" title="Ziel ${item.target}%"></div>
      </div>
      <div class="sov-gauge-values">
        <span class="sov-gauge-current" style="color: ${barColor};">${item.current}%</span>
        <span class="sov-gauge-target-label">Ziel ${item.target}%</span>
      </div>
      <div class="sov-gauge-progress">Fortschritt: <strong style="color: ${barColor};">${pct}%</strong></div>
    </div>`;
  });

  container.innerHTML = html;

  // Animate bars
  setTimeout(() => {
    container.querySelectorAll('.sov-gauge-bar-fill').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width;
      }, i * 150);
    });
  }, 200);
}

/* ── Erneuerbare Energien Zeitverlauf (Stacked Area) ── */

function createRenewableTimeline(re) {
  const ctx = document.getElementById('chart-renewable');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: re.years,
      datasets: [
        {
          label: 'Wind',
          data: re.wind,
          backgroundColor: 'rgba(88, 166, 255, 0.3)',
          borderColor: '#58A6FF',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 3,
        },
        {
          label: 'Solar',
          data: re.solar,
          backgroundColor: 'rgba(210, 153, 34, 0.3)',
          borderColor: '#D29922',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 3,
        },
        {
          label: 'Biomasse',
          data: re.biomasse,
          backgroundColor: 'rgba(46, 160, 67, 0.2)',
          borderColor: '#2EA043',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 3,
        },
        {
          label: 'Wasser',
          data: re.wasser,
          backgroundColor: 'rgba(163, 113, 247, 0.2)',
          borderColor: '#A371F7',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 3,
        }
      ]
    },
    options: {
      ...chartDefaults(),
      plugins: {
        ...chartDefaults().plugins,
        title: {
          display: true,
          text: 'Anteil erneuerbarer Energien an der Stromerzeugung (%)',
          color: '#E6EDF3',
          font: { size: 14, weight: 600 }
        },
        tooltip: {
          mode: 'index',
          callbacks: { label: (c) => `${c.dataset.label}: ${c.raw}%` }
        }
      },
      scales: {
        x: { ...axisDefaults() },
        y: {
          stacked: true,
          ...axisDefaults(),
          ticks: { ...axisDefaults().ticks, callback: v => v + '%' }
        }
      }
    },
    plugins: [{
      id: 'targetLine',
      afterDraw(chart) {
        const yScale = chart.scales.y;
        const targetY = yScale.getPixelForValue(re.target2030);
        const { ctx: context, chartArea: { left, right } } = chart;
        context.save();
        context.setLineDash([6, 4]);
        context.strokeStyle = '#2EA04388';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(left, targetY);
        context.lineTo(right, targetY);
        context.stroke();
        context.fillStyle = '#2EA043';
        context.font = 'bold 11px -apple-system, sans-serif';
        context.fillText('Ziel 2030: 80%', right - 100, targetY - 6);
        context.restore();
      }
    }]
  });
}

/* ── E-Auto Neuzulassungsanteile ── */

function createEVChart(ev) {
  const ctx = document.getElementById('chart-ev');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ev.years,
      datasets: [
        {
          label: 'Vollelektrisch (BEV)',
          data: ev.bevShare,
          backgroundColor: '#58A6FF',
          borderRadius: 4,
          borderSkipped: false,
        },
        {
          label: 'Plug-in-Hybrid (PHEV)',
          data: ev.phevShare,
          backgroundColor: '#58A6FF55',
          borderRadius: 4,
          borderSkipped: false,
        }
      ]
    },
    options: {
      ...chartDefaults(),
      plugins: {
        ...chartDefaults().plugins,
        title: {
          display: true,
          text: 'E-Auto-Anteil an Neuzulassungen (%)',
          color: '#E6EDF3',
          font: { size: 14, weight: 600 }
        },
        tooltip: {
          callbacks: { label: (c) => `${c.dataset.label}: ${c.raw}%` }
        }
      },
      scales: {
        x: { stacked: true, ...axisDefaults() },
        y: {
          stacked: true,
          ...axisDefaults(),
          ticks: { ...axisDefaults().ticks, callback: v => v + '%' }
        }
      }
    }
  });
}

/* ── Heizungsmix Donut ── */

function createHeatingMixChart(hp) {
  const ctx = document.getElementById('chart-heating');
  if (!ctx) return;

  const mix = hp.heatingMix;
  const labels = ['Gas', 'Öl', 'Fernwärme', 'Wärmepumpe', 'Strom (direkt)', 'Holz/Pellets', 'Sonstige'];
  const data = [mix.gas, mix.oel, mix.fernwaerme, mix.waermepumpe, mix.strom_direkt, mix.holz_pellets, mix.sonstige];
  const colors = ['#F85149', '#D29922', '#58A6FF', '#2EA043', '#7EE787', '#A371F7', '#8B949E'];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
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
      id: 'heatingCenter',
      afterDraw(chart) {
        const { ctx: context, chartArea: { width, height, top, left } } = chart;
        context.save();
        const cx = left + width / 2;
        const cy = top + height / 2 - 10;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        const fossilShare = mix.gas + mix.oel;
        context.font = 'bold 28px -apple-system, sans-serif';
        context.fillStyle = '#F85149';
        context.fillText(fossilShare.toFixed(1) + '%', cx, cy);
        context.font = '12px -apple-system, sans-serif';
        context.fillStyle = '#8B949E';
        context.fillText('fossil beheizt', cx, cy + 22);
        context.restore();
      }
    }]
  });
}

/* ── Wärmepumpen-Bestand Zeitverlauf ── */

function createHeatPumpTimeline(hp) {
  const ctx = document.getElementById('chart-heatpump-timeline');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hp.years,
      datasets: [{
        label: 'Neuinstallationen',
        data: hp.installations,
        backgroundColor: '#2EA043',
        borderRadius: 6,
        borderSkipped: false,
        yAxisID: 'y'
      }, {
        label: 'Bestand gesamt',
        data: hp.bestandTotal,
        type: 'line',
        borderColor: '#58A6FF',
        backgroundColor: 'rgba(88, 166, 255, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#58A6FF',
        yAxisID: 'y1'
      }]
    },
    options: {
      ...chartDefaults(),
      plugins: {
        ...chartDefaults().plugins,
        title: {
          display: true,
          text: 'Wärmepumpen in Deutschland',
          color: '#E6EDF3',
          font: { size: 14, weight: 600 }
        },
        tooltip: {
          callbacks: {
            label: (c) => `${c.dataset.label}: ${c.raw.toLocaleString('de-DE')}`
          }
        }
      },
      scales: {
        x: { ...axisDefaults() },
        y: {
          position: 'left',
          ...axisDefaults(),
          title: { display: true, text: 'Neuinstallationen', color: '#8B949E', font: { size: 11 } },
          ticks: {
            ...axisDefaults().ticks,
            callback: v => (v / 1000) + 'k'
          }
        },
        y1: {
          position: 'right',
          ...axisDefaults(),
          grid: { display: false },
          title: { display: true, text: 'Bestand', color: '#8B949E', font: { size: 11 } },
          ticks: {
            ...axisDefaults().ticks,
            callback: v => (v / 1000000).toFixed(1) + ' Mio'
          }
        }
      }
    },
    plugins: [{
      id: 'hpTargetLine',
      afterDraw(chart) {
        const yScale = chart.scales.y1;
        const targetY = yScale.getPixelForValue(hp.target2030_bestand);
        if (isNaN(targetY)) return;
        const { ctx: context, chartArea: { left, right } } = chart;
        context.save();
        context.setLineDash([6, 4]);
        context.strokeStyle = '#2EA04388';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(left, targetY);
        context.lineTo(right, targetY);
        context.stroke();
        context.fillStyle = '#2EA043';
        context.font = 'bold 11px -apple-system, sans-serif';
        context.fillText('Ziel 2030: 6 Mio', left + 8, targetY - 6);
        context.restore();
      }
    }]
  });
}
