const dashboard = document.getElementById("dashboard");
const profileBtn = document.getElementById("profileBtn");
const content = document.getElementById("content");
const sidebarItems = document.querySelectorAll(".sidebar ul li");

profileBtn.addEventListener("click", () => {
  dashboard.style.display = "flex";
});

function showSection(section, event) {
  sidebarItems.forEach(item => item.classList.remove("active"));
  event.target.classList.add("active");

  if (section === "requests") {
    content.innerHTML = `
      <h2>Requests Sent</h2>
      <div class="card">Worker: Ram | Category: Mason | Status: Pending</div>
      <div class="card">Worker: Shyam | Category: Carpenter | Status: Accepted</div>
      <div class="card">Worker: Radha | Category: Painter | Status: Rejected</div>
    `;
  }

  if (section === "chats") {
    content.innerHTML = `
      <h2>Chats</h2>
      <div class="chat-container">
        <div class="chat-list">
          <div onclick="openChat('Ram')">Ram</div>
          <div onclick="openChat('Shyam')">Shyam</div>
        </div>
        <div class="chat-window">
          <div class="messages" id="messages">
            <div class="msg received">Hello!</div>
            <div class="msg sent">Hi, how are you?</div>
          </div>
          <div class="chat-input">
            <input type="text" id="chatInput" placeholder="Type a message...">
            <button onclick="sendMessage()">Send</button>
          </div>
        </div>
      </div>
    `;
  }

  if (section === "notifications") {
    content.innerHTML = `
      <h2>Notifications</h2>
      <div class="card">Your request was accepted by Shyam</div>
      <div class="card">Radha rejected your request</div>
    `;
  }

  if (section === "settings") {
    content.innerHTML = `
      <h2>Settings</h2>
      <form>
        <label>Name:</label><br>
        <input type="text" value="User"><br><br>
        <label>Age:</label><br>
        <input type="number" value="25"><br><br>
        <label>Address:</label><br>
        <input type="text" value="Pune"><br><br>
        <label>Category of Work:</label><br>
        <input type="text" value="Customer"><br><br>
        <button type="submit">Save</button>
      </form>
    `;
  }
}

function logout() {
  alert("Logged out!");
  window.location.href = "index.html"; // change to homepage
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const msgBox = document.getElementById("messages");
  if (input.value.trim() !== "") {
    const msg = document.createElement("div");
    msg.classList.add("msg", "sent");
    msg.innerText = input.value;
    msgBox.appendChild(msg);
    input.value = "";
    msgBox.scrollTop = msgBox.scrollHeight;
  }
}

function openChat(worker) {
  alert("Opening chat with " + worker);
}
