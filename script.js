const devices = [
    { name: "Drone A", ip: "192.168.1.10", vulnerabilities: [{ severity: 3 }, { severity: 2 }] },
    { name: "Drone B", ip: "192.168.1.11", vulnerabilities: [{ severity: 1 }] },
    { name: "Drone C", ip: "192.168.1.12", vulnerabilities: [{ severity: 4 }, { severity: 1 }, { severity: 2 }] }
];

function getRiskLevel(score) {
    if (score >= 3) {
        return 'High'; 
    } else if (score >= 2) {
        return 'Medium'; 
    } else {
        return 'Low'; 
    }
}
function showDeviceDetails(device) {
    const deviceDetailsDiv = document.getElementById("device-details");
    deviceDetailsDiv.innerHTML = `<h3>Details for ${device.name}</h3>`;

    device.vulnerabilities.forEach((vulnerability, index) => {
        const severity = vulnerability.severity;
        const severityColor = severity >= 3 ? 'red' : severity >= 2 ? 'yellow' : 'green'; // Color based on severity

        const vulnerabilityDiv = document.createElement("div");
        vulnerabilityDiv.style.color = severityColor;
        vulnerabilityDiv.innerHTML = `<strong>Vulnerability ${index + 1}:</strong> Severity ${severity}`;
        deviceDetailsDiv.appendChild(vulnerabilityDiv);
    });
}
    const riskColor = riskLevel === 'High' ? 'red' : riskLevel === 'Medium' ? 'yellow' : 'green';
    resultDiv.style.color = riskColor;
    deviceDiv.addEventListener("click", () => showDeviceDetails(device));




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