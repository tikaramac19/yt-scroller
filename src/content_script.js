const TIME_TO_SCROLL = 5 * 1000;

chrome.runtime.onMessage.addListener((message, sender, responseCb) => {
  if (message.type === "UPDATE_TAB" || message.type === "ACTIVATE_TAB") {
    const { tab } = message;

    if (tab.url.includes("youtube.com/shorts")) {
      let navBarEnd = document.querySelector("#end");
      let scroller = document.querySelector(`button[aria-label="Next video"]`);
      let player = document.querySelector("#shorts-player");

      // * get video player
      const navMutation = new MutationObserver((mutations) => {
        navBarEnd = document.querySelector("#end");
        scroller = document.querySelector(`button[aria-label="Next video"]`);
        player = document.querySelector("#shorts-player");

        if (!!navBarEnd && !!scroller && !!player) {
          navMutation.disconnect();
          populateNavbar(navBarEnd, scroller, player);
        }
      });

      if (!navBarEnd || !scroller || !player) {
        navMutation.observe(document, {
          childList,
          subtree,
          attributes,
        });
      } else {
        navMutation.disconnect();
        populateNavbar(navBarEnd, scroller, player);
      }
    } else {
      if (!!document.querySelector("#yt-scroller-power-btn")) {
        // If already exists, remove it

        document
          .querySelector("#end")
          ?.removeChild(document.querySelector("#yt-scroller-power-btn"));
      }
    }
  }
});

const populateNavbar = (navbar, scroller, player) => {
  if (!!navbar && !document.querySelector("#yt-scroller-power-btn")) {
    const img = document.createElement("img");
    img.id = "yt-scroller-power-btn";
    img.src = chrome.runtime.getURL("/src/img/nilo.png");
    img.width = 25;
    img.height = 25;
    img.style.marginRight = "15px";
    img.style.objectFit = "contain";
    img.style.cursor = "pointer";

    if (scroller) {
      let scrollerTimeout;
      img.onclick = (e) => {
        if (img.src.includes("nilo")) {
          scrollerTimeout = setInterval(() => {
            scroller.click();
            const video = player.querySelector("video");
            console.log(video);
          }, TIME_TO_SCROLL);
        } else {
          img.src = chrome.runtime.getURL("/src/img/nilo.png");
          clearTimeout(scrollerTimeout);
          clearInterval(scrollerTimeout);
        }
      };
    }
    navbar.prepend(img);
  }
};
