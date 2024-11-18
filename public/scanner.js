async function updateNetworkStatus() {
  const statusText = document.getElementById("status-text");
  const networkStatusBox = document.getElementById("network-status");

  try {
    const response = await fetch("/status", { method: "HEAD" });
    if (response.ok) {
      statusText.textContent = "Online";
      statusText.classList.add("online");
      statusText.classList.remove("offline");
      networkStatusBox.classList.add("online");
    } else {
      throw new Error("Server not responding");
    }
  } catch (error) {
    statusText.textContent = "Offline";
    statusText.classList.add("offline");
    statusText.classList.remove("online");
    networkStatusBox.classList.remove("online");
  }
}

function calculateOverallHealth(data) {
  const healthElement = document.getElementById("overall-health").querySelector("p");

  if (data.length === 0) {
    healthElement.textContent = "No data available";
    healthElement.style.color = "gray";
    return;
  }

  const totalScore = data.reduce((sum, user) => sum + user.vulnerability, 0);
  const averageScore = totalScore / data.length;

  if (averageScore >= 70) {
    healthElement.textContent = "Good";
    healthElement.style.color = "green";
  } else if (averageScore >= 30) {
    healthElement.textContent = "Moderate";
    healthElement.style.color = "orange";
  } else {
    healthElement.textContent = "Poor";
    healthElement.style.color = "red";
  }
}

async function generateQRCode() {
  try {
    const response = await fetch("/generate-qr");
    const data = await response.json();

    const qrCodeDisplay = document.getElementById("qr-code-display");
    qrCodeDisplay.innerHTML = "";
    const img = document.createElement("img");
    img.src = data.qrCodeUrl;
    img.alt = "QR Code for input page";
    qrCodeDisplay.appendChild(img);
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

function updateClients(data) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";

  data.forEach((user) => {
    const listItem = document.createElement("li");

    const clientInfo = document.createElement("div");
    clientInfo.classList.add("client-info");

    const statusDot = document.createElement("span");
    statusDot.classList.add("status-dot");
    statusDot.style.backgroundColor = user.online ? "green" : "red";

    const username = document.createElement("span");
    username.classList.add("username");
    username.textContent = user.username;

    clientInfo.appendChild(statusDot);
    clientInfo.appendChild(username);

    const score = document.createElement("span");
    score.textContent = `Score: ${user.vulnerability}`;

    listItem.appendChild(clientInfo);
    listItem.appendChild(score);
    userList.appendChild(listItem);
  });
}

function updateDetections(data) {
  const detectionBody = document.getElementById("detection-body");
  detectionBody.innerHTML = "";

  data.forEach((user) => {
    const row = document.createElement("tr");

    const dateCell = document.createElement("td");
    dateCell.textContent = user.timestamp;
    row.appendChild(dateCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent =
      user.vulnerability >= 70
        ? "High Risk"
        : user.vulnerability >= 30
        ? "Moderate Risk"
        : "Low Risk";
    row.appendChild(categoryCell);

    const conclusionCell = document.createElement("td");
    conclusionCell.textContent = `${user.vulnerability} Score`;
    conclusionCell.style.color =
      user.vulnerability >= 70
        ? "green"
        : user.vulnerability >= 30
        ? "orange"
        : "red";
    row.appendChild(conclusionCell);

    detectionBody.appendChild(row);
  });
}

async function loadData() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();

    updateClients(data);
    updateDetections(data);
    calculateOverallHealth(data);
    generateQRCode();
    updateNetworkStatus();
  } catch (error) {
    console.error("Error loading data:", error);
    updateNetworkStatus();
  }
}

window.onload = loadData;