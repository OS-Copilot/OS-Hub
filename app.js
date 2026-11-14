import { projects } from './data/projects.js';

const $ = (selector) => document.querySelector(selector);
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
const space = $('#space');
const satelliteContainer = $('#satellites');
const tooltip = $('#orbit-tooltip');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const coarsePointer = matchMedia('(hover: none)');
const projectById = new Map(projects.map((project) => [project.id, project]));
const pauseReasons = new Set();
const orbits = {
  desktop: {
    inner: { rx: 300, ry: 215, tilt: -16 },
    outer: { rx: 425, ry: 285, tilt: -8 },
  },
  mobile: {
    inner: { rx: 285, ry: 200, tilt: -8 },
    outer: { rx: 405, ry: 305, tilt: -8 },
  },
};
let selectedId = null;
let view = 'orbit';
let userPaused = reducedMotion.matches;
let phase = 0;
let lastTime = 0;
let frameId = null;
let size = { width: 1000, height: 740 };
let tooltipId = null;

function externalLink(url, label, className = '') {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = className;
  link.setAttribute('aria-label', `${label} (opens in a new tab)`);
  return link;
}

function showProject(id, announce = false) {
  const project = projectById.get(id);
  if (!project) return;
  selectedId = id;
  document.documentElement.style.setProperty('--selected-color', project.color);
  $('#overview-panel').hidden = true;
  $('#project-panel').hidden = false;
  $('#project-role').textContent = project.role;
  $('#project-name').textContent = project.name;
  $('#project-summary').textContent = project.summary;
  $('#project-logo').src = project.logo;
  $('#project-logo').dataset.project = project.id;
  $('#project-logo').dataset.style = project.logoStyle || 'logo';
  $('#project-homepage').href = project.homepage;
  $('#project-homepage').setAttribute('aria-label', `Visit ${project.name} (opens in a new tab)`);
  $('#project-code').href = project.github || project.homepage;
  $('#project-code').hidden = !project.github;
  $('#project-code').setAttribute('aria-label', `${project.name} on GitHub (opens in a new tab)`);
  $('#project-resources').replaceChildren(...project.resources.map((resource) => {
    const link = externalLink(resource.url, `${project.name}: ${resource.name}, ${resource.type}`, 'resource');
    const symbols = { Models: 'chip', Data: 'data', Benchmark: 'grid', Infrastructure: 'desktop', Code: 'github' };
    const symbol = symbols[resource.type] || 'box';
    link.dataset.kind = resource.type.toLowerCase();
    link.innerHTML = `<span class="resource-art"><img alt="" width="64" height="64"><span class="resource-kind">${icon(symbol)}</span></span><span class="resource-copy"><span class="resource-type"></span><span class="resource-title"><strong></strong></span><span class="resource-description"></span></span>${icon('arrow')}`;
    link.querySelector('img').src = resource.logo || project.logo;
    link.querySelector('img').dataset.project = project.id;
    link.querySelector('img').dataset.style = resource.logoStyle || project.logoStyle || 'logo';
    link.querySelector('strong').textContent = resource.name;
    link.querySelector('.resource-type').textContent = resource.type;
    link.querySelector('.resource-type').hidden = resource.type === 'Code';
    link.querySelector('.resource-description').textContent = resource.description;
    if (resource.tags) {
      const tags = document.createElement('span');
      tags.className = 'resource-tags';
      for (const tag of resource.tags) {
        const item = document.createElement('span');
        item.textContent = tag;
        tags.append(item);
      }
      link.querySelector('.resource-copy').append(tags);
    }
    return link;
  }));
  const components = $('#project-components');
  components.hidden = !project.components || !project.components.length;
  components.replaceChildren(...(project.components || []).map((component) => {
    const row = document.createElement('div');
    row.className = 'component';
    const title = document.createElement('strong');
    title.textContent = component.name;
    const description = document.createElement('span');
    description.textContent = component.description;
    row.append(title, description);
    return row;
  }));
  for (const node of document.querySelectorAll('[data-project]')) {
    node.classList.toggle('is-selected', node.dataset.project === id);
  }
  if (announce) $('#selection-status').textContent = `${project.name}. ${project.summary} Project resources are shown in the details panel.`;
  renderOrbit();
}

