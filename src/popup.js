const urlHolder = document.querySelector("#url");
chrome.tabs.onActivated.addListener(async (info) => {
  const tab = await chrome.tabs.get(info.tabId);
  urlHolder.innerHTML = tab.url;
});
