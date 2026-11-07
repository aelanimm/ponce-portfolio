const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (finePointer && !reducedMotion) {
  const glyphs = ['♡', '♥', '✦', '✧', '⬥', '⬦'];
  const colors = ['#FF3B7A', '#FF75A0', '#5C6BE8', '#8B95EE', '#FFD000', '#FFF8FA'];
  const minSpacing = 30;
  const maxStamps = 40;
  const activeStamps = [];
  let lastX = null;
  let lastY = null;

  function stamp(x, y) {
    const node = document.createElement('span');
    node.className = 'grid-cursor-stamp';
    node.setAttribute('aria-hidden', 'true');
    node.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.color = colors[Math.floor(Math.random() * colors.length)];
    node.style.setProperty('--stamp-size', `${14 + Math.random() * 4}px`);
    node.style.setProperty('--stamp-tilt', `${Math.round(Math.random() * 30 - 15)}deg`);
    document.body.append(node);
    activeStamps.push(node);

    if (activeStamps.length > maxStamps) activeStamps.shift().remove();
    node.addEventListener('animationend', () => {
      const index = activeStamps.indexOf(node);
      if (index !== -1) activeStamps.splice(index, 1);
      node.remove();
    }, { once: true });
  }

  window.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    let x = event.clientX;
    let y = event.clientY;

    if (lastX === null || lastY === null) {
      stamp(x, y);
      lastX = x;
      lastY = y;
      return;
    }

    let dx = x - lastX;
    let dy = y - lastY;
    let distance = Math.hypot(dx, dy);
    while (distance >= minSpacing) {
      const ratio = minSpacing / distance;
      lastX += dx * ratio;
      lastY += dy * ratio;
      stamp(lastX, lastY);
      dx = x - lastX;
      dy = y - lastY;
      distance = Math.hypot(dx, dy);
    }
  }, { passive: true });

  function resetPath() {
    lastX = null;
    lastY = null;
  }
  window.addEventListener('blur', resetPath);
  document.addEventListener('pointerleave', resetPath);
}
