const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { name, email, Whatsapp, city, uf } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        try {
            await connection('ongs').insert({
                id,
                name,
                email,
                Whatsapp,
                city,
                uf
            })

            return res.json({ id });
        } catch (e) {
            return res.send(e);
        }
    },
    async index(req, res) {
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    }

}