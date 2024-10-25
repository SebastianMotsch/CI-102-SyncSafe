const devices = [
  {
      name: 'UAV Drone 1',
      ip: '192.168.1.2',
      vulnerabilities: [
          { description: 'Open port 8080', severity: 5 },
          { description: 'Weak password encryption', severity: 8 }
      ]
  },
  {
      name: 'UAV Drone 2',
      ip: '192.168.1.3',
      vulnerabilities: [
          { description: 'Outdated firmware', severity: 6 },
          { description: 'Default credentials still active', severity: 9 }
      ]
  },
  {
    name: 'UAV Drone 3',
    ip: '192.168.1.4',
    vulnerabilities: [
        { description: 'Weak Software', severity: 3 },
        { description: 'Weak port security', severity: 9 }
    ]
}
];

function displayDevices() {
  const deviceList = document.getElementById('device-list');
  deviceList.innerHTML = '';
  devices.forEach(device => {
      const li = document.createElement('li');
      li.textContent = `${device.name} (IP: ${device.ip})`;
      deviceList.appendChild(li);
  });
}

document.getElementById('scan-button').addEventListener('click', scanDevices);

window.onload = displayDevices;