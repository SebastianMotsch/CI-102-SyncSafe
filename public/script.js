if (document.getElementById('user-form')) {
    const form = document.getElementById('user-form');
    const usernameInput = document.getElementById('username');
    const disconnectButton = document.getElementById('disconnect-button');
    let username = '';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        username = usernameInput.value;
        
        const response = await fetch('/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });

        if (response.ok) {
            alert('You have joined successfully!');
            usernameInput.value = '';
            disconnectButton.style.display = 'block';
        }
    });

    disconnectButton.addEventListener('click', async () => {
        await fetch('/disconnectUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        alert('You have disconnected.');
        disconnectButton.style.display = 'none';
    });
}

// For scanner.html
if (document.getElementById('user-list')) {
    const userList = document.getElementById('user-list');
    const statusText = document.getElementById('status-text');
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
        statusText.textContent = 'Online';
        statusText.classList.add('online');
    };

    ws.onclose = () => {
        statusText.textContent = 'Offline';
        statusText.classList.add('offline');
    };

    ws.onmessage = (message) => {
        const data = JSON.parse(message.data);

        if (data.type === 'init') {
            userList.innerHTML = '';
            data.users.forEach(user => addUserToList(user));
        }

        if (data.type === 'newUser') {
            addUserToList(data.user);
        }

        if (data.type === 'userDisconnected') {
            removeUserFromList(data.username);
        }
    };

    function addUserToList(user) {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username} - Vulnerability Score: ${user.score}`;
        const circle = document.createElement('div');
        circle.classList.add('online-circle');
        listItem.appendChild(circle);
        listItem.id = user.username;
        userList.appendChild(listItem);
    }

    function removeUserFromList(username) {
        const listItem = document.getElementById(username);
        if (listItem) {
            listItem.remove();
        }
    }
}