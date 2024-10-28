const devices = [
    { name: "Drone A", ip: "192.168.1.10", vulnerabilities: [{ severity: 3 }, { severity: 2 }] },
    { name: "Drone B", ip: "192.168.1.11", vulnerabilities: [{ severity: 1 }] },
    { name: "Drone C", ip: "192.168.1.12", vulnerabilities: [{ severity: 4 }, { severity: 1 }, { severity: 2 }] }
];


function displayDevices() {
    const deviceListDiv = document.getElementById("device-list");
    devices.forEach(device => {
        const deviceDiv = document.createElement("div");
        deviceDiv.className = "device";
        deviceDiv.innerHTML = `<strong>Name:</strong> ${device.name} <br> <strong>IP Address:</strong> ${device.ip}`;
        deviceListDiv.appendChild(deviceDiv);
    });
}

function scanVulnerabilities() {
    const scanResultsDiv = document.getElementById("scan-results");
    scanResultsDiv.innerHTML = ""; //

    devices.forEach(device => {
        let totalSeverity = 0;
        let numberOfVulnerabilities = device.vulnerabilities.length;

        device.vulnerabilities.forEach(vulnerability => {
            totalSeverity += vulnerability.severity;
        });

        const riskScore = (totalSeverity / numberOfVulnerabilities).toFixed(2);
        const resultDiv = document.createElement("div");
        resultDiv.innerHTML = `<strong>${device.name}</strong>: Risk Score - ${riskScore} <br>`;
        scanResultsDiv.appendChild(resultDiv);
    });
}

document.getElementById("scan-button").addEventListener("click", scanVulnerabilities);

displayDevices();