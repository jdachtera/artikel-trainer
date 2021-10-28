chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get(["isEnabled"], (data) => {
    chrome.storage.sync.set({ isEnabled: !data.isEnabled });
  });
});
