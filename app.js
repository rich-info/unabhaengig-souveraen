// ── Shared chart config helpers ──

function chartDefaults() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#8B949E', padding: 12, usePointStyle: true, pointStyleWidth: 10 }
      }
    }
  };
}

function axisDefaults() {
  return {
    grid: { color: 'rgba(33, 38, 45, 0.6)' },
    ticks: { color: '#8B949E', font: { size: 11 } },
    border: { color: '#21262D' }
  };
}

// ── Chart.js global defaults ──

Chart.defaults.color = '#8B949E';
Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ── Data loading ──

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`Failed to load ${path}:`, err);
    return null;
  }
}

// ── Scroll spy ──

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ── Scroll animations ──

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// ── Mobile nav ──

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

// ── Counter animation for KPI cards ──

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;

      if (Number.isInteger(target)) {
        el.textContent = Math.round(current) + suffix;
      } else {
        el.textContent = current.toFixed(1).replace('.', ',') + suffix;
      }

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });
}

// ── Main init ──

document.addEventListener('DOMContentLoaded', async () => {
  initMobileNav();
  initScrollSpy();
  initScrollAnimations();
  animateCounters();

  // Load all data in parallel
  const [energy, rawMaterials, industry, tech, supplyChains, sovereignty] = await Promise.all([
    loadJSON('data/energy.json'),
    loadJSON('data/raw_materials.json'),
    loadJSON('data/industry.json'),
    loadJSON('data/tech.json'),
    loadJSON('data/supply_chains.json'),
    loadJSON('data/sovereignty.json')
  ]);

  // Initialize charts
  if (energy) initEnergyCharts(energy);
  if (rawMaterials) initRawMaterialsCharts(rawMaterials);
  if (industry) initIndustryCharts(industry);
  if (tech) initTechCharts(tech);
  if (supplyChains) initSupplyChainCharts(supplyChains);
  if (sovereignty) initSovereigntyCharts(sovereignty);
});
