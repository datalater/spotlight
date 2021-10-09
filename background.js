const { log } = console;

let isActivated = false;

chrome.action.onClicked.addListener((tab) => {
  log('In Service Worker: toolbar clicked');

  if (!isActivated) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content-script.js'],
    });

    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['spotlight.css'],
    });

    isActivated = true;
  } else {
    isActivated = false;
  }

  log(`activated: ${isActivated}`);
});
