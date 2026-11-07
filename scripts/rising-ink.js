const INK_COLORS = ['#ff3b7a', '#ff75a0', '#5c6be8', '#8b95ee', '#ffd000'];

/** Adds a local, cursor-proximity lift effect to one heading. */
export function initRisingInk(heading) {
  if (!heading || heading.dataset.risingInk === 'ready') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  heading.dataset.risingInk = 'ready';
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    const fragment = document.createDocumentFragment();
    for (const part of node.textContent.match(/\s+|\S+/g) ?? []) {
      if (/^\s+$/.test(part)) {
        fragment.append(document.createTextNode(part));
      } else {
        const word = document.createElement('span');
        word.className = 'rising-ink-word';
        for (const character of part) {
          const letter = document.createElement('span');
          letter.className = 'rising-ink-letter';
          letter.textContent = character;
          letter.setAttribute('aria-hidden', 'true');
          word.append(letter);
        }
        fragment.append(word);
      }
    }
    node.replaceWith(fragment);
  }
  heading.setAttribute('aria-label', heading.textContent);

  const letters = [...heading.querySelectorAll('.rising-ink-letter')];
  let pointer = null;
  let frame = 0;

  const reset = () => {
    pointer = null;
    cancelAnimationFrame(frame);
    letters.forEach(letter => {
      letter.style.transform = '';
      letter.style.textShadow = '';
    });
  };

  heading.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    pointer = { x: event.clientX, y: event.clientY };
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!pointer) return;
      for (const letter of letters) {
        const rect = letter.getBoundingClientRect();
        const dx = rect.left + rect.width / 2 - pointer.x;
        const dy = rect.top + rect.height / 2 - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / 118);
        if (!influence) {
          letter.style.transform = '';
          letter.style.textShadow = '';
          continue;
        }
        const color = INK_COLORS[Math.floor((rect.left + rect.top) / 37) % INK_COLORS.length];
        const lift = influence * 22;
        letter.style.transform = `translate3d(${(-dx / (distance || 1)) * influence * 7}px, ${-lift}px, ${influence * 24}px) rotateX(${(-dy / 15) * influence}deg) rotateY(${(dx / 15) * influence}deg)`;
        letter.style.textShadow = `${influence * 2}px ${influence * 3}px 0 ${color}, ${influence * 4}px ${influence * 5}px 0 #16152222`;
      }
    });
  });
  heading.addEventListener('pointerleave', reset);
}
