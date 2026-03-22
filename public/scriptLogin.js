const API_LOGIN = 'http://localhost:3000/api/login';

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Username dan password wajib diisi!');
        return;
    }

    try {
        const res = await fetch(API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        localStorage.setItem('user', JSON.stringify(data.data));
        alert('Login berhasil!');
        window.location.href = 'home.html';
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat login!');
    }
});