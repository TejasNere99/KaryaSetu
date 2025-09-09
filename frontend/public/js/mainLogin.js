let user = document.getElementById("user");
let worker = document.getElementById("worker");
user.addEventListener("click", function() {
    window.location.href = "userLogin.html";    
});
worker.addEventListener("click", function() {
    window.location.href = "workerLogin.html";    
});
