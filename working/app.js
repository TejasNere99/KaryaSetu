window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  
  if (window.scrollY > 50) { // Change 50 to when you want the effect
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
document.addEventListener("DOMContentLoaded", function () {
    let loginBtn = document.getElementById("login-btn");
    loginBtn.addEventListener("click", function() {
        window.location.href = "mainLogin.html";    
    });

    let workerBtn = document.getElementById("worker-btn");
    workerBtn.addEventListener("click", function() {
        window.location.href = "workerLogin.html";    
    });

    let userBtn = document.getElementById("user-btn");
    userBtn.addEventListener("click", function() {
        window.location.href = "userLogin.html";    
    });
});
let logOutBtn = document.getElementById("logout-btn");
if (logOutBtn) {
    logOutBtn.addEventListener("click", function() {
        localStorage.setItem("isUserLoggedIn", "false");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        // also clear worker session keys
        localStorage.setItem("isWorkerLoggedIn", "false");
        localStorage.removeItem("workerName");
        localStorage.removeItem("workerId");
        window.location.href = "index.html";    
    });
}

// Language Translation using local JSON
const langSel = document.getElementById("langSwitcher");
const elements = document.querySelectorAll("[data-i18n]");
let translations = {};

fetch("i18n-translations.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
  });

langSel.addEventListener("change", (e) => {
  const targetLang = e.target.value;

  elements.forEach((el) => {
    const key = el.innerText.trim();
    // Store original text as key if not already stored
    if (!el.dataset.i18nKey) {
      el.dataset.i18nKey = key;
    }
    const i18nKey = el.dataset.i18nKey;

    if (targetLang === "en") {
      el.innerText = translations["en"][i18nKey] || i18nKey;
    } else {
      el.innerText = translations[targetLang][i18nKey] || i18nKey;
    }
  });
});

// Language Translation using free API
// const langSel = document.getElementById("langSwitcher");
// const elements = document.querySelectorAll("[data-i18n]");

// langSel.addEventListener("change", async (e) => {
//   const targetLang = e.target.value;

//   elements.forEach(async (el) => {
//     const text = el.innerText;
//     if (!text.trim()) return;

//     // agar English chahiye toh reset
//     if (targetLang === "en") {
//       el.innerText = el.dataset.originalText || text;
//       return;
//     }

//     // original store karo ek hi baar
//     if (!el.dataset.originalText) {
//       el.dataset.originalText = text;
//     }

//     let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
//     try {
//       const res = await fetch(apiUrl);
//       const data = await res.json();
//       el.innerText = data.responseData.translatedText;
//     } catch (err) {
//       console.error("Translation failed", err);
//     }
//   });
// });


