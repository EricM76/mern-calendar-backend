const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../database/models/User');
const { JWTGenerator } = require('../helpers/jwt')

module.exports = {
    userCreate: async (req, res = response) => {
        const { email, password } = req.body;

        try {

            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El email ya se encuentra registrado'
                })
            }

            user = new User(req.body);
            user.password = bcrypt.hashSync(password, 10);

            await user.save();
            /* Generar JWT */
            const token = await JWTGenerator(user.id, user.name);

            res.status(201).json({
                ok: true,
                uid: user.id,
                name: user.name,
                token
            })


        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Contáctese con el administrador del sitio',
                error
            })
        }

    },
    userLogin: async (req, res = response) => {
        const { email, password } = req.body;

        try {

            const user = await User.findOne({ email });
            const validPassword = user && bcrypt.compareSync(password, user.password)

            if (!user || !validPassword) {
    
                return res.status(400).json({
                    ok: false,
                    msg: 'Credenciales inválidas'
                })
            }

            /* generar JWT */
            const token = await JWTGenerator(user.id, user.name);

            res.status(200).json({
                ok: true,
                uid: user.id,
                name: user.name,
                token
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Contáctese con el administrador del sitio'
            })
        }


    },
    revalidateToken: async (req, res) => {

        try {
            const token = await JWTGenerator(req.id, req.name);

            res.json({
                ok: true,
                token
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Contáctese con el administrador del sitio'
            })
        }


    }
}
