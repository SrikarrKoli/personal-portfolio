import { sceneGeometry, effects, effectAnchor } from './scene.mjs';
import { createLivingScene } from './living-scene.mjs';

const motionButton = document.querySelector('#motion');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
try { paused = paused || localStorage.getItem('portfolio-motion-paused') === 'true'; } catch {}
function updateMotion() {
  document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Enable motion' : 'Pause motion';
  if (paused) clearEffects();
  syncAmbient();
}
motionButton.addEventListener('click', () => {
  paused = !paused;
  updateMotion();
  try { localStorage.setItem('portfolio-motion-paused', String(paused)); } catch {}
});
const effectLayer = document.querySelector('.scene-effects');
const stage = document.querySelector('.scene-stage');
const sceneStatus = document.querySelector('#scene-status');
let geometry;
let sceneWidth = innerWidth;
let sceneHeight = innerHeight;
const image = new Image();
let livingScene;
let ambientTimer;
let ambientTick = 0;
const activeAnimations = new Set();
const cleanupTimers = new Set();
const cooldowns = new Map();

function clearEffects() {
  for (const animation of activeAnimations) animation.cancel();
  activeAnimations.clear();
  for (const timer of cleanupTimers) clearTimeout(timer);
  cleanupTimers.clear();
  effectLayer.replaceChildren();
}

function layoutScene() {
  sceneWidth = document.documentElement.clientWidth;
  sceneHeight = document.querySelector('.landscape').getBoundingClientRect().height;
  document.documentElement.style.setProperty('--scene-height', `${sceneHeight}px`);
  geometry = sceneGeometry(sceneWidth, sceneHeight, image.naturalWidth || 1672, image.naturalHeight || 941, matchMedia('(max-width: 760px)').matches);
  livingScene?.setGeometry(geometry, sceneWidth, sceneHeight);
  Object.assign(stage.style, { width: `${geometry.width}px`, height: `${geometry.height}px`, left: `${geometry.left}px`, top: `${geometry.top}px` });
  // Keep cropped scenery out of the keyboard's tab order.
  for (const button of stage.querySelectorAll('button')) {
    const bounds = button.getBoundingClientRect();
    button.tabIndex = bounds.right > 0 && bounds.left < sceneWidth && bounds.bottom > 0 && bounds.top < sceneHeight ? 0 : -1;
  }
}
image.onload = layoutScene;
image.src = '/portfolio/landscape.png';
try {
  livingScene = createLivingScene(document.querySelector('#living-scene'), image);
} catch (error) {
  console.warn('Using the illustrated scene fallback.', error);
}
window.addEventListener('resize', () => { clearEffects(); layoutScene(); });
layoutScene();

function finishParticle(particle, frames, duration, delay) {
  const animation = particle.animate(frames, { duration, delay, easing: 'linear', fill: 'both' });
  activeAnimations.add(animation);
  const remove = () => { activeAnimations.delete(animation); particle.remove(); };
  animation.onfinish = remove;
  animation.oncancel = remove;
}

