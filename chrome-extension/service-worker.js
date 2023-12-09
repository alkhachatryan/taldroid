chrome.runtime.onInstalled.addListener(() => {
  // Additional setup if needed
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // Handle the web request
    console.log("Request intercepted:", details);
    // Modify the request or perform other actions

    // Return { cancel: true } to cancel the request
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
