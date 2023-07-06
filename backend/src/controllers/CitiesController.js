const connection = require('../database/connection');

module.exports = {       
    
    async index (request, response) {
        const cidades = await connection('cities')
        .select('*');
    
        return response.json(cidades);
    },   
};
