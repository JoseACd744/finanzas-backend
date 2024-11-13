// src/controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const createUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        // Verificar si el nombre de usuario ya existe
        const existingUserByUsername = await User.findOne({ where: { username } });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        // Verificar si el correo electrónico ya existe
        const existingUserByEmail = await User.findOne({ where: { email } });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Crear el nuevo usuario
        const newUser = await User.create({ name, username, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { name, username, email, password } = req.body;

        // Verificar si el nombre de usuario ya existe y no pertenece al usuario actual
        if (username) {
            const existingUserByUsername = await User.findOne({ where: { username } });
            if (existingUserByUsername && existingUserByUsername.id !== user.id) {
                return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }
            user.username = username;
        }

        // Verificar si el correo electrónico ya existe y no pertenece al usuario actual
        if (email) {
            const existingUserByEmail = await User.findOne({ where: { email } });
            if (existingUserByEmail && existingUserByEmail.id !== user.id) {
                return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
            }
            user.email = email;
        }

        if (name) user.name = name;
        if (password) user.password = bcrypt.hashSync(password, 8);

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createUser, getUser, updateUser, deleteUser, loginUser };