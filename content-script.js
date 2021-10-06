const mask = document.createElement('div');
mask.setAttribute('class', 'spotlight-mask');

const beam = (event) => {
  const coord = `${event.clientX}px ${event.clientY}px`;

  mask.style.backgroundImage = `radial-gradient(circle at ${coord}, transparent 150px, rgba(0, 0, 0, 0.4) 0)`;
};

window.addEventListener('keydown', (event) => {
  if (event.shiftKey) {
    document.body.appendChild(mask);
    window.addEventListener('mousemove', beam);
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    document.body.removeChild(mask);
    window.removeEventListener('mousemove', beam);
  }
});
