const user = JSON.parse(localStorage.getItem('user'));
const API_NOTES = 'http://localhost:3000/api/notes';

let editId = null;

if (!user) {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

function openAddModal() {
    editId = null;
    document.getElementById('modalTitle').innerText = 'Tambah Catatan';
    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
    document.getElementById('noteModal').classList.remove('hidden');
}

async function openEditModal(id) {
    try {
        const res = await fetch(`${API_NOTES}/${id}`);
        const data = await res.json();

        if (!res.ok) {
            alert(data.message || 'Gagal mengambil detail note!');
            return;
        }

        if (Number(data.id_user) !== Number(user.id_user)) {
            alert('Kamu tidak punya akses ke note ini!');
            return;
        }

        editId = id;
        document.getElementById('modalTitle').innerText = 'Edit Catatan';
        document.getElementById('judul').value = data.judul || '';
        document.getElementById('isi').value = data.isi || '';
        document.getElementById('noteModal').classList.remove('hidden');
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat membuka note!');
    }
}

function closeModal() {
    document.getElementById('noteModal').classList.add('hidden');
    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
    editId = null;
}

async function getNotes() {
    try {
        const res = await fetch(`${API_NOTES}?id_user=${user.id_user}`);
        const data = await res.json();

        const container = document.getElementById('notesList');
        container.innerHTML = '';

        if (!Array.isArray(data)) {
            alert(data.message || 'Gagal mengambil notes!');
            return;
        }

        if (data.length === 0) {
            container.innerHTML = `
                <div class="add-card" onclick="openAddModal()">
                    <div class="plus">+</div>
                    <p>Tambah Catatan</p>
                </div>
            `;
            return;
        }

        data.forEach(note => {
            container.innerHTML += `
                <div class="note-card">
                    <h3 title="${note.judul}">Judul : ${note.judul}</h3>
                    <p>Catatan :<br>${note.isi || ''}</p>
                    <div class="note-date">${note.tgl_dibuat}</div>
                    <div class="note-actions">
                        <button onclick="openEditModal(${note.id})">Edit</button>
                        <button onclick="hapusNote(${note.id})">Hapus</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML += `
            <div class="add-card" onclick="openAddModal()">
                <div class="plus">+</div>
                <p>Tambah Catatan</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        alert('Gagal mengambil data notes!');
    }
}

document.getElementById('noteForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const judul = document.getElementById('judul').value.trim();
    const isi = document.getElementById('isi').value.trim();

    if (!judul) {
        alert('Judul wajib diisi!');
        return;
    }

    try {
        let res;

        if (editId === null) {
            res = await fetch(API_NOTES, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    judul,
                    isi,
                    id_user: user.id_user
                })
            });
        } else {
            res = await fetch(`${API_NOTES}/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    judul,
                    isi,
                    id_user: user.id_user
                })
            });
        }

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || 'Terjadi kesalahan!');
            return;
        }

        closeModal();
        getNotes();
    } catch (error) {
        console.error(error);
        alert('Gagal menyimpan note!');
    }
})

async function hapusNote(id) {
    const konfirmasi = confirm('Yakin mau hapus note ini?');
    if (!konfirmasi) return;

    try {
        const res = await fetch(`${API_NOTES}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_user: user.id_user
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || 'Gagal menghapus note!');
            return;
        }

        getNotes();
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menghapus note!');
    }
}

window.onclick = function (e) {
    const modal = document.getElementById('noteModal');
    if (e.target === modal) {
        closeModal();
    }
};

getNotes();