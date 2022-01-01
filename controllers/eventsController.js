const { response } = require('express');
const Event = require('../database/models/Event');
const fs = require('fs');
const path = require('path');

module.exports = {
    all: async (req, res = response) => {

        try {

            const events = await Event.find().populate('user', 'name');
            return res.status(200).json({
                ok: true,
                events
            })

        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador del sitio'
            })
        }

    },
    create: async (req, res = response) => {

        const event = new Event(req.body);

        try {

            //recupero el id del objeto request generado en el validador de JWT
            event.user = req.uid;

            await event.save();

            return res.json({
                ok: true,
                msg: "Evento guardardado con éxito"
            })


        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador del sitio'
            })
        }
    },
    update: async (req, res = response) => {

        const eventId = req.params.id;

        try {

            const event = await Event.findById(req.params.id);

            if (!event) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe el evento'
                })
            }

            if (event.user.toString() !== req.uid) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No está autorizado para editar este evento'
                })
            }

            const newEvent = {
                ...req.body,
                user: req.uid
            }

            await Event.findByIdAndUpdate(req.params.id, newEvent)

            res.status(200).json({
                ok: true,
                msg: 'evento actualizado'
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador del sitio'
            })
        }

    },
    remove: async (req, res = response) => {

        try {
            const event = await Event.findById(req.params.id);

            if (!event) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe el evento'
                })
            }

            if (event.user.toString() !== req.uid) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No está autorizado para editar este evento'
                })
            }

            await Event.findByIdAndDelete(req.params.id)

            res.status(200).json({
                ok: true,
            })

        } catch (error) {

            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Comuníquese con el administrador del sitio'
            })
        }

    }
}