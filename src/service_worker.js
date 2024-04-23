console.log("service_worker");

chrome.tabs.onActivated.addListener(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tab?.url) return;

  chrome.scripting.executeScript({
    target: tab.tabId,
    files: ["./src/content_script.js"],
  });

  console.log({ tab }, "from service workder");
});
