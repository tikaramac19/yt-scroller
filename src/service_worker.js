console.log("service_worker");

chrome.tabs.onActivated.addListener(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (!tab?.url) return;

  // console.log({ tab }, "from service workder");
});
