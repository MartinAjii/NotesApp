const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require("./config/database");
const { sequelize } = require("./config/database");

const notesRoutes = require("./routes/notesRoutes");
const authRoutes = require("./routes/authRoutes");

const Users = require("./models/usersModels");
const Notes = require("./models/notesModels");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', notesRoutes);

app.get("/", (req, res) => {
    res.send("Backend Notes API Running Successfully");
});

Users.hasMany(Notes, { foreignKey: 'id_user' });
Notes.belongsTo(Users, { foreignKey: 'id_user' });

connectDB();

sequelize.sync()
    .then(() => console.log("Sync database berhasil! :)"))
    .catch(err => console.log("Sync gagal! :(", err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running on Port ${port}`));