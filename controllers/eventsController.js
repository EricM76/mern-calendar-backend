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
                code: res.statusCode,
                events
            })

        } catch (error) {
            return res.status(500).json({
                ok: false,
                code: res.statusCode,
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

            return res.status(200).json({
                ok: true,
                code: res.statusCode,
                event,
                msg: "Evento guardardado con éxito",
                
            })


        } catch (error) {
            return res.status(500).json({
                ok: false,
                code: res.statusCode,
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
                    code: res.statusCode,
                    msg: 'No existe el evento'
                })
            }

            if (event.user.toString() !== req.uid) {
                return res.status(401).json({
                    ok: false,
                    code: res.statusCode,
                    msg: 'No está autorizado para editar este evento'
                })
            }

            const newEvent = {
                ...req.body,
                user: req.uid
            }

            let eventUpdated = await Event.findByIdAndUpdate(req.params.id, newEvent)

            res.status(200).json({
                ok: true,
                code: res.statusCode,
                event : eventUpdated,
                msg: 'evento actualizado'
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                code: res.statusCode,
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
                    code: res.statusCode,
                    msg: 'No existe el evento'
                })
            }

            if (event.user.toString() !== req.uid) {
                return res.status(401).json({
                    ok: false,
                    code: res.statusCode,
                    msg: 'No está autorizado para eliminar este evento'
                })
            }

            await Event.findByIdAndDelete(req.params.id)

            res.status(200).json({
                ok: true,
                code: res.statusCode,
            })

        } catch (error) {

            console.log(error);
            return res.status(500).json({
                ok: false,
                code: res.statusCode,
                msg: 'Comuníquese con el administrador del sitio'
            })
        }

    }
}