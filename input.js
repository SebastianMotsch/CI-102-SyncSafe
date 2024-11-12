const form = document.getElementById('user-form');
        const usernameInput = document.getElementById('username');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = usernameInput.value;

            try {
                const response = await fetch('/addUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });

                if (response.ok) {
                    alert('You have joined successfully!');
                    usernameInput.value = '';
                } else {
                    alert('Failed to join. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });