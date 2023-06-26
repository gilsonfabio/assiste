import axios from 'axios';

//const api = axios.create({baseURL: 'https://backpedecana.herokuapp.com' });
const api = axios.create({baseURL: 'http://10.111.134.40:3333' });
//const api = axios.create({baseURL: 'http://192.168.0.227:3333' });
export default api;