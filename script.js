// Get Elements
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");

const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swapBtn");
const themeBtn = document.getElementById("themeBtn");
const loader = document.getElementById("loader");


// ==========================
// Translate Text
// ==========================
translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (text === "") {
        alert("Please enter some text.");
        return;
    }

    loader.style.display = "block";

    translateBtn.disabled = true;
    translateBtn.innerHTML = "Translating...";

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang.value}|${toLang.value}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        outputText.value = data.responseData.translatedText;

    } catch (error) {

        alert("Translation Failed!");

        console.log(error);

    } finally {

        loader.style.display = "none";

        translateBtn.disabled = false;

        translateBtn.innerHTML = "Translate";
    }

});


// ==========================
// Swap Languages
// ==========================
swapBtn.addEventListener("click", () => {

    let temp = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = temp;

    temp = inputText.value;
    inputText.value = outputText.value;
    outputText.value = temp;

});


// ==========================
// Dark Mode
// ==========================
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.innerHTML = "☀ Light Mode";

    } else {

        themeBtn.innerHTML = "🌙 Dark Mode";

    }

});