const userList = document.getElementById('user-list');
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
        console.log('WebSocket connection established');
    };

    ws.onmessage = (message) => {
        const data = JSON.parse(message.data);

        if (data.type === 'init') {
            userList.innerHTML = '';
            data.users.forEach(user => {
                addUserToList(user);
            });
        }

        if (data.type === 'newUser') {
            addUserToList(data.user);
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };

    function addUserToList(user) {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username} - Vulnerability Score: ${user.score}`;
        userList.appendChild(listItem);
    }