// Store the API key securely (only needed during installation)
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ OPENAI_API_KEY: "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxx" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in background.js:", request);

  if (request.action === "generate_email") {
      console.log("Fetching OpenAI API...");

      // Retrieve the API key securely from Chrome storage
      chrome.storage.local.get("OPENAI_API_KEY", (result) => {
          const apiKey = result.OPENAI_API_KEY;

          fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${apiKey}` // Securely fetched key
              },
              body: JSON.stringify({
                  model: "gpt-4",
                  messages: [{ role: "user", content: request.prompt }]
              })
          })
          .then(response => response.json())
          .then(data => {
              console.log("OpenAI API Response:", data);

              if (data.choices && data.choices.length > 0) {
                  const result = data.choices[0].message.content.trim(); 
                  console.log("Extracted Response:", result);
                  sendResponse({ success: true, result });
              } else {
                  sendResponse({ success: false, error: "No response from OpenAI" });
              }
          })
          .catch(error => {
              console.error("Error fetching OpenAI API:", error);
              sendResponse({ success: false, error: error.message });
          });

          return true; // Keeps the message channel open for async response
      });
  }
});
