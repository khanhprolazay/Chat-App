const axios = require('axios');
const AxiosServer = axios.create();


AxiosServer.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
	},
	(err) => {
		const status = err.response ? err.response.status : 500;
		const data = err.response ? err.response.data : 'INTERNAL SERVER ERROR';
		throw {status: status, data: data};
	}
);

module.exports = AxiosServer;

// 