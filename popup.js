document.addEventListener("DOMContentLoaded", function () {
    const themeSwitch = document.getElementById("theme-switch");
    const body = document.body;
    const descriptionInput = document.getElementById("description");
    const generateButton = document.getElementById("generate");
    const toneButtons = document.querySelectorAll(".tone-btn");
    const aiResponseBox = document.getElementById("ai-response");

    // Load saved theme preference
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeSwitch.checked = true;
    }

    // Toggle theme and save preference
    themeSwitch.addEventListener("change", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });

    let selectedTone = "";

    // Handle tone selection
    toneButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectedTone = this.getAttribute("data-tone");
            toneButtons.forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // Generate email with selected tone and display it in the response box
    generateButton.addEventListener("click", function () {
        let description = descriptionInput.value.trim();
        if (!description) {
            alert("Please enter a description.");
            return;
        }

        let emailPrompt = description;
        if (selectedTone) {
            emailPrompt += `\n\n(Tone: ${selectedTone})`;
        }

        // Simulating AI response for now
        aiResponseBox.value = "Generating email...\n\n" + emailPrompt;

        // Simulate a delay to mimic AI processing
        setTimeout(() => {
            aiResponseBox.value = `Here is your AI-generated email:\n\nDear recipient,\n\n${description}\n\nBest regards.`;
        }, 2000);
    });
});
