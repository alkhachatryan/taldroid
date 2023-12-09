chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "chessMove") {
        fetch("http://localhost:8000", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message.position),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error("Error sending position:", error));
    }
});