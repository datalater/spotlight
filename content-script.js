console.log('In current tab: content-script executed');

const background = document.createElement('div');
background.setAttribute('class', 'spotlight-background');
document.body.appendChild(background);

const cursor = document.createElement('div');
cursor.setAttribute('class', 'spotlight-cursor');
document.body.appendChild(cursor);

const spotlight = (event) => {
  cursor.style.top = `${event.pageY}px`;
  cursor.style.left = `${event.pageX}px`;
};

document.addEventListener('mouseover', spotlight);

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  if (event.shiftKey) {
    document.removeEventListener('mouseover', spotlight);
    document.addEventListener('mouseover', spotlight);

    if (!document.body.querySelector('.spotlight-cursor')) {
      document.body.appendChild(cursor);
    }

    return;
  }

  document.removeEventListener('mouseover', spotlight);

  if (document.body.querySelector('.spotlight-cursor')) {
    document.body.removeChild(cursor);
  }
});