function showOverview() {
  selectedId = null;
  tooltipId = null;
  tooltip.hidden = true;
  $('#overview-panel').hidden = false;
  $('#project-panel').hidden = true;
  $('#selection-line').setAttribute('d', '');
  for (const node of document.querySelectorAll('.is-selected')) node.classList.remove('is-selected');
  $('#selection-status').textContent = 'Research overview';
  pauseReasons.delete('touch');
  updateMotionButton();
  updateAnimation();
}

function pause(reason) {
  pauseReasons.add(reason);
  updateAnimation();
}

function resume(reason) {
  pauseReasons.delete(reason);
  updateAnimation();
}

function isPaused() {
  return userPaused || reducedMotion.matches || pauseReasons.size > 0 || view !== 'orbit' || document.hidden;
}

function updateAnimation() {
  if (isPaused()) {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    lastTime = 0;
  } else if (frameId === null) {
    frameId = requestAnimationFrame(animate);
  }
}

function updateMotionButton() {
  const paused = userPaused || reducedMotion.matches || pauseReasons.has('touch');
  $('#motion-toggle').setAttribute('aria-pressed', String(paused));
  $('#motion-toggle').innerHTML = `${icon(paused ? 'play' : 'pause')}<span>${paused ? 'Resume orbit' : 'Pause orbit'}</span>`;
  $('#motion-toggle').disabled = reducedMotion.matches;
  if (reducedMotion.matches) $('#motion-toggle').innerHTML = `${icon('pause')}<span>Reduced motion</span>`;
}

function modelPosition(project) {
  const angle = (project.angle * Math.PI / 180) + phase;
  const orbit = (size.width <= 540 ? orbits.mobile : orbits.desktop)[project.orbit || 'outer'];
  const tilt = orbit.tilt * Math.PI / 180;
  const x = orbit.rx * Math.cos(angle);
  const y = orbit.ry * Math.sin(angle);
  return { x: 500 + x * Math.cos(tilt) - y * Math.sin(tilt), y: 370 + x * Math.sin(tilt) + y * Math.cos(tilt), depth: Math.sin(angle) };
}

function screenPosition(point) {
  const scale = Math.min(size.width / 1000, size.height / 740);
  return { x: point.x * size.width / 1000, y: point.y * size.height / 740, scale };
}

function renderOrbit() {
  if (view !== 'orbit') return;
  for (const project of projects) {
    const position = modelPosition(project);
    const screen = screenPosition(position);
    const node = document.getElementById(`satellite-${project.id}`);
    const baseScale = size.width <= 350 ? .36 : size.width <= 540 ? .43 : Math.max(.64, Math.min(1, screen.scale));
    const scale = baseScale * (.94 + position.depth * .19);
    node.style.setProperty('--node-scale', scale);
    node.style.setProperty('--depth-opacity', .84 + (position.depth + 1) * .08);
    node.style.setProperty('--depth-blur', `${Math.max(0, -position.depth) * .4}px`);
    node.style.transform = `translate(${screen.x}px, ${screen.y}px) translate(-50%, -50%) scale(${scale})`;
    node.style.zIndex = project.id === selectedId ? 30 : String(10 + Math.round(position.depth * 8));
    if (project.id === selectedId) {
      $('#selection-line').setAttribute('d', `M500 370 Q${(position.x + 500) / 2} ${position.y + 45} ${position.x} ${position.y}`);
    }
    if (project.id === tooltipId) {
      const tooltipWidth = Math.min(190, size.width - 24);
      const left = Math.min(size.width - tooltipWidth - 12, Math.max(12, screen.x - tooltipWidth / 2));
      const bounds = node.getBoundingClientRect();
      const stageTop = space.getBoundingClientRect().top;
      const preferredTop = position.y < 370
        ? bounds.top - stageTop - tooltip.offsetHeight - 12
        : bounds.bottom - stageTop + 12;
      const top = Math.max(12, Math.min(size.height - tooltip.offsetHeight - 12, preferredTop));
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.width = `${tooltipWidth}px`;
    }
  }
  const center = screenPosition({ x: 500, y: 370 });
  $('#planet-home').style.left = `${center.x}px`;
  $('#planet-home').style.top = `${center.y}px`;
  const deviceTime = phase * 8;
  $('#desktop-device').style.transform = `translate(${Math.sin(deviceTime) * 4}px, ${Math.cos(deviceTime) * 5}px) rotate(-7deg) rotateY(12deg)`;
  $('#phone-device').style.transform = `translate(${Math.cos(deviceTime + 1) * 5}px, ${Math.sin(deviceTime + 1) * 7}px) rotate(10deg)`;
  $('#browser-device').style.transform = `translate(${Math.sin(deviceTime + 2) * 5}px, ${Math.cos(deviceTime + 2) * 5}px) rotate(5deg) rotateY(-7deg)`;
}

