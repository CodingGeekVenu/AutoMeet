chrome.runtime.onInstalled.addListener(() => {
    console.log("AutoMeet Extension Installed!");
});

// Handle transcription request from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startTranscription") {
        fetch('http://127.0.0.1:5000/transcribe', { method: "POST" })
            .then(response => response.json())
            .then(data => sendResponse({ message: data.message }))
            .catch(error => sendResponse({ message: "Error: " + error }));
        return true;
    }
});
