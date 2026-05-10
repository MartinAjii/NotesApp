const bcrypt = require('bcrypt');
const Users = require('../models/usersModels');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username dan password wajib diisi!' });
        }

        const existingUser = await Users.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).json({ message: 'Username sudah digunakan!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'Register berhasil! :D',
            data: {
                id_user: newUser.id_user,
                username: newUser.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username dan password wajib diisi!' });
        }

        const user = await Users.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan! :(' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Password salah! :(' });
        }

        res.status(200).json({
            message: 'Login berhasil! :D',
            data: {
                id_user: user.id_user,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};