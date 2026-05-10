const API = 'http://localhost:3000/api/notes';

let editId = null;

function editNote(id, judul, isi) {
    document.getElementById('judul').value = judul;
    document.getElementById('isi').value = isi;

    editId = id;

    document.querySelector('button').innerText = "Update";
}

async function getNotes() {
    try {
        const res = await fetch(API);
        const data = await res.json();

        console.log("GET data:", data);

        const container = document.getElementById('notesList');
        container.innerHTML = '';

        data.forEach(note => {
            container.innerHTML += `
            <div class="note">
                <h3>
                    ${note.judul}
                </h3>
                <p>
                    ${note.isi}
                </p>
                <small>
                    ${note.tgl_dibuat}
                </small>
                <br>
                <button onclick="editNote(${note.id}, \`${note.judul}\`, \`${note.isi}\`)">
                    Edit
                </button>
                <button onclick="hapusNote(${note.id})">
                    Hapus
                </button>
            </div>
            `
        });
    } catch (error) {
        console.error("ERROR GET:", error);
    }
}

async function tambahNote() {
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    console.log("EDIT ID:", editId);

    if (!judul || !isi) {
        alert("Judul dan isi wajib diisi!");
        return;
    }

    if (editId !== null) {
        const res = await fetch(`${API}/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ judul, isi })
        });

        const data = await res.json();
        console.log("UPDATE:", data);

        editId = null;
        document.querySelector('button').innerText = "Tambah";
    } else {
        await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ judul, isi })
        });
    }

    await getNotes();

    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
}

async function updateNote(id, judul, isi) {
    await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ judul, isi })
    });

    getNotes();
}

async function hapusNote(id) {
    const konfirmasi = confirm("Yakin mau hapus note ini?");

    if (!konfirmasi) return;

    await fetch(`${API}/${id}`, {
        method: 'DELETE'
    });

    getNotes();
}

getNotes();