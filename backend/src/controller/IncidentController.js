const connection = require('../database/connection');
module.exports = {
    async index(req, res) {
        const [count] = await connection('incidents').count(); // pega somente a primeiro posição do array

        const { page = 1 } = req.query;
        const incidents = await connection('incidents')
            //buscando informações da ong na tabela ongs(que possui relacionamento)
            //retorna a ong no qual a chave estrangeira é igual ao id da ong
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id').
            limit(5).offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email'
                , 'ongs.whatsapp', 'ongs.city', 'ongs.uf']); // selecionando valores de cada tabela
        //tabela.* busca todas as informações
        res.header('X-Total-Count', count['count(*)']);
        return res.json(incidents);
    },
    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;
        //retorna o id 
        const [id] = await connection('incidents').insert({ // desestruturação de array
            title,
            description,
            value,
            ong_id,
        })
        return res.json({ id })
    },
    async delete(req, res) {
        const { id } = req.params;
        console.log(id)
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents').where('id', id).select('ong_id')
            .first() // procura na tabela incidents onde o id é o passado. Seleciona somente a
        //tabela de ong_id. Pega somente o primeiro.
        console.log(incident);
        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'operation not permitted' });
        }

        await connection('incidents').where( // desestruturação de array
            'id', id
        ).delete();
        return res.status(204).send()

    }
}