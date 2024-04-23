chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status === "complete" && tab.active) {
    const tabUrl = tab.url;
    if (!tabUrl || !tabUrl.includes("http")) return;

    await sendMessage(tab.id, {
      type: "UPDATE_TAB",
      tab: tab,
    });
  }
});

chrome.tabs.onActivated.addListener(async (info) => {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tab[0]?.id; // Access the first tab's ID if available
  if (!tabId || !tab || !tab[0]?.url?.includes("http")) return;

  await sendMessage(tabId, { type: "ACTIVATE_TAB", tab: tab });
});

const sendMessage = async (tabId, message) => {
  console.log({ tabId, message });
  const response = await chrome.tabs.sendMessage(tabId, message);
  return response;
};
