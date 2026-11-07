const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (finePointer && !reducedMotion) {
  const cursor = document.createElement('div');
  cursor.className = 'portfolio-cursor is-hidden';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `<svg class="portfolio-cursor-arrow" viewBox="0 0 32 42" focusable="false"><path class="cursor-arrow-fill" d="M3 2v29l8-7 6.5 15 6-2.8L17 21l12-1z"/><path class="cursor-arrow-detail" d="M7 8v17l4-3.5"/></svg><span class="portfolio-cursor-sparkle">✦</span>`;
  document.body.append(cursor);
  document.documentElement.classList.add('custom-cursor-active');

  const textTargets = 'input, textarea, select, [contenteditable="true"]';
  const interactiveTargets = `a, button, [role="button"], [tabindex]:not([tabindex="-1"]), ${textTargets}`;

  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    cursor.classList.remove('is-hidden');
    cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
    cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
    cursor.classList.toggle('is-text', Boolean(event.target.closest(textTargets)));
    cursor.classList.toggle('is-hovering', Boolean(event.target.closest(interactiveTargets)));
  }, { passive: true });

  document.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse') cursor.classList.add('is-down');
  });
  window.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
  document.addEventListener('pointerenter', () => cursor.classList.remove('is-hidden'));
  window.addEventListener('blur', () => cursor.classList.add('is-hidden'));
  window.addEventListener('focus', () => cursor.classList.remove('is-hidden'));
}
