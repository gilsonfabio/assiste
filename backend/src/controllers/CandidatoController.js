const connection = require('../database/connection');

module.exports = {       
    
    async index (request, response) {
        const candidato = await connection('candidatos')
        .select('*');
    
        return response.json(candidato);
    },    
};