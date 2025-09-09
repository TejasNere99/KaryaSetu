window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  
  if (window.scrollY > 50) { // Change 50 to when you want the effect
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
// para.style.width = heading.offsetWidth + "px";
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

