let devices = [
  { name: 'Smart Thermostat', isSecure: true, lastScanDate: '2024-11-01' },
  { name: 'Security Camera', isSecure: false, lastScanDate: '2024-10-30' },
  { name: 'Smart Lock', isSecure: true, lastScanDate: '2024-11-02' }
];

function updateDashboard() {
  const totalDevices = devices.length;
  const secureDevices = devices.filter(device => device.isSecure).length;
  const vulnerableDevices = totalDevices - secureDevices;
  const lastScanDates = devices.map(device => new Date(device.lastScanDate));
  const lastScan = lastScanDates.length ? new Date(Math.max(...lastScanDates)) : 'Not Scanned Yet';

  document.getElementById('total-devices').querySelector('p').innerText = totalDevices;
  document.getElementById('secure-devices').querySelector('p').innerText = secureDevices;
  document.getElementById('vulnerable-devices').querySelector('p').innerText = vulnerableDevices;
  document.getElementById('last-scan').querySelector('p').innerText = lastScan !== 'Not Scanned Yet' 
      ? lastScan.toDateString() 
      : 'Not Scanned Yet';
}

updateDashboard();