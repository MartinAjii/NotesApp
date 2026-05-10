const Notes = require("../models/notesModels");

exports.getAllNotes = async (req, res) => {
    try {
        const { id_user } = req.query;

        if (!id_user) {
            return res.status(400).json({ message: "id_user wajib dikirim!" });
        }

        const notes = await Notes.findAll({
            where: { id_user },
            order: [['tgl_dibuat', 'DESC']]
        });

        const localTime = notes.map(note => ({
            ...note.toJSON(),
            tgl_dibuat: new Date(note.tgl_dibuat).toLocaleString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        }));

        res.json(localTime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNotesById = async (req, res) => {
    try {
        const note = await Notes.findByPk(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note tidak ditemukan :(" });
        }

        res.json({
            ...note.toJSON(),
            tgl_dibuat: new Date(note.tgl_dibuat).toLocaleString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        const { judul, isi, id_user } = req.body;

        if (!judul || !id_user) {
            return res.status(400).json({ message: "Judul dan id_user wajib diisi!" });
        }

        const newNote = await Notes.create({
            judul,
            isi,
            id_user
        });

        res.status(201).json({
            message: "Note berhasil ditambahkan :D",
            data: {
                ...newNote.toJSON(),
                tgl_dibuat: new Date(newNote.tgl_dibuat).toLocaleString('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.editNote = async (req, res) => {
    try {
        const { judul, isi, id_user } = req.body;

        const note = await Notes.findByPk(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note tidak ditemukan :(" });
        }

        if (Number(note.id_user) !== Number(id_user)) {
            return res.status(403).json({ message: "Kamu tidak punya akses untuk edit note ini!" });
        }

        await note.update({ judul, isi });

        res.json({
            message: "Note berhasil diedit :D",
            data: note
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const { id_user } = req.body;

        const note = await Notes.findByPk(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note tidak ditemukan :(" });
        }

        if (Number(note.id_user) !== Number(id_user)) {
            return res.status(403).json({ message: "Kamu tidak punya akses untuk hapus note ini!" });
        }

        await note.destroy();

        res.json({
            message: "Note berhasil dihapus :D"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};