function animate(time) {
  frameId = null;
  if (isPaused()) return;
  if (lastTime) phase += Math.min(time - lastTime, 50) * Math.PI * 2 / 240000;
  lastTime = time;
  renderOrbit();
  frameId = requestAnimationFrame(animate);
}

function showTooltip(project) {
  tooltipId = project.id;
  tooltip.replaceChildren();
  tooltip.append(document.createTextNode(project.role));
  const child = document.createElement('span');
  child.textContent = [...new Set(project.resources.map((resource) => resource.type).filter((type) => type !== 'Code'))].join(' · ');
  if (child.textContent) tooltip.append(child);
  tooltip.hidden = false;
  renderOrbit();
}

for (const project of projects) {
  const node = externalLink(project.homepage, `${project.name}: ${project.role}`, 'satellite');
  node.id = `satellite-${project.id}`;
  node.dataset.project = project.id;
  node.dataset.coverStyle = project.orbitCoverStyle || project.coverStyle || 'art';
  node.style.setProperty('--project-color', project.color);
  node.innerHTML = `<span class="satellite-card"><img src="${project.orbitCover || project.cover}" alt="" draggable="false" width="160" height="160"><i class="satellite-dot"></i></span><span class="satellite-name">${project.name}</span>`;
  node.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch') return;
    pause('satellite');
    showProject(project.id);
    showTooltip(project);
  });
  node.addEventListener('pointerleave', () => {
    tooltipId = null;
    tooltip.hidden = true;
    resume('satellite');
  });
  node.addEventListener('focus', () => {
    pause('focus');
    showProject(project.id, true);
    showTooltip(project);
  });
  node.addEventListener('blur', () => {
    tooltipId = null;
    tooltip.hidden = true;
    resume('focus');
  });
  node.addEventListener('click', (event) => {
    if (!coarsePointer.matches) return;
    event.preventDefault();
    pause('touch');
    updateMotionButton();
    showProject(project.id, true);
    $('#inspector').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  });
  satelliteContainer.append(node);

  const area = document.createElement('button');
  area.className = 'research-area';
  area.dataset.project = project.id;
  area.style.setProperty('--project-color', project.color);
  area.innerHTML = `<img src="${project.logo}" alt="" width="34" height="34"><span><strong>${project.name}</strong><small>${project.role}</small></span>${icon('chevron')}`;
  area.addEventListener('click', () => { showProject(project.id, true); $('#back-overview').focus({ preventScroll: true }); });
  $('#research-path').append(area);

  const row = document.createElement('div');
  row.className = 'index-row';
  row.dataset.project = project.id;
  row.dataset.coverStyle = 'logo';
  row.innerHTML = `<img class="index-cover" src="${project.logo}" alt="" width="46" height="46"><button class="index-copy"><strong>${project.name}</strong><span>${project.question}</span></button>`;
  row.querySelector('button').addEventListener('click', () => {
    showProject(project.id, true);
    if (innerWidth <= 850) $('#inspector').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  });
  const visit = externalLink(project.homepage, `Visit ${project.name}`, 'index-visit');
  visit.innerHTML = `<span>${project.role}</span>${icon('arrow')}`;
  row.append(visit);
  $('#all-projects-index').append(row);
}

