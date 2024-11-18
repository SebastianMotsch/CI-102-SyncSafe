const express = require("express");
const path = require("path");
const fs = require("fs");
const QRCode = require("qrcode");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/data.json", (req, res) => {
  res.sendFile(path.join(__dirname, "data.json"));
});

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.post("/submit", (req, res) => {
  const { username } = req.body;
  const timestamp = new Date().toISOString();
  const vulnerability = Math.floor(Math.random() * 100) + 1;
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

  if (data.some((user) => user.username === username)) {
    res.json({ message: "Username already exists. Please choose a different name." });
    return;
  }

  const newUser = { username, timestamp, vulnerability, online: true };
  data.push(newUser);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ message: "User connected successfully!" });
});

app.get("/generate-qr", (req, res) => {
  const inputUrl = `${req.protocol}://${req.get("host")}/input.html`;
  QRCode.toDataURL(inputUrl, (err, qrCodeUrl) => {
    if (err) {
      res.status(500).send("Error generating QR code.");
      return;
    }
    res.json({ qrCodeUrl });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});