function triggerEffect(name, point, { ambient = false, count } = {}) {
  if (!effects[name] || !geometry || document.hidden) return;
  const now = performance.now();
  if (!ambient && now - (cooldowns.get(name) ?? -Infinity) < 500) return;
  if (!ambient) cooldowns.set(name, now);
  if (!ambient) sceneStatus.textContent = effects[name].label;
  const origin = point || effectAnchor(name, geometry, sceneWidth, sceneHeight);
  if (paused || reducedMotion.matches || typeof Element.prototype.animate !== 'function') {
    return;
  }
  if (!ambient && (name === 'clouds' || name === 'leaves')) livingScene?.gust();
  // Limit repeated clicks so particles never accumulate without a bound.
  if (effectLayer.childElementCount > 65) clearEffects();
  for (let i = 0; i < (count ?? effects[name].count); i++) {
    const particle = document.createElement('span');
    particle.className = `scene-particle ${name}`;
    particle.style.left = `${origin.x}px`;
    particle.style.top = `${origin.y}px`;
    particle.style.setProperty('--variation', i % 3);
    effectLayer.append(particle);
    const random = Math.random();
    const fade = { opacity: 0 };
    if (name === 'leaves') {
      particle.style.backgroundColor = ['#d4b84c', '#8aa64c', '#b3bf50'][i % 3];
      const spread = (random - .5) * 180;
      const fall = Math.min(380, sceneHeight - origin.y - 24);
      finishParticle(particle, [{ transform: `translate(${spread}px, -15px) rotate(0deg)`, opacity: 0 }, { offset: .15, opacity: 1 }, { offset: .55, transform: `translate(${spread + 35}px, ${fall * .5}px) rotate(150deg)`, opacity: .9 }, { transform: `translate(${spread + 5}px, ${fall}px) rotate(300deg)`, ...fade }], 3000 + random * 1700, i * 65);
    } else if (name === 'clouds') {
      finishParticle(particle, [{ transform: `translate(${i * 19 - 50}px, ${i % 2 * 13}px) scale(.7)`, opacity: 0 }, { offset: .2, opacity: .85 }, { transform: `translate(${150 + i * 24}px, ${-25 + i % 2 * 13}px) scale(1.15)`, ...fade }], 4200 + i * 170, i * 120);
    } else if (name === 'ripples') {
      const shift = i * 17;
      finishParticle(particle, [{ transform: `translate(${shift}px, ${-i * 5}px) scale(.1)`, opacity: .95 }, { transform: `translate(${shift}px, ${-i * 5}px) scale(2.4)`, ...fade }], 1700, i * 160);
    } else if (name === 'birds') {
      particle.innerHTML = '<i></i><i></i>';
      finishParticle(particle, [{ transform: `translate(${i * 14}px, ${i % 3 * 13}px)`, opacity: 0 }, { offset: .12, opacity: 1 }, { transform: `translate(${160 + i * 17}px, ${-140 + i % 3 * 13}px)`, ...fade }], 3800 + random * 1100, i * 80);
    } else {
      particle.innerHTML = '<i></i><i></i>';
      particle.style.color = ['#f0c872', '#c5d8ed', '#e5b2bc'][i % 3];
      finishParticle(particle, [{ transform: `translate(${i * 17 - 50}px, 0)`, opacity: 0 }, { offset: .2, opacity: 1 }, { offset: .55, transform: `translate(${i * 21 - 70}px, -70px)`, opacity: 1 }, { transform: `translate(${i * 13 - 15}px, ${-160 - random * 65}px)`, ...fade }], 3000 + random * 1300, i * 90);
    }
  }
}

stage.addEventListener('click', event => {
  const button = event.target.closest('[data-effect]');
  if (!button) return;
  triggerEffect(button.dataset.effect, event.detail ? { x: event.clientX, y: event.clientY } : undefined);
});
function syncAmbient() {
  clearTimeout(ambientTimer);
  const stopped = paused || reducedMotion.matches || document.hidden;
  livingScene?.setPaused(stopped);
  if (stopped) { clearEffects(); return; }
  function tick() {
    ambientTick++;
    const leafOrigin = effectAnchor('leaves', geometry, sceneWidth, sceneHeight);
    leafOrigin.x = Math.max(12, Math.min(sceneWidth - 12, leafOrigin.x + (Math.random() - .5) * Math.min(geometry.width * .4, sceneWidth * .55)));
    leafOrigin.y = Math.max(55, leafOrigin.y + (Math.random() - .5) * 85);
    triggerEffect('leaves', leafOrigin, { ambient: true, count: 2 });
    if (ambientTick % 6 === 0) triggerEffect('birds', undefined, { ambient: true, count: 4 });
    if (ambientTick % 9 === 0) triggerEffect('butterflies', undefined, { ambient: true, count: 2 });
    if (ambientTick % 4 === 0) triggerEffect('ripples', undefined, { ambient: true, count: 2 });
    if (!livingScene?.supported && ambientTick % 3 === 0) triggerEffect('clouds', undefined, { ambient: true, count: 2 });
    ambientTimer = setTimeout(tick, 1000);
  }
  ambientTimer = setTimeout(tick, 300);
}
document.addEventListener('visibilitychange', syncAmbient);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { paused = true; updateMotion(); } });

window.addEventListener('hashchange', syncAmbient);
window.addEventListener('popstate', syncAmbient);
updateMotion();
