document.addEventListener("DOMContentLoaded", () => {
  function addAIButton() {
    const toolbar = document.querySelector(".btC"); // Gmail toolbar
    if (toolbar && !document.getElementById("ai-email-btn")) {
      const aiButton = document.createElement("button");
      aiButton.id = "ai-email-btn";
      aiButton.innerText = "AI Assist";
      aiButton.style.marginLeft = "10px";
      aiButton.onclick = () => {
        const emailBody = document.querySelector(".editable").innerText;
        chrome.runtime.sendMessage({ action: "generate_email", prompt: emailBody }, (response) => {
          if (response.success) {
            document.querySelector(".editable").innerText = response.text;
          }
        });
      };
      toolbar.appendChild(aiButton);
    }
  }
  setInterval(addAIButton, 3000);
});