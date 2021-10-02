chrome.action.onClicked.addListener((tab) => {
  console.log('In Service Worker: toolbar clicked');

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content-script.js'],
  });
});
