const API_REGISTER = 'https://backend092-118865344431.asia-southeast2.run.app/api/register';

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Username dan password wajib diisi!');
        return;
    }

    try {
        const res = await fetch(API_REGISTER, {
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

        alert('Register berhasil! Silakan login.');
        window.location.href = 'login.html';
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat register!');
    }
});