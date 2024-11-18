document.getElementById("userForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;

  try {
    // Send the data to the server
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error("Error connecting to the server:", error);
    alert("Failed to connect. Please try again.");
  }
});