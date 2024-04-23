chrome.runtime.onMessage.addListener((message, sender, responseCb) => {
  if (message.type === "UPDATE_TAB" || message.type === "ACTIVATE_TAB") {
    const { tab } = message;
    if (tab.url.includes("youtube.com/shorts")) {
      console.log("Short page");
    } else {
      console.log("Not a short page");
    }
  }
});
