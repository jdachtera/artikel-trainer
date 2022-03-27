chrome.action.onClicked.addListener((tab) => {

  const hostname =  new URL(tab.url ?? "").hostname;

  chrome.storage.sync.get(["isEnabled"], (data) => {
    chrome.storage.sync.set({ isEnabled: {
      ...data.isEnabled,
      [hostname]: !data.isEnabled?.[hostname]
    } });
  });
});
