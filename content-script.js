console.log('In current tab: content-script executed');

// const background = document.createElement('div');
// background.setAttribute('class', 'pinshot-background');
// document.body.appendChild(background);

const cursor = document.createElement('div');
cursor.setAttribute('class', 'pinshot-cursor');
document.body.appendChild(cursor);

const pinshot = (event) => {
  cursor.style.top = `${event.pageY}px`;
  cursor.style.left = `${event.pageX}px`;
};

document.addEventListener('mouseover', pinshot);

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  if (event.shiftKey) {
    document.removeEventListener('mouseover', pinshot);
    document.addEventListener('mouseover', pinshot);

    if (!document.body.querySelector('.pinshot-cursor')) {
      document.body.appendChild(cursor);
    }

    return;
  }

  document.removeEventListener('mouseover', pinshot);

  if (document.body.querySelector('.pinshot-cursor')) {
    document.body.removeChild(cursor);
  }
});
