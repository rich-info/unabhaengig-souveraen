function initSupplyChainCharts(data) {
  createHeatmap(data.dependencyMatrix);
  createCriticalList(data.criticalProducts);
}

function createHeatmap(matrix) {
  const container = document.getElementById('heatmap');
  if (!container) return;

  const { countries, categories, scores } = matrix;

  function getColor(score) {
    if (score >= 70) return { bg: 'rgba(248, 81, 73, 0.85)', text: '#fff' };
    if (score >= 50) return { bg: 'rgba(210, 153, 34, 0.8)', text: '#fff' };
    if (score >= 30) return { bg: 'rgba(210, 153, 34, 0.45)', text: '#E6EDF3' };
    if (score >= 15) return { bg: 'rgba(46, 160, 67, 0.45)', text: '#E6EDF3' };
    return { bg: 'rgba(46, 160, 67, 0.2)', text: '#8B949E' };
  }

  let html = `<div class="heatmap-scroll"><div class="heatmap-grid" style="grid-template-columns: 100px repeat(${categories.length}, minmax(70px, 1fr));">`;

  // Header row
  html += '<div></div>';
  categories.forEach(cat => {
    html += `<div class="heatmap-header">${cat}</div>`;
  });

  // Data rows
  countries.forEach((country, i) => {
    html += `<div class="heatmap-row-label">${country}</div>`;
    scores[i].forEach((score, j) => {
      const { bg, text } = getColor(score);
      html += `<div class="heatmap-cell" style="background: ${bg}; color: ${text}" title="${country} → ${categories[j]}: ${score}%">${score}</div>`;
    });
  });

  html += '</div></div>';

  // Legend
  html += `<div class="heatmap-legend">
    <span><span class="legend-dot" style="background: rgba(46, 160, 67, 0.3)"></span> Gering (&lt;30%)</span>
    <span><span class="legend-dot" style="background: rgba(210, 153, 34, 0.6)"></span> Mittel (30-69%)</span>
    <span><span class="legend-dot" style="background: rgba(248, 81, 73, 0.85)"></span> Hoch (&ge;70%)</span>
  </div>`;

  container.innerHTML = html;
}

function createCriticalList(products) {
  const container = document.getElementById('critical-products');
  if (!container) return;

  let html = `<div class="crit-header">
    <div>Produkt</div>
    <div>Hauptquelle</div>
    <div class="right">Abhängigkeit</div>
    <div class="right">Risiko</div>
  </div>`;

  products.sort((a, b) => b.dependency - a.dependency).forEach(p => {
    const color = p.dependency >= 80 ? '#F85149' : p.dependency >= 60 ? '#D29922' : '#2EA043';
    const risk = p.dependency >= 80 ? 'Kritisch' : p.dependency >= 60 ? 'Hoch' : 'Mittel';
    html += `<div class="crit-row">
      <div class="crit-product">${p.product}</div>
      <div class="crit-source">${p.source}</div>
      <div class="crit-value" style="color: ${color}">${p.dependency}%</div>
      <div class="crit-badge">
        <span style="background: ${color}22; color: ${color}">${risk}</span>
      </div>
    </div>`;
  });

  container.innerHTML = html;
}
