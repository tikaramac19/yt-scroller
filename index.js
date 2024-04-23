console.log("popup script");

// const navigateHandler = (tab) => {
//   console.log({ tab }, "navigate handler");

//   if (tab.url !== "https://www.youtube.com/") {
//     alert("Navigate to youtube for short videos !!");
//     window.open("https://www.youtube.com/shorts");
//   } else if (tab.url === "https://www.youtube.com/") {
//     window.location.href = "https://www.youtube.com/shorts";
//   } else if (tab.url.includes("https://www.youtube.com/shorts")) {
//     alert("Infinite Scroll Activated !!");
//   }
// };

const activeInfiniteScrollig = async () => {
  let [tab] = await chrome.tabs.query({ active: true });
  console.log({ tab }, tab.url, "https://www.youtube.com/");

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // alert("Navigate to youtube for short videos !!");
      // window.open("https://www.youtube.com/shorts");
      if (!tab.url.includes("https://www.youtube.com/")) {
        alert("Navigate to youtube for short videos !!");
        window.open("https://www.youtube.com/shorts");
      } else if (tab.url === "https://www.youtube.com/") {
        window.location.href = "https://www.youtube.com/shorts";
      } else if (tab.url.includes("https://www.youtube.com/shorts")) {
        alert("Infinite Scroll Activated !!");
      }
    },
  });
};

document
  .getElementById("switch")
  .addEventListener("click", activeInfiniteScrollig);