// Fixed star positions keep the background quiet and stable between visits.
for (let index = 0; index < 75; index++) {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', String(35 + ((index * 137.507) % 930)));
  circle.setAttribute('cy', String(75 + ((index * 83.63) % 595)));
  circle.setAttribute('r', index % 9 === 0 ? '1.2' : '.6');
  circle.style.opacity = String(.2 + (index % 5) * .15);
  $('#star-field').append(circle);
}
for (let index = 0; index < 10; index++) {
  const point = modelPosition({ angle: index * 36 + 18, orbit: index % 2 ? 'inner' : 'outer' });
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', String(point.x));
  circle.setAttribute('cy', String(point.y));
  circle.setAttribute('r', index % 3 === 0 ? '2' : '1.3');
  $('#orbital-dust').append(circle);
}

function focusOverviewControl() {
  $(view === 'orbit' ? '#planet-home' : '[data-view="index"]').focus({ preventScroll: true });
}
$('#back-overview').addEventListener('click', () => { showOverview(); focusOverviewControl(); });
$('#planet-home').addEventListener('click', showOverview);
$('#motion-toggle').addEventListener('click', () => {
  userPaused = !(userPaused || pauseReasons.has('touch'));
  pauseReasons.delete('touch');
  updateMotionButton();
  updateAnimation();
});
$('#inspector').addEventListener('pointerenter', () => pause('inspector'));
$('#inspector').addEventListener('pointerleave', () => resume('inspector'));
$('#inspector').addEventListener('focusin', () => pause('inspector-focus'));
$('#inspector').addEventListener('focusout', (event) => {
  if (!$('#inspector').contains(event.relatedTarget)) resume('inspector-focus');
});

function syncThemeButton() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;
  $('#theme-toggle').innerHTML = icon(isDark ? 'sun' : 'moon');
  $('#theme-toggle').setAttribute('aria-label', label);
  $('#theme-toggle').title = label;
  $('meta[name="theme-color"]').content = isDark ? '#080f1c' : '#f4f6f8';
}
$('#theme-toggle').addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('os-hub-theme', theme); } catch {}
  syncThemeButton();
});

for (const button of document.querySelectorAll('[data-view]')) {
  button.addEventListener('click', () => {
    view = button.dataset.view;
    $('.universe').classList.toggle('index-active', view === 'index');
    $('#orbit-view').hidden = view !== 'orbit';
    $('#index-view').hidden = view !== 'index';
    tooltip.hidden = true;
    tooltipId = null;
    for (const other of document.querySelectorAll('[data-view]')) {
      other.classList.toggle('active', other === button);
      other.setAttribute('aria-pressed', String(other === button));
    }
    renderOrbit();
    updateAnimation();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const focusWasInPanel = $('#project-panel').contains(document.activeElement);
    showOverview();
    if (focusWasInPanel) focusOverviewControl();
    updateAnimation();
  }
});
document.addEventListener('visibilitychange', updateAnimation);
reducedMotion.addEventListener('change', () => {
  userPaused = reducedMotion.matches;
  updateMotionButton();
  updateAnimation();
});
new ResizeObserver(([entry]) => {
  size = { width: entry.contentRect.width, height: entry.contentRect.height };
  if (view === 'orbit') {
    const tracks = size.width <= 540 ? orbits.mobile : orbits.desktop;
    for (const [name, orbit] of Object.entries(tracks)) {
      const track = $(`#orbit-map [data-orbit="${name}"]`);
      track.setAttribute('rx', orbit.rx);
      track.setAttribute('ry', orbit.ry);
      track.setAttribute('transform', `rotate(${orbit.tilt} 500 370)`);
    }
    $('#orbital-dust').replaceChildren();
  }
  renderOrbit();
}).observe(space);
syncThemeButton();
updateMotionButton();
renderOrbit();
updateAnimation();
